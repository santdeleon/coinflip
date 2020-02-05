import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Delete } from 'react-feather';


import './Body.css';

function Body(props) {

  return (
    <section>
      <div className="withdraw-wrapper row flex">
        <div className="col flex flex-column align-items-center">
          <p className="lead text-muted">Hello <span className="ownerUser">{props.isOwner ? "owner" : "user"}</span>{props.isOwner ? ", ready to withdraw your funds?" : ", ready to play CoinFlip?"}</p>
          <div className="withdraw-buttons flex">
            <div className="withdraw-btn-wrapper flex flex-column">
              <button id="withdrawBalanceBtn" className="btn withdraw-balance-btn" onClick={props.withdrawContractBalance}>Withdraw Balance</button>
            </div>

            <div className="withdraw-btn-wrapper flex flex-column" style={props.isOwner ? {display: "flex"} : {display: "none"}}>
                <button id="withdrawContractBtn" className="btn withdraw-contract-btn" onClick={props.withdrawContractBalance}>Withdraw Contract</button>
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
            <button id="fundContractBtn" className="btn fund-contract-btn" onClick={props.fundContract}>Fund me</button>
          </div>

          <div className="funding-amount-wrapper flex row align-items-center">
            <div id="1" className={`funding-amount flex col align-items-center justify-content-center ${(props.fundAmount === "1") ? "active" : ""}`} onClick={props.selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>1</p>
            </div>
            <div id="2" className={`funding-amount flex col align-items-center justify-content-center ${(props.fundAmount === "2") ? "active" : ""}`} onClick={props.selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>2</p>
            </div>
            <div id="5" className={`funding-amount flex col align-items-center justify-content-center ${(props.fundAmount === "5") ? "active" : ""}`} onClick={props.selectFundAmount}>
              <FontAwesomeIcon className="crypto-logo" icon={faEthereum}/>
              <p>5</p>
            </div>
          </div>

          <div className="flex flex-column show-funding-amount" style={props.fundAmount === "" ? {display: "none"} : null}>
            <h4 style={{fontWeight: "lighter", padding: "0"}}>You'd like to fund:</h4>
            <div className="flex funding-display-wrapper">
              <input id="fundingAmount" type="text" className="contract-balance" value={`${props.fundAmount} ether`} readOnly/>
              <button id="resetFundingBtn" className="btn flex align-items-center justify-content-center" onClick={props.refreshFundAmount}><Delete size={22} className="delete"/></button>
            </div>
          </div>
        </div>

        <div className="Game flex col flex-column">
            <div className="player-balance-wrapper flex" style={{marginTop: "2rem"}}>
              <span style={{cursor: "inherit", color: "black", marginRight: "5px"}}>Your balance: </span>
              <input id="playerBalance" type="text" className="contract-balance" value={`${props.playerBalance} ether`} readOnly/>
            </div>

            <code className="game-screen flex flex-column">

              <h1 style={{ fontWeight: "lighter"}}>Let's Play</h1>

              <div className="flex justify-content-between">
                <div className="flex flex-column text-left rules" style={{paddingLeft: "15px"}}>
                  <h3 className="rules-title" style={{ fontWeight: "lighter"}}>Rules:</h3>
                  <ul className="rules-menu" style={{fontSize: "12px"}}>
                    <li className="rule">- If you win you get double your bet</li>
                    <li className="rule">- You must send the amount you specify</li>
                    <li className="rule">- You can't wager more ether than the contract balance has</li>
                    <li className="rule">- Bets must be more than 0.01 ether but no more than 5 ether</li>
                    <li className="rule">- Good Luck. Have Fun!</li>
                  </ul>
                </div>

                <div className="flex flex-column text-left results" style={{paddingRight: "15px"}}>
                  <h3 className="results-title text-center" style={{ fontWeight: "lighter"}}>Results:</h3>
                  <ul className="rules-menu" style={{fontSize: "12px"}}>
                    <li className="result">{`Bet won: ${props.betWon}`}</li>
                    <li className="result">{`How much was bet: ${props.howMuchWasBet} ether`}</li>
                    <li className="result">{`Balance before bet: ${props.userBalanceBeforeBet}`}</li>
                    <li className="result">{`Balance after bet: ${props.newBalance}`}</li>
                    <li className="result">{`Address Used: ${props.playersAddress}`}</li>
                  </ul>
                </div>
              </div>

            </code>
            <div className="flex game-functions justify-content-center align-items-center">
              <input type="text" className="select-bet" placeholder="How much ether?" onChange={props.handleBet}/>
              <button id="betBtn" type="button" className="btn bet-btn" onClick={props.placeBet}>Place Bet</button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Body;
