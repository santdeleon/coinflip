import React, { useState } from "react";
import { ethers } from "ethers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { object, string, bool, func } from "prop-types";

import "./index.css";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
};

const Interface = ({
  user,
  game,
  message,
  setMessage,
  showMessage,
  setShowMessage,
}) => {
  const [currentTab, setCurrentTab] = useState("Fund");
  const [betAmount, setBetAmount] = useState("0");
  const [fundAmount, setFundAmount] = useState("0");

  const tabTo = (string) => setCurrentTab(string);

  const handleChange = (e) => {
    e.currentTarget.id === "bet"
      ? setBetAmount(e.currentTarget.value)
      : setFundAmount(e.currentTarget.value);
  };

  const truncate = (string, desiredLength, separator) => {
    if (string.length <= desiredLength) return string;

    separator = separator || "...";

    const sepLen = separator.length,
      charsToShow = desiredLength - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      string.substr(0, frontChars) +
      separator +
      string.substr(string.length - backChars)
    );
  };

  const fundContract = async (e) => {
    // check that the funding criteria is okay
    switch (true) {
      case fundAmount.match(/[^0-9]/g):
        setMessage("Sorry, please use numbers for your donation!");
        setShowMessage(true);
        return;
      case fundAmount === "0" || fundAmount === 0:
        setMessage("Sorry, you can't send zero ether to the contract!");
        setShowMessage(true);
        return;
      case parseInt(fundAmount) > 5 || parseInt(fundAmount) < 0:
        setMessage(
          "Sorry, you must must send an amount greater than zero or less than or equal to 5 ether!"
        );
        setShowMessage(true);
        return;
      default:
        console.log("Your donation is being handled...");
    }

    const config = { value: ethers.utils.parseEther(fundAmount) };

    // send the fund
    let tx = await game.contract.fundContract(config);
    let receipt = await tx.wait(1);
    // let sumEvent = receipt.events.pop();
    console.log(receipt);

    // success
    setMessage(
      `Your donation of ${parseFloat(
        fundAmount
      )} ether has been accepted. Thanks for your support!`
    );
    setShowMessage(true);
    setFundAmount("0");
    game.contractBalance = game.contractBalance + Number(fundAmount);
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
                  currentTab === "Fund" && "active"
                }`}
                onClick={() => tabTo("Fund")}
              >
                <h5 className="mb-0 mt-2">Fund</h5>
              </Button>
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
          {/* Fund Tab */}
          {currentTab === "Fund" && (
            <Row className="mt-4 flex-column justify-content-center">
              <Col className="text-center">
                <h2>
                  <input
                    id="fund"
                    type="text"
                    value={fundAmount}
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
                <h5 style={{ color: "#C3C5CB" }}>
                  {truncate(user.currentAddress, 32)}
                </h5>
              </Col>
              <Col>
                <Button
                  className="send-btn w-50 font-weight-bold"
                  onClick={fundContract}
                >
                  Fund Contract
                </Button>
              </Col>
            </Row>
          )}
          {/* Play Tab */}
          {currentTab === "Play" && (
            <Row className="mt-4 flex-column justify-content-center">
              <Col className="text-center">
                <h2>
                  <input
                    id="bet"
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
                <h5 style={{ color: "#C3C5CB" }}>
                  {truncate(user.currentAddress, 32)}
                </h5>
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
                <h5 style={{ color: "#C3C5CB" }}>N/A</h5>
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
                <h5 style={{ color: "#C3C5CB" }}>N/A</h5>
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
                    There must be funds in the contract to play.
                  </li>
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

Interface.propTypes = propTypes;
Interface.defaultProps = defaultProps;
export default Interface;
