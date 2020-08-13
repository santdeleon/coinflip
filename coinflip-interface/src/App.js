import React from "react";
import { Web3Provider } from "@ethersproject/providers";
// import { useWeb3React } from "@web3-react/core";

import "./App.css";
import "./stylesheets/colors.css";
import "./stylesheets/button.css";

import { CoinFlipABI } from "./abis/coinflip";
import { useContract } from "./hooks/useContract";

// import AppConnected from "./components/AppConnected";
// import AppDisconnected from "./components/AppDisconnected";

const App = () => {
  // console.log(useWeb3React());
  console.log(
    useContract(
      "0x62414f33705F90A4152D2b53C6145999FAA891fc",
      CoinFlipABI,
      new Web3Provider(window.ethereum)
    )
  );

  return (
    <div id="App" className="App">
      <div className="rainbow-top" />
      {/* {data ? (
          <AppConnected
            data={data}
            message={message}
            setMessage={setMessage}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            isDisconnected={isDisconnected}
            setIsDisconnected={setIsDisconnected}
          />
        ) : (
          <AppDisconnected
            fetchData={fetchData}
            isLoading={isLoading}
            isDisconnected={isDisconnected}
          />
        )} */}
    </div>
  );
};

export default App;
