import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import cx from 'classnames';

import {
  Button,
  Modal,
  ModalDialog,
  ModalContent,
  ModalDivider,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
} from '.';

import { useLayout, useTheme } from '../hooks';

import { getErrorMessage, colors, wallets } from '../utils';

import { injected } from '../connectors';

const WalletModal = () => {
  const { activate } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { theme } = useTheme();

  const handleWalletModalClose = () =>
    setLayout({
      ...layout,
      walletModal: { ...layout.walletModal, show: false },
    });

  const handleWalletConnect = (walletType) => {
    setLayout({
      ...layout,
      walletModal: {
        ...layout.walletModal,
        status: 'connecting',
        connectedWalletName: walletType,
      },
    });

    activate(injected, undefined, true)
      .then(() => {
        setLayout({
          ...layout,
          walletModal: {
            ...layout.walletModal,
            show: false,
            status: 'connected',
            connectedWalletName: 'metamask',
          },
        });
      })
      .catch((err) => {
        setLayout({
          ...layout,
          walletModal: {
            ...layout.walletModal,
            status: 'not_connected',
            error: getErrorMessage(err),
          },
        });
      });
  };

  const getConnectionStatusIconColor = (walletName) => {
    let color = colors.$pink20;

    if (
      layout.walletModal.status === 'connected' &&
      layout.walletModal.connectedWalletName === walletName
    ) {
      color = colors.$green60;
    } else if (
      layout.walletModal.status === 'connecting' &&
      layout.walletModal.connectedWalletName === walletName
    ) {
      color = colors.$yellow40;
    }

    return color;
  };

  return (
    <Modal
      id="Modal--wallet-modal"
      show={layout.walletModal.show}
      ariaDescribedBy="Modal__ModalTitle--connect-to-a-wallet"
    >
      <ModalDialog>
        <ModalContent id="Modal__ModalContent--connect-to-a-wallet">
          <ModalHeader title="Connect to a Wallet">
            <ModalTitle id="Modal__ModalTitle--connect-to-a-wallet">
              Connect to a Wallet
            </ModalTitle>
            <ModalCloseButton onClick={handleWalletModalClose} />
          </ModalHeader>
          <ModalDivider />
          <ModalBody
            className={cx('py-2', {
              'bg-light': theme === 'light',
            })}
            style={{
              borderBottom: '1px solid transparent',
              borderRadius: '0 0 12px 12px',
              backgroundColor: colors.$gray70,
            }}
          >
            {!layout.walletModal.error &&
              wallets.map((wallet) => (
                <Row
                  key={wallet.id}
                  as={Button}
                  variant="transparent"
                  id="WalletModal__StyledWalletModalRow--wallet-selection-button"
                  className="d-flex my-3 w-100"
                  theme={theme}
                  disabled={wallet.name !== 'metamask'}
                  onClick={() =>
                    layout.walletModal.status !== 'connected'
                      ? handleWalletConnect(wallet.name)
                      : null
                  }
                  noGutters
                >
                  <Col
                    xs={10}
                    className={cx(
                      'd-flex align-items-center justify-content-between mx-auto border p-3',
                      {
                        'border-secondary': theme === 'dark',
                        'bg-dark':
                          wallet.name === 'metamask' &&
                          layout.walletModal.status === 'connected',
                      },
                    )}
                    style={{
                      borderRadius: '12px',
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <small>
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{
                            color: getConnectionStatusIconColor(wallet.name),
                          }}
                        />
                      </small>
                      <h6
                        className={cx('mb-0 ml-2 font-weight-normal', {
                          'text-dark':
                            theme === 'light' &&
                            layout.walletModal.status !== 'connected',
                          'text-light':
                            theme === 'dark' &&
                            layout.walletModal.status !== 'connected',
                          'text-white':
                            wallet.name === 'metamask' &&
                            layout.walletModal.status === 'connected',
                        })}
                      >
                        {wallet.nameFormal}
                      </h6>
                    </div>
                    <img
                      src={wallet.img}
                      alt={wallet.nameFormal}
                      aria-label={wallet.nameFormal}
                      height={30}
                      width={30}
                    />
                  </Col>
                </Row>
              ))}
            {layout.walletModal.error && (
              <Row>
                <Col className="w-100 p-5">
                  <p className="mb-0 text-center w-100">
                    {layout.walletModal.error}
                  </p>
                </Col>
              </Row>
            )}
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default WalletModal;
