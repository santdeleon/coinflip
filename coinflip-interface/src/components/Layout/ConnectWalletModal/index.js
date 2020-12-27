import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { X } from 'react-feather';

import { injected } from '../../../connectors';
import { useApplication } from '../../../context/ApplicationContext';

import wallets from './wallets';

const ConnectWalletModal = () => {
  const { activate } = useWeb3React();
  const { isWalletConnecting, showModal, setShowModal } = useApplication();

  return (
    <>
      <Modal
        show={showModal}
        centered
        aria-labelledby="Connect to a Wallet"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="d-flex align-items-center">
          <h6 className="mb-0">{isWalletConnecting ? 'Connecting...' : 'Connect to a Wallet'}</h6>
          <Button
            variant="transparent"
            size="lg"
            className="p-0"
            onClick={() => setShowModal(false)}
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
                className={`${
                  wallet.name !== 'MetaMask' && 'disabled'
                } d-flex my-2 py-3 px-3 border border-muted rounded`}
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
