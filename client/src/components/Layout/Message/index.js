import React from "react";
import { string, bool, func } from "prop-types";
import { XSquare } from "react-feather";

import "./index.css";

const propTypes = {
  statusMessage: string.isRequired,
  statusIsDisplayed: bool.isRequired,
  removeStatusMessage: func,
};

const defaultProps = {
  statusMessage: "",
  statusIsDisplayed: false,
  removeStatusMessage: () => {},
};

let statusMessageBgColor;

const Message = ({ statusMessage, statusIsDisplayed, removeStatusMessage }) => {
  // handle status message background color
  statusMessage.match(/^[Sorry]/)
    ? (statusMessageBgColor = "#f7608b")
    : (statusMessageBgColor = "#52f292");

  return (
    <div
      className={`
        StatusMessage
        ${statusIsDisplayed ? "fade-in" : "fade-out"}
      `}
      style={{ backgroundColor: statusMessageBgColor }}
    >
      <XSquare
        className="btn remove-status-message-btn"
        size={28}
        onClick={removeStatusMessage}
      />

      <div className="row flex justify-content-center">
        <div className="col flex text-center">
          <h1 className="StatusMessage-text">{statusMessage}</h1>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
export default Message;
