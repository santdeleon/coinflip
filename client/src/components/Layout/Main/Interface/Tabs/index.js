import React from "react";
import { object, string, bool, func } from "prop-types";
import { Row, Col } from "react-bootstrap";

import Tab from "./Tab";
import TabBody from "./TabBody";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
  currentTab: string.isRequired,
  setCurrentTab: func.isRequired,
  transactionAmount: string.isRequired,
  setTransactionAmount: func.isRequired,
  transactionButton: string.isRequired,
  setTransactionButton: func.isRequired,
  sendTransaction: func.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
  currentTab: "",
  setCurrentTab: () => {},
  transactionAmount: "",
  setTransactionAmount: () => {},
  transactionButton: "",
  setTransactionButton: () => {},
  sendTransaction: () => {},
};

const Tabs = ({
  user,
  game,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  currentTab,
  setCurrentTab,
  transactionAmount,
  setTransactionAmount,
  transactionButton,
  setTransactionButton,
  sendTransaction,
}) => {
  return (
    <>
      <Row className="mt-3 mb-3 justify-content-center">
        {game.tabs.map((tab) => {
          if (tab.name === "Withdraw" && !user.isOwner) {
            return null;
          } else if (tab.name === "Rules" && user.isOwner) {
            return null;
          } else {
            return (
              <Col xs={3}>
                <Tab
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tab={tab}
                />
              </Col>
            );
          }
        })}
      </Row>
      <TabBody
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
    </>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
export default Tabs;
