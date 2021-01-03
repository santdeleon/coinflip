import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCopy,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLayout, useTheme } from '../hooks';
import { truncateString, colors } from '../utils';
import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';
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

const AccountModal = () => {
  const { account } = useWeb3React();
  const { layout, setLayout } = useLayout();

  const handleAccountModalClose = () =>
    setLayout({
      ...layout,
      accountModal: { ...layout.accountModal, show: false },
    });

  const handleCopyToClipboard = () => {
    setLayout({
      ...layout,
      accountModal: { ...layout.accountModal, isAddressCopied: true },
    });
    console.log(layout);

    setTimeout(() => {
      setLayout({
        ...layout,
        accountModal: { ...layout.accountModal, isAddressCopied: false },
      });
    }, [800]);
  };

  return (
    <Modal
      id="Modal--account-modal"
      show={layout.accountModal.show}
      ariaDescribedBy="Modal__ModalTitle--account"
    >
      <ModalDialog>
        <ModalContent id="Modal__ModalContent--account">
          <ModalScreenReaderText id="Modal__ModalScreenReaderText">
            This is a dialog window which overlays the main content of the page.
            The modal begins with a heading 3 called &quot;Account&quot;.
            Pressing the Modal Close Button at the top right hand side of the
            modal will close the modal and bring you back to where you were on
            the page.
          </ModalScreenReaderText>
          <ModalHeader>
            <ModalTitle id="Modal__ModalTitle--account">Account</ModalTitle>
            <ModalCloseButton onClick={handleAccountModalClose} />
          </ModalHeader>
          <ModalDivider />
          <ModalBody>
            {/* Change Wallet Type */}
            <Row>
              <Col>
                <small>Connected with MetaMask</small>
              </Col>
              <Col>
                <Button
                  variant="purple"
                  onClick={() => {
                    setLayout({
                      ...layout,
                      walletModal: { ...layout.walletModal, show: true },
                      accountModal: { ...layout.accountModal, show: false },
                    });
                  }}
                >
                  <small>Change</small>
                </Button>
              </Col>
            </Row>
            {/* Currently Selected Address */}
            <Row>
              <Col>
                <img
                  src={MetaMaskAvatar}
                  alt="MetaMask Avatar"
                  aria-label="MetaMask Avatar"
                />
                <p>{truncateString(account, 15)}</p>
              </Col>
            </Row>
            {/* Copy Address/Show on Etherscan */}
            <Row>
              <Col>
                {layout.accountModal.isAddressCopied ? (
                  <Button variant="green">
                    <small>
                      <FontAwesomeIcon icon={faCheckCircle} /> Copied
                    </small>
                  </Button>
                ) : (
                  <CopyToClipboard
                    text={account}
                    onCopy={handleCopyToClipboard}
                  >
                    <Button variant="primary">
                      <small>
                        <FontAwesomeIcon icon={faCopy} /> Copy Address
                      </small>
                    </Button>
                  </CopyToClipboard>
                )}

                <Button variant="blue">
                  <small>
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> View on
                    Etherscan
                  </small>
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default AccountModal;
