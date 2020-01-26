import React from "react";
import { XSquare } from 'react-feather';


import './Message.css';

function Message({statusMessage, statusIsDisplayed, removeStatusMessage}) {
  let statusColor = null;

  if (
    statusMessage === "Sorry, you can't send zero ether to the contract!" ||
    statusMessage === "Sorry, there are no funds to withdraw."
  ) {
    statusColor = "#f7608b";
  } else statusColor = "#52f292"

  return (
    <section
      className={`StatusMessage ${(statusIsDisplayed) ? "fade-in" : "fade-out"}`}
      style={{backgroundColor: statusColor}}
    >
      <XSquare size={28} className="btn remove-status-message-btn" onClick={removeStatusMessage}/>

      <div className="row flex justify-content-center">
        <div className="col flex text-center">
          <h1 className="StatusMessage-text">{statusMessage}</h1>
        </div>
      </div>
    </section>
  )
}

export default Message;
