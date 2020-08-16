import React from "react";
import { Button } from "react-bootstrap";

import { useApplication } from "../../../../../../context/ApplicationContext";

const Tab = ({ tab }) => {
  const { currentTab, setCurrentTab } = useApplication();

  return (
    <Button
      key={tab.id}
      className={`tab-button py-1 px-0 ${currentTab === tab.name && "active"} `}
      onClick={() => setCurrentTab(tab.name)}
    >
      <h5 className="mb-0 mt-2">{tab.name}</h5>
    </Button>
  );
};

export default Tab;
