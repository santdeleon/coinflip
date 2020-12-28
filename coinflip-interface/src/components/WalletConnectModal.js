import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { X } from 'react-feather';
import cx from 'classnames';

import { injected } from '../connectors';
import { useLayout } from '../hooks';

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

const ConnectWalletModal = () => {
  const { activate } = useWeb3React();
  const {
    layout,
    setLayout,
    showConnectWalletModal,
    isWalletConnecting,
  } = useLayout();

  return (
    <>
      <Modal
        show={showConnectWalletModal}
        aria-label="Connect to a Wallet"
        onHide={() => setLayout({ ...layout, showConnectWalletModal: false })}
        centered
      >
        <Modal.Header className="d-flex align-items-center">
          <h6 className="mb-0">
            {isWalletConnecting ? 'Connecting...' : 'Connect to a Wallet'}
          </h6>
          <Button
            variant="transparent"
            size="lg"
            className="p-0"
            onClick={() =>
              setLayout({ ...layout, showConnectWalletModal: false })
            }
          >
            <X size={20} />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-light rounded">
          <Row className="justify-content-center">
            {wallets.map((wallet, idx) => (
              <Col
                key={idx}
                as={Button}
                xs={11}
                variant={wallet.name === 'MetaMask' ? 'dark' : 'transparent'}
                className={cx(
                  'd-flex my-2 py-3 px-3 border border-muted rounded',
                  {
                    disabled: wallet.name !== 'MetaMask',
                  },
                )}
                style={{
                  pointerEvents: wallet.name !== 'MetaMask' && 'none',
                }}
                // TODO: Setup wallet support for all connector types
                onClick={() => {
                  activate(injected, undefined, true).then(() => {
                    // refresh the page to keep UI up-to-date
                    window.location.reload();
                  });
                }}
              >
                <p className="mr-auto mb-0 font-weight-bold">{wallet.name}</p>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
