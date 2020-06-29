import React, { useState } from "react";
import { ethers } from "ethers";
import { object, string, bool, func } from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

import "./index.css";

import Tabs from "./Tabs";

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
  const [currentTab, setCurrentTab] = useState("Play");
  const [transactionAmount, setTransactionAmount] = useState("0");
  const [transactionButton, setTransactionButton] = useState("Fund Contract");

  const sendTransaction = async (e) => {
    switch (true) {
      case transactionAmount.match(/[^0-9]/g):
        setMessage("Sorry, only numbers are allowed here.");
        setShowMessage(true);
        return;
      case transactionAmount === "0" || transactionAmount === 0:
        setMessage("Sorry, you can't send 0 ether.");
        setShowMessage(true);
        return;
      case parseInt(transactionAmount) > 5 || parseInt(transactionAmount) < 0:
        setMessage("Sorry, the amount must be greater than 0 or less than 5.");
        setShowMessage(true);
        return;
      default:
        console.log("Your transaction is being submitted...");
    }

    const config = { value: ethers.utils.parseEther(transactionAmount) };
    let tx;

    e.currentTarget.id === "Fund Contract"
      ? (tx = await game.contract.fundContract(config))
      : (tx = await game.contract.bet(config));

    let receipt = await tx.wait(1);
    let sumEvent = receipt.events.pop();

    console.log(sumEvent);
    setMessage(
      `Your transaction of ${parseFloat(
        transactionAmount
      )} ether has been accepted.`
    );
    setShowMessage(true);
    setTransactionAmount("0");
    game.contractBalance = game.contractBalance + Number(transactionAmount);
  };

  // const withdraw = async () => {
  //   let tx = await game.contract.withdraw();
  //   let receipt = await tx.wait(1);
  //   console.log(receipt);
  //
  //   setMessage("Congrats! The funds have made it to your account.");
  //   setShowMessage(true);
  //   game.contractBalance = 0;
  // };

  return (
    <Container id="Interface" className="Interface py-5">
      <Row className="justify-content-center px-3 my-5">
        <Col md={10} lg={6} className="interface-container bg-white pb-4 px-0">
          <div className="rainbow-rounded-top px-5 py-2" />
          <Tabs
            user={user}
            game={game}
            message={message}
            setMessage={setMessage}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            transactionAmount={transactionAmount}
            setTransactionAmount={setTransactionAmount}
            transactionButton={transactionButton}
            setTransactionButton={setTransactionButton}
            sendTransaction={sendTransaction}
          />
        </Col>
      </Row>
    </Container>
  );
};

Interface.propTypes = propTypes;
Interface.defaultProps = defaultProps;
export default Interface;
