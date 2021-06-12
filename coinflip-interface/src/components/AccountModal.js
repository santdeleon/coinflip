import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { FaCheckCircle, FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useLayout } from '../context';

import { truncateString } from '../utils';

import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';

const AccountModal = () => {
  const { account } = useWeb3React();
  const {
    showAccountModal,
    setShowAccountModal,
    setShowWalletModal,
  } = useLayout();
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const copyToClipboard = () => {
    setIsAddressCopied(true);

    setTimeout(() => {
      setIsAddressCopied(false);
    }, 1000);
  };

  return (
    <Modal
      show={showAccountModal}
      onHide={() => setShowAccountModal(false)}
      centered
    >
      <Modal.Header title="Account" closeButton>
        <Modal.Title>Account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <small className="text-muted">Connected with MetaMask</small>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAccountModal(false);
              setShowWalletModal(true);
            }}
          >
            Change
          </Button>
        </div>
        <div className="d-flex align-items-center mb-4">
          <img
            src={MetaMaskAvatar}
            alt="MetaMask Avatar"
            aria-label="MetaMask Avatar"
            className="rounded-circle"
          />
          <h4 className="m-0 ml-2">{truncateString(account, 20)}</h4>
        </div>
        {isAddressCopied ? (
          <Button variant="success" className="w-50">
            <FaCheckCircle size="14" /> Copied
          </Button>
        ) : (
          <CopyToClipboard text={account} onCopy={copyToClipboard}>
            <Button variant="primary" className="w-50">
              <FaCopy size="14" /> Copy Address
            </Button>
          </CopyToClipboard>
        )}
        <Button
          variant="transparent"
          title="Disabled"
          size="sm"
          className="p-0 ml-3"
          disabled
        >
          <FaExternalLinkAlt size="12" /> View on Etherscan
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;
