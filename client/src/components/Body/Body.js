import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Delete } from 'react-feather';


import './Body.css';

function Body({selectFundAmount, isActive, refreshFundAmount, fundAmount, fundContract, withdrawOneEther, withdrawAllEther, isOwner, isUser}) {

  return (
    <section>
      <div className="withdraw-wrapper row flex">
        <div className="col flex flex-column align-items-center">
          <p className="lead text-muted">Hello <span className="ownerUser">{isOwner ? "owner" : "user"}</span>{isOwner ? ", ready to withdraw your funds?" : ", ready to play CoinFlip?"}</p>
          <div className="withdraw-buttons flex" style={isOwner ? {display: "flex"} : {display: "none"}}>
            <div className="withdraw-btn-wrapper flex flex-column">
              <button id="withdrawBtn" className="btn withdraw-btn" onClick={withdrawOneEther}>Withdraw a little</button>
            </div>
            <div className="withdraw-btn-wrapper flex flex-column">
              <button id="withdrawAllBtn" className="btn withdraw-all-btn" onClick={withdrawAllEther}>Withdraw a lot</button>
            </div>
          </div>
        </div>
      </div>

      <div className="Body row flex justify-content-between">
        <div className="col flex flex-column text-left Body-text">
          <p className="yeah text-muted">-- yeah.</p>
          <h1 className="Body-title">We all need more <span className="btc-color">Bitcoin</span>.</h1>
          <p className="lead text-muted">but who wants to dollar cost average.</p>

          <p className="intro">
            Well don't worry, here at Coinflip.io we got you covered. Just toss some coin to
            your witcher and watch your money double.
          </p>

          <div className="fund-contract-btn-wrapper flex">
            <button id="fundContractBtn" className="btn fund-contract-btn" onClick={fundContract}>Fund me</button>
          </div>

          <div className="funding-amount-wrapper flex row align-items-center">
            <div id="1" className={`funding-amount flex col align-items-center justify-content-center ${(fundAmount === "1") ? "active" : ""}`} onClick={selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>1</p>
            </div>
            <div id="2" className={`funding-amount flex col align-items-center justify-content-center ${(fundAmount === "2") ? "active" : ""}`} onClick={selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>2</p>
            </div>
            <div id="5" className={`funding-amount flex col align-items-center justify-content-center ${(fundAmount === "5") ? "active" : ""}`} onClick={selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>5</p>
            </div>
          </div>

          <div className="flex flex-column show-funding-amount" style={fundAmount === "" ? {display: "none"} : null}>
            <h4 style={{fontWeight: "lighter", padding: "0"}}>You'd like to fund:</h4>
            <div className="flex funding-display-wrapper">
              <input id="fundingAmount" type="text" className="contract-balance" value={`${fundAmount} ether`} readOnly/>
              <button id="resetFundingBtn" className="btn flex align-items-center justify-content-center" onClick={refreshFundAmount}><Delete size={22} className="delete"/></button>
            </div>
          </div>
        </div>

        <div className="Game flex col flex-column">
            <code className="game-screen flex flex-column">

              <h1 style={{ fontWeight: "lighter"}}>Let's Play</h1>

              <div className="flex justify-content-between">
                <div className="flex flex-column text-left rules" style={{paddingLeft: "15px"}}>
                  <h3 className="rules-title" style={{ fontWeight: "lighter"}}>Rules:</h3>
                  <ul className="rules-menu" style={{fontSize: "12px"}}>
                    <li className="rule">- You must use your own address</li>
                    <li className="rule">- If you win you get double your bet</li>
                    <li className="rule">- Bet's must be more than 0.01 ether</li>
                    <li className="rule">- You must send the amount you specify</li>
                  </ul>
                </div>

                <div className="flex flex-column text-left results" style={{paddingRight: "15px"}}>
                  <h3 className="results-title text-center" style={{ fontWeight: "lighter"}}>Results:</h3>
                  <ul className="rules-menu" style={{fontSize: "12px"}}>
                    <li className="result">You must use your own address</li>
                    <li className="result">If you win you get double your bet</li>
                    <li className="result">Bet's must be more than 0.01 ether</li>
                    <li className="result">You must send the amount you specify</li>
                  </ul>
                </div>
              </div>

            </code>
            <div className="flex game-functions justify-content-center align-items-center">
              <input type="text" className="select-bet" placeholder="How much ether?"/>
              <button id="betBtn" type="button" className="btn bet-btn">Place Bet</button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Body;
