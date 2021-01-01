import React from 'react';
import { Row, Col, Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { X } from 'react-feather';
import cx from 'classnames';
import { useWeb3React } from '@web3-react/core';

import { useLayout } from '../hooks';
import { getErrorMessage } from '../utils';
import { injected } from '../connectors';

import MetaMask from '../assets/img/metamask.png';
import WalletConnect from '../assets/img/walletconnect.svg';
import Coinbase from '../assets/img/coinbase.svg';
import Fortmatic from '../assets/img/fortmatic.png';
import Portis from '../assets/img/portis.png';

const wallets = [
  { id: 0, name: 'MetaMask', img: MetaMask },
  { id: 1, name: 'Wallet Connect', img: WalletConnect },
  { id: 2, name: 'Coinbase', img: Coinbase },
  { id: 3, name: 'Fortmatic', img: Fortmatic },
  { id: 4, name: 'Portis', img: Portis },
];

const WalletModal = () => {
  const { activate } = useWeb3React();
  const { layout, setLayout } = useLayout();

  const handlWalletModalClose = () =>
    setLayout({
      ...layout,
      modals: {
        ...layout.modals,
        wallet: {
          ...layout.modals.wallet,
          show: false,
        },
      },
    });

  const handleWalletConnect = (walletType) => {
    setLayout({
      ...layout,
      modals: {
        ...layout.modals,
        wallet: {
          ...layout.modals.wallet,
          status: 'connecting',
          type: walletType,
        },
      },
    });

    activate(injected, undefined, true)
      .then(() => {
        setLayout({
          ...layout,
          modals: {
            ...layout.modals,
            wallet: {
              ...layout.modals.wallet,
              status: 'connected',
              type: 'metamask',
            },
          },
        });
      })
      .catch((err) => {
        setLayout({
          ...layout,
          modals: {
            ...layout.modals,
            wallet: {
              ...layout.modals.wallet,
              status: 'not_connected',
              error: getErrorMessage(err),
            },
          },
        });
      });
  };

  return (
    <Modal
      centered
      show={layout.modals.wallet.show}
      aria-label="Connect to a Wallet"
      onHide={handlWalletModalClose}
    >
      <Modal.Header className="d-flex align-items-center">
        <h6 className="mb-0 text-dark">Connect to a Wallet</h6>
        <Button
          variant="transparent"
          size="lg"
          className="p-0"
          onClick={handlWalletModalClose}
        >
          <X size={20} />
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-light rounded">
        {!layout.modals.wallet.error && (
          <Row className="justify-content-center">
            {wallets.map(({ id, name, img }) => (
              <Col
                key={id}
                as={Button}
                xs={11}
                variant={name === 'MetaMask' ? 'dark' : 'transparent'}
                className={cx(
                  'd-flex my-2 py-3 px-3 border border-muted rounded align-items-center',
                  {
                    disabled:
                      name !== 'MetaMask' ||
                      layout.modals.wallet.status === 'connected',
                  },
                )}
                style={{ pointerEvents: name !== 'MetaMask' && 'none' }}
                onClick={() => handleWalletConnect(name)}
              >
                {layout.modals.wallet.status === 'connected' &&
                  layout.modals.wallet.type === name && (
                    <FontAwesomeIcon icon={faCircle} className="text-success" />
                  )}
                <p className="mr-auto mb-0 font-weight-bold">{name}</p>
                {layout.modals.wallet.status === 'connecting' &&
                  layout.modals.wallet.type === name && (
                    <Spinner animation="border" size="sm" />
                  )}
                <img
                  src={img}
                  className="ml-auto"
                  alt={name}
                  height={25}
                  width={25}
                />
              </Col>
            ))}
          </Row>
        )}
        {layout.modals.wallet.error && (
          <Alert variant="danger" className="text-center my-2">
            {layout.modals.wallet.error}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;
