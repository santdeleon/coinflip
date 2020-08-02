import React from "react";
import { func, bool } from "prop-types";

import Layout from "../Layout";

const propTypes = {
  fetchData: func.isRequired,
  isLoading: bool.isRequired,
  isDisconnected: bool.isRequired,
};

const AppDisconnected = ({ fetchData, isLoading, isDisconnected }) => {
  return (
    <>
      <Layout
        user={{
          selectedAddress: "",
          isOwner: false,
          userBalance: "",
        }}
        game={{
          contract: "",
          contractAddress: "",
          contractBalance: "",
          owner: "",
          tabs: [
            { id: 0, name: "Play" },
            { id: 1, name: "Results" },
            { id: 2, name: "Rules" },
            { id: 3, name: "Withdraw" },
          ],
        }}
        message={""}
        setMessage={() => {}}
        showMessage={false}
        setShowMessage={() => {}}
        showConnectBtn={true}
        fetchData={fetchData}
        isLoading={isLoading}
        isDisconnected={isDisconnected}
      />
    </>
  );
};

AppDisconnected.propTypes = propTypes;
export default AppDisconnected;
