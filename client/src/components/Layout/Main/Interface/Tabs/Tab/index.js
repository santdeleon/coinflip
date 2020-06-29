import React from "react";
import { object, string, func } from "prop-types";
import { Button } from "react-bootstrap";

const propTypes = {
  tab: object.isRequired,
  currentTab: string.isRequired,
  setCurrentTab: func.isRequired,
};

const defaultProps = {
  tab: {},
  currentTab: "",
  setCurrentTab: () => {},
};

const Tab = ({ tab, currentTab, setCurrentTab }) => {
  return (
    <Button
      key={tab.id}
      className={`tab-button py-1 ${currentTab === tab.name && "active"} `}
      onClick={() => setCurrentTab(tab.name)}
    >
      <h5 className="mb-0 mt-2">{tab.name}</h5>
    </Button>
  );
};

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
export default Tab;
