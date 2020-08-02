import React from "react";
import { func, bool } from "prop-types";
import { Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import wallets from "./wallets";

const propTypes = {
  fetchData: func.isRequired,
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  isLoading: bool.isRequired,
};

const defaultProps = {
  fetchData: () => {},
  showModal: false,
  setShowModal: () => {},
  isLoading: false,
};

const ConnectWalletModal = ({
  fetchData,
  showModal,
  setShowModal,
  isLoading,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        centered
        aria-labelledby="Connect to a Wallet"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="d-flex align-items-center">
          <h6 className="mb-0">
            {isLoading ? "Connecting..." : "Connect to a Wallet"}
          </h6>
          <Button
            variant="transparent"
            size="lg"
            className="p-0"
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-light rounded">
          {!isLoading ? (
            <Row className="justify-content-center">
              {wallets.map((wallet, idx) => (
                <Col
                  key={idx}
                  as={Button}
                  xs={11}
                  variant={wallet.name === "MetaMask" ? "dark" : "transparent"}
                  className={`${
                    wallet.name !== "MetaMask" && "disabled"
                  } d-flex my-2 py-3 px-3 border border-muted rounded`}
                  style={{
                    pointerEvents: wallet.name !== "MetaMask" && "none",
                  }}
                  onClick={fetchData}
                >
                  <p className="mr-auto mb-0 font-weight-bold">{wallet.name}</p>
                  <img
                    src={wallet.src}
                    className="ml-auto"
                    alt={wallet.name}
                    height={25}
                    width={25}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="text-center">
              <Col>
                <Spinner animation="border" variant="dark" />
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

ConnectWalletModal.propTypes = propTypes;
ConnectWalletModal.defaultProps = defaultProps;
export default ConnectWalletModal;
