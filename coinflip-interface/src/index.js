import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

const getLibrary = (provider) => new Web3Provider(provider);

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
