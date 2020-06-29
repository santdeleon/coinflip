import React from "react";
import { object, string, func } from "prop-types";
import { Button } from "react-bootstrap";

const propTypes = {
  currentTab: string.isRequired,
  setCurrentTab: func.isRequired,
  tab: object.isRequired,
};

const defaultProps = {
  currentTab: "",
  setCurrentTab: () => {},
  tab: {},
};

const Tab = ({ currentTab, setCurrentTab, tab }) => {
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
