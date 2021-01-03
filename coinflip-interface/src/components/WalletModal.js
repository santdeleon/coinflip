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
  ModalScreenReaderText,
  ModalDivider,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
  Row,
} from '.';

const StyledModalContent = styled(ModalContent)`
  width: 400px;

  p {
    font-size: 1.13rem;
    margin: 0 0 0 1rem;
    font-weight: 400;
  }
`;

const StyledWalletModalRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
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

  const handlWalletModalClose = () =>
    setLayout({
      ...layout,
      walletModal: {
        ...layout.walletModal,
        show: false,
      },
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
            status: 'connected',
            connectedWalletName: 'metamask',
          },
        });
        console.log('got here');
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
        console.log('woops');
      });
  };

  return (
    <Modal
      id="Modal--wallet-modal"
      show={layout.walletModal.show}
      ariaDescribedBy="Modal__ModalTitle--connect-to-a-wallet"
    >
      <ModalDialog>
        <StyledModalContent id="Modal__ModalContent--connect-to-a-wallet">
          <ModalScreenReaderText id="Modal__ModalScreenReaderText">
            This is a dialog window which overlays the main content of the page.
            The modal begins with a heading 3 called &quot;Connect to a
            Wallet&quot;. Pressing the Modal Close Button at the top right hand
            side of the modal will close the modal and bring you back to where
            you were on the page.
          </ModalScreenReaderText>
          <ModalHeader>
            <ModalTitle id="Modal__ModalTitle--connect-to-a-wallet">
              {active ? 'Connected' : 'Connect to a Wallet'}
            </ModalTitle>
            <ModalCloseButton onClick={handlWalletModalClose} />
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
                  theme={theme}
                  disabled={wallet.name !== 'metamask'}
                  isConnected={
                    layout.walletModal.status === 'connected' &&
                    layout.walletModal.connectedWalletName === wallet.name
                  }
                  onClick={() => {
                    layout.walletModal.status === 'not_connected' &&
                      handleWalletConnect(wallet.name);
                  }}
                >
                  <Col>
                    <img
                      src={wallet.img}
                      alt={wallet.nameFormal}
                      aria-label={wallet.nameFormal}
                      height={28}
                      width={28}
                    />
                    <p>{wallet.nameFormal}</p>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        color:
                          layout.walletModal.status === 'connected' &&
                          layout.walletModal.connectedWalletName === wallet.name
                            ? colors.$green50
                            : colors.$pink20,
                      }}
                    />
                  </Col>
                </StyledWalletModalRow>
              ))}
            {layout.walletModal.error && (
              <Row>
                <Col>
                  <p>{layout.walletModal.error}</p>
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
