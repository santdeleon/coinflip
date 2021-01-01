import React from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCopy,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { X } from 'react-feather';
import { useWeb3React } from '@web3-react/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useLayout, useTheme } from '../hooks';
import { truncateString } from '../utils';

import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';

const AccountModal = () => {
  const { account } = useWeb3React();
  const { theme } = useTheme();
  const { layout, setLayout } = useLayout();

  const handleCopyToClipboard = () => {
    setLayout({
      ...layout,
      modals: {
        account: { ...account, isTextCopied: true },
      },
    });

    setTimeout(() => {
      setLayout({
        ...layout,
        modals: {
          account: { ...account, isTextCopied: false },
        },
      });
    }, [800]);
  };

  return (
    <Modal
      centered
      show={layout.modals.account.show}
      aria-label="Account"
      onHide={() =>
        setLayout({
          ...layout,
          modals: {
            account: { show: false },
          },
        })
      }
    >
      <Modal.Header className="d-flex align-items-center text-dark">
        Account
        <Button
          variant="transparent"
          size="lg"
          className="p-0"
          onClick={() =>
            setLayout({
              ...layout,
              modals: {
                account: { show: false },
              },
            })
          }
        >
          <X size={22} />
        </Button>
      </Modal.Header>
      <Modal.Body className="py-3 px-4">
        <Row className="px-2">
          <Col className="border rounded py-2">
            <Row noGutters>
              <Col className="d-flex align-items-center">
                <small className="text-muted">Connected with MetaMask</small>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  variant=""
                  className="rounded text-danger p-0"
                  onClick={() => {
                    setLayout({
                      ...layout,

                      modals: {
                        wallet: { show: true },
                        account: {
                          ...account,
                          show: false,
                          animation: false,
                        },
                      },
                    });
                  }}
                >
                  <small>Change</small>
                </Button>
              </Col>
            </Row>
            <Row className="pt-3 pb-1">
              <Col className="d-flex align-items-center">
                <img
                  src={MetaMaskAvatar}
                  alt="MetaMask Avatar"
                  aria-label="MetaMask Avatar"
                  className="rounded-circle"
                />{' '}
                <p className="lead mb-0 ml-1 font-weight-bold">
                  {truncateString(account, 15)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex">
                {layout.modals.account.isAddressCopied ? (
                  <Button
                    variant="link"
                    className="text-secondary text-decoration-none mr-4 p-0"
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
                      variant="link"
                      className="text-secondary text-decoration-none mr-4 p-0"
                    >
                      <small>
                        <FontAwesomeIcon icon={faCopy} /> Copy Address
                      </small>
                    </Button>
                  </CopyToClipboard>
                )}

                <Button variant="link" className="text-secondary p-0">
                  <small>
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> View on
                    Etherscan
                  </small>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;
