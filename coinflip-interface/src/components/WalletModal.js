import React from 'react';
import { Row, Col, Modal, Button, Alert, Spinner } from 'react-bootstrap';
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
  { name: 'MetaMask', img: MetaMask },
  { name: 'Wallet Connect', img: WalletConnect },
  { name: 'Coinbase', img: Coinbase },
  { name: 'Fortmatic', img: Fortmatic },
  { name: 'Portis', img: Portis },
];

const WalletModal = () => {
  const { activate } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { walletModal } = layout;

  const handleWalletConnect = (walletType) => {
    setLayout({
      ...layout,
      walletModal: {
        ...walletModal,
        status: 'connecting',
        type: walletType,
      },
    });

    activate(injected, undefined, true).catch((err) => {
      setLayout({
        ...layout,
        walletModal: {
          ...walletModal,
          status: 'rejected',
          error: getErrorMessage(err),
        },
      });
    });
  };

  return (
    <Modal
      centered
      animation={false}
      show={walletModal.show}
      aria-label="Connect to a Wallet"
      onHide={() => setLayout({ ...layout, walletModal: { show: false } })}
    >
      <Modal.Header className="d-flex align-items-center">
        <h6 className="mb-0 text-dark">Connect to a Wallet</h6>
        <Button
          variant="transparent"
          size="lg"
          className="p-0"
          onClick={() => setLayout({ ...layout, walletModal: { show: false } })}
        >
          <X size={20} />
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-light rounded">
        {!walletModal.error && (
          <Row className="justify-content-center">
            {wallets.map((wallet, idx) => (
              <Col
                key={idx}
                as={Button}
                xs={11}
                variant={wallet.name === 'MetaMask' ? 'dark' : 'transparent'}
                className={cx(
                  'd-flex my-2 py-3 px-3 border border-muted rounded align-items-center',
                  {
                    disabled: wallet.name !== 'MetaMask',
                  },
                )}
                style={{
                  pointerEvents: wallet.name !== 'MetaMask' && 'none',
                }}
                onClick={() => handleWalletConnect(wallet.name)}
              >
                <p className="mr-auto mb-0 font-weight-bold">{wallet.name}</p>
                {walletModal.status === 'connecting' &&
                  wallet.name === walletModal.type && (
                    <Spinner animation="border" />
                  )}
                <img
                  src={wallet.img}
                  className="ml-auto"
                  alt={wallet.name}
                  height={25}
                  width={25}
                />
              </Col>
            ))}
          </Row>
        )}
        {walletModal.error && (
          <Alert variant="danger" className="text-center my-2">
            {walletModal.error}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;
