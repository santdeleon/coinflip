import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import './Body.css';

function Footer() {
  return (
    <section className="Body">
      <div className="row flex justify-content-between">
        <div className="col flex flex-column text-left Body-text">
          <p className="yeah text-muted">-- yeah.</p>
          <h1 className="Body-title">We all need more <span className="btc-color">Bitcoin</span>.</h1>
          <p className="lead text-muted">and who wants to dollar cost average.</p>

          <p className="intro">
            Well don't worry, here at Coinflip.io we got you covered. Just toss some coin at
            your witcher and watch your money double.
          </p>

          <button id="fundContractBtn" className="btn fund-contract-btn">Fund me!</button>

          <div className="funding-amount-wrapper flex row align-items-center">
            <div id="1" className="funding-amount flex col align-items-center justify-content-center">
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>1</p>
            </div>
            <div id="2" className="funding-amount flex col align-items-center justify-content-center">
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>2</p>
            </div>
            <div id="5" className="funding-amount flex col align-items-center justify-content-center">
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
