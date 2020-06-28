import React from "react";
import { Row, Col } from "react-bootstrap";
import { string, bool, func } from "prop-types";
import { XSquare } from "react-feather";

import "./index.css";

const propTypes = {
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
};

const defaultProps = {
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
};

const Message = ({ message, setMessage, showMessage, setShowMessage }) => {
  const messageBgColor = message.match(/^[Sorry]/)
    ? { backgroundColor: "#f7608b" }
    : { backgroundColor: "#52f292" };

  return (
    <div
      className={` message ${showMessage ? "fade-in" : "fade-out"} py-3`}
      style={messageBgColor}
    >
      <Row className="align-items-center py-2">
        <Col xs={2}></Col>
        <Col xs={8}>
          <h5 className="m-0">{message}</h5>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          <XSquare
            role="button"
            className="text-right remove-status-message-btn mr-5"
            onClick={() => setShowMessage(false)}
            size={28}
            style={{ minWidth: "28px" }}
          />
        </Col>
      </Row>
    </div>
  );
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
export default Message;
