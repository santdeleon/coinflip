import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { string, object } from "prop-types";

import "./index.css";

// const propTypes = {};

// const defaultProps = {};

const Interface = ({ owner, user }) => {
  const [betAmount, setBetAmount] = useState("0.0");
  const [currentTab, setCurrentTab] = useState("Play");

  const tabTo = (string) => {
    setCurrentTab(string);
  };

  const handleChange = (e) => {
    setBetAmount(e.target.value);
  };

  // const submitBet = (e) => {}

  return (
    <Container id="Interface" className="Interface py-5">
      {/* Interface Container */}
      <Row className="justify-content-center px-3 my-5">
        {/* Interface Contents */}
        <Col
          md={10}
          lg={6}
          className={`interface-container bg-white pb-4 px-0`}
        >
          <div className="rainbow-rounded-top px-5 py-2"></div>

          {/* Interface Tabs */}
          <Row className="mt-3 mb-3 justify-content-center">
            <Col xs={10} className="d-flex justify-content-around">
              <Button
                className={`tab-button py-1 ${
                  currentTab === "Play" && "active"
                }`}
                onClick={() => tabTo("Play")}
              >
                {" "}
                <h5 className="mb-0 mt-2">Play</h5>
              </Button>{" "}
              <Button
                className={`tab-button py-1 ${
                  currentTab === "Results" && "active"
                }`}
                onClick={() => tabTo("Results")}
              >
                <h5 className="mb-0 mt-2">Results</h5>
              </Button>
              <Button
                className={`tab-button py-1 ${
                  currentTab === "Rules" && "active"
                }`}
                onClick={() => tabTo("Rules")}
              >
                <h5 className="mb-0 mt-2">Rules</h5>
              </Button>
            </Col>
          </Row>

          {/* Play Tab */}
          {currentTab === "Play" && (
            <Row className="mt-4 flex-column justify-content-center">
              <Col className="text-center">
                <h2>
                  <input
                    type="text"
                    value={betAmount}
                    onChange={handleChange}
                    className="bet-amount-input border-0 text-center"
                    placeholder="0.0"
                  />
                </h2>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <FontAwesomeIcon icon={faEthereum} className="mr-2" />
                  <h5 className="mb-0">Ethereum</h5>
                </div>
              </Col>

              <Col
                xs={10}
                className="border my-5 mx-auto text-left pt-2"
                style={{ borderRadius: "20px" }}
              >
                <p className="mb-0">Sender</p>
                <h5 style={{ color: "#C3C5CB" }}>0x13523t3445252</h5>
              </Col>
              <Col>
                <Button className="send-btn w-50 font-weight-bold">Send</Button>
              </Col>
            </Row>
          )}

          {/* Results Tab */}
          {currentTab === "Results" && (
            <Row>
              <Col
                xs={10}
                className="border my-4 mx-auto text-left pt-2"
                style={{ borderRadius: "20px" }}
              >
                <p className="mb-0">Game won</p>
                <h5 style={{ color: "#C3C5CB" }}>No</h5>
              </Col>
              <Col xs={10} className="mx-auto text-center">
                <FontAwesomeIcon className="text-muted" icon={faArrowDown} />
              </Col>
              <Col
                xs={10}
                className="border my-4 mx-auto text-left pt-2"
                style={{ borderRadius: "20px" }}
              >
                <p className="mb-0">How much did I Win/lose</p>
                <h5 style={{ color: "#C3C5CB" }}>No</h5>
              </Col>
            </Row>
          )}

          {/* Content - Rules */}
          {currentTab === "Rules" && (
            <Row className="flex-column">
              <Col
                xs={10}
                className="border my-4 mx-auto text-left pt-2"
                style={{ borderRadius: "20px" }}
              >
                <ul className="p-0" style={{ listStyleType: "none" }}>
                  <li className="rule mt-2">
                    If you win you get double your bet.
                  </li>
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
                  className="send-btn w-50 font-weight-bold"
                  onClick={() => tabTo("Play")}
                >
                  Got it
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

// Interface.propTypes = propTypes;
// Interface.defaultProps = defaultProps;
export default Interface;
