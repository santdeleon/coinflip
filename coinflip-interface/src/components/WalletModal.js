import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { useLayout, useTheme } from '../hooks';
import { getErrorMessage, colors, wallets } from '../utils';
import { injected } from '../connectors';
import {
  Button,
  Col,
  Modal,
  ModalDialog,
  ModalContent,
  ModalDivider,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  Row,
} from '.';

const StyledModalContent = styled(ModalContent)`
  width: 400px;
`;

const StyledWalletModalRow = styled(Row)`
  background-color: ${({ isConnected, theme }) => {
    if (isConnected) {
      return theme === 'light' ? colors.$gray10 : colors.$gray70;
    }
  }};
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'light' ? colors.$gray10 : colors.$gray70};
  }
`;

const WalletModal = () => {
  const { active, activate } = useWeb3React();
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
        <StyledModalContent id="Modal__ModalContent--connect-to-a-wallet">
          <ModalHeader title="Connect to a Wallet">
            <ModalTitle id="Modal__ModalTitle--connect-to-a-wallet">
              {active ? 'Connected' : 'Connect to a Wallet'}
            </ModalTitle>
            <ModalCloseButton onClick={handleWalletModalClose} />
          </ModalHeader>
          <ModalDivider />
          <ModalBody>
            {!layout.walletModal.error &&
              wallets.map((wallet) => (
                <StyledWalletModalRow
                  key={wallet.id}
                  as={Button}
                  variant="transparent"
                  id="WalletModal__StyledWalletModalRow--wallet-selection-button"
                  className="d-flex align-items-center justify-content-between w-100 p-0"
                  theme={theme}
                  disabled={wallet.name !== 'metamask'}
                  isConnected={
                    layout.walletModal.status === 'connected' &&
                    layout.walletModal.connectedWalletName === wallet.name
                  }
                  onClick={() =>
                    layout.walletModal.status !== 'connected'
                      ? handleWalletConnect(wallet.name)
                      : null
                  }
                >
                  <Col className="d-flex align-items-center">
                    <img
                      src={wallet.img}
                      alt={wallet.nameFormal}
                      aria-label={wallet.nameFormal}
                      height={28}
                      width={28}
                    />
                    <h3
                      className="m-0 ml-3"
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: '500',
                        fontSize: '1rem',
                      }}
                    >
                      {wallet.nameFormal}
                    </h3>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        color: getConnectionStatusIconColor(wallet.name),
                      }}
                    />
                  </Col>
                </StyledWalletModalRow>
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
        </StyledModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default WalletModal;
