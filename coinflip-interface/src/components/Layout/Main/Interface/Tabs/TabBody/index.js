import React from "react";
import { parseEther } from "@ethersproject/units";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faMagic } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../../../../context/UserContext.js";
import { useContract } from "../../../../../../context/ContractContext.js";
import { useApplication } from "../../../../../../context/ApplicationContext";

import { truncateString } from "../../../../../../utils/truncateString";

const TabBody = () => {
  const { userAddress, userBalance, setUserBalance, isOwner } = useUser();
  const { contract, contractBalance, setContractBalance } = useContract();
  const {
    isConnected,
    setShowModal,
    currentTab,
    transactionAmount,
    transactionResults,
    transactionButtonText,
    setTransactionButtonText,
    setTransactionAmount,
    setCurrentTab,
    setAlert,
    setTransactionResults,
  } = useApplication();
  const handleChange = (e) => setTransactionAmount(e.currentTarget.value);

  const sendTransaction = async (e) => {
    switch (true) {
      case transactionAmount.match(/[^0-9]/g):
        setAlert({
          title: "Woops!",
          text: "Only numbers are allowed",
        });
        return;
      case transactionAmount === "0" || transactionAmount === 0:
        setAlert({
          title: "Oh no!",
          text: "You have to send some ether to the contract",
        });
        return;
      case parseInt(transactionAmount) > 5 || parseInt(transactionAmount) < 0:
        setAlert({
          title: "Dang!",
          text: "You have to send more funds, but no more than 5 ether",
        });
        return;
      default:
        console.log("Your transaction is being submitted...");
    }

    let tx, receipt, sumEvent;
    const config = { value: parseEther(transactionAmount) };

    e.currentTarget.id === "Fund Contract"
      ? (tx = await contract.fundContract(config))
      : (tx = await contract.bet(config));

    receipt = await tx.wait(1);
    sumEvent = receipt.events.pop();

    setAlert({
      title: "Good News!",
      text: `Your transaction of ${parseFloat(
        transactionAmount
      )} ether has been accepted.`,
    });
    setTransactionAmount("0");

    sumEvent.event === "BetPlaced" &&
      setTransactionResults({
        won: sumEvent.args.betWon,
        amount: sumEvent.args.betWon
          ? transactionAmount * 2
          : transactionAmount,
      });

    setContractBalance(parseInt(transactionAmount));
  };

  const withdraw = async () => {
    switch (true) {
      case contractBalance === 0:
        setAlert({
          title: "Oh no!",
          text: "The contract doesn't have any funds at the moment",
        });
        return;
      case userBalance === 0:
        setAlert({
          title: "Woops!",
          text: "You have to have funds in order to withdraw",
        });
        return;
      default:
        console.log("Initiating Transaction...");
    }

    let tx = isOwner
      ? await contract.withdrawContract()
      : await contract.withdraw();
    let receipt = await tx.wait(1);

    console.log(receipt);
    setAlert({
      title: "Congratulations!",
      text: "The funds have made it to your account",
    });
    isOwner ? setContractBalance(0) : setUserBalance(0);
  };

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
            <h5 className="muted-h5">{truncateString(userAddress, 32)}</h5>
          </Col>
          <Col>
            <Button
              id={transactionButtonText}
              className={`primary-btn w-50 font-weight-bold ml-5`}
              onClick={isConnected ? sendTransaction : setShowModal}
            >
              {transactionButtonText}
            </Button>
            <Button
              variant="transparent"
              disabled={!isConnected}
              onClick={() => {
                transactionButtonText === "Fund Contract"
                  ? setTransactionButtonText("Place Bet")
                  : setTransactionButtonText("Fund Contract");
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
              {transactionResults?.won !== undefined
                ? String(transactionResults?.won)
                : "Place a bet to see the results"}
            </h5>
          </Col>
          <Col xs={10} className="mx-auto text-center">
            <FontAwesomeIcon className="text-muted" icon={faArrowDown} />
          </Col>
          <Col xs={10} className="border my-4 mx-auto text-left pt-2 rounder">
            <p className="mb-0">How much did I Win/Lose</p>
            <h5 className="muted-h5">
              {transactionResults?.amount !== undefined
                ? transactionResults?.amount + " ether"
                : "Place a bet to see the results"}
            </h5>
          </Col>
        </Row>
      )}

      {/* Rules Tab */}
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
              Welcome back, {isOwner ? "admin" : "user"}. <br />
              Ready to withdraw your funds?
            </h5>
          </Col>
          <Col className="text-center">
            <h2>
              <input
                id="withdraw"
                value={isOwner ? contractBalance : userBalance}
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
              onClick={isConnected ? withdraw : setShowModal}
            >
              {isConnected ? "Withdraw Funds" : "Connect to a Wallet"}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TabBody;
