import React from "react";
import Gif from "../../assets/gif/eth-loader.gif";

import "./Loader.css";

const Loader = () => (
  <div className="Loader">
    <div className="row flex">
      <div className="col flex flex-column align-items-center justify-content-center mx-auto">
        <img src={Gif} className="mx-auto" alt="Ethereum Loader" />
      </div>
    </div>
  </div>
);

export default Loader;
