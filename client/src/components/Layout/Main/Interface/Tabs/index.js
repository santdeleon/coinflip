import React from "react";
import { object, string, func } from "prop-types";
import { Row, Col } from "react-bootstrap";

import Tab from "./Tab";
import TabBody from "./TabBody";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  currentTab: string.isRequired,
  setCurrentTab: func.isRequired,
  transactionAmount: string.isRequired,
  setTransactionAmount: func.isRequired,
  transactionButton: string.isRequired,
  setTransactionButton: func.isRequired,
  sendTransaction: func.isRequired,
  withdraw: func.isRequired,
  transactionResults: object.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  currentTab: "",
  setCurrentTab: () => {},
  transactionAmount: "",
  setTransactionAmount: () => {},
  transactionButton: "",
  setTransactionButton: () => {},
  sendTransaction: () => {},
  withdraw: () => {},
  transactionResults: {},
};

const Tabs = ({
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
}) => {
  return (
    <>
      <Row className="mt-3 mb-3 justify-content-center">
        {game.tabs.map((tab) => (
          <Col xs={2} key={tab.id}>
            <Tab
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tab={tab}
            />
          </Col>
        ))}
      </Row>
      <TabBody
        user={user}
        game={game}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        transactionAmount={transactionAmount}
        setTransactionAmount={setTransactionAmount}
        transactionButton={transactionButton}
        setTransactionButton={setTransactionButton}
        sendTransaction={sendTransaction}
        withdraw={withdraw}
        transactionResults={transactionResults}
      />
    </>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
export default Tabs;
