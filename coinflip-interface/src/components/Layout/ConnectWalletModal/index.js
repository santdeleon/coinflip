import React from "react";
import { Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import { X } from "react-feather";

// import { useContract } from "../../../context/ContractContext";
import { useApplication } from "../../../context/ApplicationContext";

import wallets from "./wallets";

const ConnectWalletModal = () => {
  const { isWalletConnecting, showModal, setShowModal } = useApplication();

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
            {isWalletConnecting ? "Connecting..." : "Connect to a Wallet"}
          </h6>
          <Button
            variant="transparent"
            size="lg"
            className="p-0"
            onClick={() => setShowModal(false)}
          >
            <X size={20} />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-light rounded">
          {isWalletConnecting ? (
            <Row className="text-center">
              <Col>
                <Spinner animation="border" variant="dark" />
              </Col>
            </Row>
          ) : (
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
                  // TODO: Setup Click to connect to User Wallet
                  // onClick={() => {}}
                >
                  <p className="mr-auto mb-0 font-weight-bold">{wallet.name}</p>
                  <img
                    src={wallet.img}
                    className="ml-auto"
                    alt={wallet.name}
                    height={25}
                    width={25}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
