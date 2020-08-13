import React from "react";
import { object, string, func, bool } from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faMagic } from "@fortawesome/free-solid-svg-icons";

import { truncateString } from "../../../../../../utils/truncateString";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  currentTab: string.isRequired,
  transactionAmount: string.isRequired,
  setTransactionAmount: func.isRequired,
  transactionButton: string.isRequired,
  setTransactionButton: func.isRequired,
  sendTransaction: func.isRequired,
  withdraw: func.isRequired,
  transactionResults: object.isRequired,
  isDisconnected: bool.isRequired,
  setShowModal: func.isRequired,
};

const defaultProps = {
  user: null,
  game: null,
  currentTab: null,
  transactionAmount: null,
  setTransactionAmount: null,
  transactionButton: null,
  setTransactionButton: null,
  sendTransaction: null,
  withdraw: null,
  transactionResults: null,
  isDisconnected: true,
  setShowModal: () => {},
};

const TabBody = ({
  user,
  game,
  currentTab,
  setCurrentTab,
  transactionAmount,
  setTransactionAmount,
  transactionButton,
  setTransactionButton,
  sendTransaction,
  withdraw,
  transactionResults,
  isDisconnected,
  setShowModal,
}) => {
  const handleChange = (e) => setTransactionAmount(e.currentTarget.value);

  return (
    <>
      {/* Play Tab */}
      {currentTab === "Play" && (
        <Row className="mt-4 flex-column justify-content-center">
          <Col className="text-center">
            <h2>
              <input
                id="bet"
                type="text"
                value={transactionAmount}
                onChange={handleChange}
                className="border-0 text-center"
              />
            </h2>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <FontAwesomeIcon icon={faEthereum} className="mr-2" />
              <h5 className="mb-0">Ethereum</h5>
            </div>
          </Col>
          <Col xs={10} className="border my-5 mx-auto text-left pt-2 rounder">
            <p className="mb-0">Sender</p>
            <h5 className="muted-h5">
              {truncateString(user.selectedAddress, 32)}
            </h5>
          </Col>
          <Col>
            <Button
              id={transactionButton}
              className={`primary-btn w-50 font-weight-bold ml-5`}
              onClick={isDisconnected ? setShowModal : sendTransaction}
            >
              {transactionButton}
            </Button>
            <Button
              variant="transparent"
              disabled={isDisconnected && true}
              onClick={() => {
                transactionButton === "Fund Contract"
                  ? setTransactionButton("Place Bet")
                  : setTransactionButton("Fund Contract");
              }}
            >
              <FontAwesomeIcon icon={faMagic} />
            </Button>
          </Col>
        </Row>
      )}
      {/* Results Tab */}
      {currentTab === "Results" && (
        <Row>
          <Col xs={10} className="border my-4 mx-auto text-left pt-2 rounder">
            <p className="mb-0">Game won</p>
            <h5 className="muted-h5">
              {transactionResults.won !== undefined
                ? String(transactionResults.won)
                : "Place a bet to see the results"}
            </h5>
          </Col>
          <Col xs={10} className="mx-auto text-center">
            <FontAwesomeIcon className="text-muted" icon={faArrowDown} />
          </Col>
          <Col xs={10} className="border my-4 mx-auto text-left pt-2 rounder">
            <p className="mb-0">How much did I Win/Lose</p>
            <h5 className="muted-h5">
              {transactionResults.amount !== undefined
                ? transactionResults.amount + " ether"
                : "Place a bet to see the results"}
            </h5>
          </Col>
        </Row>
      )}

      {/* Content - Rules */}
      {currentTab === "Rules" && (
        <Row className="flex-column">
          <Col xs={10} className="border my-4 mx-auto text-left pt-2 rounder">
            <ul className="p-0" style={{ listStyleType: "none" }}>
              <li className="rule mt-2">
                There must be funds in the contract to play.
              </li>
              <li className="rule mt-2">If you win you get double your bet.</li>
              <li className="rule mt-2">
                You can't wager more ether than the contract balance has.
              </li>
              <li className="rule mt-2">
                Bet's must be more than 0.01 ether but no more than 5 ether.
              </li>
              <li className="rule mt-2">Good Luck! Have Fun.</li>
            </ul>
          </Col>
          <Col xs={10} className="mx-auto text-center mb-4">
            <FontAwesomeIcon className="text-muted" icon={faArrowDown} />
          </Col>
          <Col className="mx-auto">
            <Button
              className="primary-btn w-50 font-weight-bold"
              onClick={() => setCurrentTab("Play")}
            >
              Got it
            </Button>
          </Col>
        </Row>
      )}
      {/* Withdraw Tab */}
      {currentTab === "Withdraw" && (
        <Row className="mt-4 flex-column justify-content-center">
          <Col className="mb-4 mt-3">
            <h5 className="muted-h5">
              Welcome back, {user.isOwner ? "admin" : "user"}. <br />
              Ready to withdraw your funds?
            </h5>
          </Col>
          <Col className="text-center">
            <h2>
              <input
                id="withdraw"
                value={user.isOwner ? game.contractBalance : user.userBalance}
                className="border-0 text-center"
                placeholder="0.0"
                readOnly
              />
            </h2>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <FontAwesomeIcon icon={faEthereum} className="mr-2" />
              <h5 className="mb-0">Ethereum</h5>
            </div>
          </Col>
          <Col className="mt-5">
            <Button
              className="primary-btn w-50 font-weight-bold"
              onClick={isDisconnected ? setShowModal : withdraw}
            >
              {isDisconnected ? "Connect to a Wallet" : "Withdraw Funds"}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

TabBody.propTypes = propTypes;
TabBody.defaultProps = defaultProps;
export default TabBody;
