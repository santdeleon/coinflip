import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FaCircle } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import cx from 'classnames';

import { useLayout } from '../context';

import { getErrorMessage, wallets } from '../utils';

import { injected } from '../connectors';

const WalletModal = () => {
  const { active, activate } = useWeb3React();
  const { showWalletModal, setShowWalletModal } = useLayout();
  const [wallet, setWallet] = useState({
    status: active ? 'connected' : 'not_connected',
    name: active ? 'metamask' : null,
    error: null,
  });

  const connectToWallet = (wallet) => {
    setWallet({ status: 'connecting', name: wallet });

    activate(injected, undefined, true)
      .then(() => {
        setWallet({
          ...wallet,
          status: 'connecting',
        });
        setShowWalletModal(false);
      })
      .catch((err) => {
        setWallet({
          status: 'not_connected',
          name: null,
          error: getErrorMessage(err),
        });
      });
  };

  const handleModalHide = () => {
    setShowWalletModal(false);

    // not an ideal way of handling this but is fine for the purpose of this app
    setTimeout(() => {
      setWallet({
        status: active ? 'connected' : 'not_connected',
        name: active ? 'metamask' : null,
        error: null,
      });
    }, 300);
  };

  return (
    <Modal show={showWalletModal} onHide={handleModalHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Connect to a Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        {!wallet.error &&
          wallets.map(({ id, name, nameFormal, img }) => (
            <Row
              key={id}
              as={Button}
              variant={active && name === 'metamask' ? 'dark' : 'light'}
              className="d-flex my-3 w-100 border border-muted"
              disabled={name !== 'metamask'}
              onClick={() =>
                active ? setShowWalletModal(false) : connectToWallet(name)
              }
              noGutters
            >
              <Col className="d-flex align-items-center justify-content-between p-2">
                <span className="d-flex align-items-center">
                  <FaCircle
                    size="10"
                    className={cx({
                      'text-success': active && name === 'metamask',
                      'text-warning':
                        wallet.status === 'connecting' && wallet.name === name,
                      'text-danger': name !== 'metamask',
                    })}
                  />
                  <h6 className="mb-0 ml-2 font-weight-normal">{nameFormal}</h6>
                </span>
                <img
                  src={img}
                  alt={nameFormal}
                  aria-label={nameFormal}
                  height={30}
                  width={30}
                />
              </Col>
            </Row>
          ))}
        {wallet.error && (
          <Row>
            <Col className="w-100 p-5">
              <p className="mb-0 text-center w-100">{wallet.error}</p>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WalletModal;
