import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCopy,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

import { useLayout } from '../hooks';

import { truncateString } from '../utils';

import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';

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
          <ModalBody className="pt-2 pb-4">
            {/* Change Wallet Type */}
            <Row className="px-3 py-2" noGutters>
              <Col className="d-flex align-items-center justify-content-between w-100">
                <small>Connected with MetaMask</small>
                <Button
                  id="Modal__Button--change-connected-wallet"
                  variant="pink"
                  onClick={() => {
                    setLayout({
                      ...layout,
                      walletModal: { ...layout.walletModal, show: true },
                      accountModal: { ...layout.accountModal, show: false },
                    });
                  }}
                >
                  Change
                </Button>
              </Col>
            </Row>
            {/* Currently Selected Address */}
            <Row className="px-3 py-4" noGutters>
              <Col className="d-flex align-items-center w-100">
                <img
                  src={MetaMaskAvatar}
                  alt="MetaMask Avatar"
                  aria-label="MetaMask Avatar"
                  className="rounded-circle"
                />
                <h4 className="m-0 ml-2">{truncateString(account, 20)}</h4>
              </Col>
            </Row>
            {/* Copy Address/Show on Etherscan */}
            <Row className="px-3 py-2" noGutters>
              <Col>
                {layout.accountModal.isAddressCopied ? (
                  <Button
                    id="Modal__Button--address-copied"
                    variant="green"
                    className="w-50"
                  >
                    <small>
                      <FontAwesomeIcon icon={faCheckCircle} /> Copied
                    </small>
                  </Button>
                ) : (
                  <CopyToClipboard
                    text={account}
                    onCopy={handleCopyToClipboard}
                  >
                    <Button
                      id="Modal__Button--copy-address"
                      variant="light"
                      className="w-50"
                    >
                      <small>
                        <FontAwesomeIcon icon={faCopy} /> Copy Address
                      </small>
                    </Button>
                  </CopyToClipboard>
                )}
                <Button
                  id="Modal__Button--view-address-on-etherscan"
                  variant="transparent"
                  className="w-50"
                  disabled
                >
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
