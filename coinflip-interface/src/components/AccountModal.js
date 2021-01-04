import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCopy,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLayout } from '../hooks';
import { truncateString } from '../utils';
import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';
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
          <ModalHeader title="Account">
            <ModalTitle id="Modal__ModalTitle--account">Account</ModalTitle>
            <ModalCloseButton onClick={handleAccountModalClose} />
          </ModalHeader>
          <ModalDivider />
          <ModalBody>
            {/* Change Wallet Type */}
            <Row>
              <Col className="d-flex align-items-center justify-content-between w-100">
                <small>Connected with MetaMask</small>
                <Button
                  variant="red"
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
              <Col className="d-flex align-items-center w-100">
                <img
                  src={MetaMaskAvatar}
                  alt="MetaMask Avatar"
                  aria-label="MetaMask Avatar"
                  className="rounded-circle"
                />
                <h2 className="m-0 ml-2">{truncateString(account, 15)}</h2>
              </Col>
            </Row>
            {/* Copy Address/Show on Etherscan */}
            <Row>
              <Col>
                {layout.accountModal.isAddressCopied ? (
                  <Button variant="green" className="w-50">
                    <small>
                      <FontAwesomeIcon icon={faCheckCircle} /> Copied
                    </small>
                  </Button>
                ) : (
                  <CopyToClipboard
                    text={account}
                    onCopy={handleCopyToClipboard}
                  >
                    <Button variant="primary" className="w-50">
                      <small>
                        <FontAwesomeIcon icon={faCopy} /> Copy Address
                      </small>
                    </Button>
                  </CopyToClipboard>
                )}
                <Button variant="transparent" className="w-50" disabled>
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
