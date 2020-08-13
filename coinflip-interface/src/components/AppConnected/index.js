import React from "react";
import { object, string, func, bool } from "prop-types";

import Layout from "../Layout";

const propTypes = {
  data: object.isRequired,
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
  isDisconnected: bool.isRequired,
  setIsDisconnected: func.isRequired,
};

const defaultProps = {
  data: {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
  isDisconnected: true,
  setIsDisconnected: () => {},
};

const AppConnected = ({
  data,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  isDisconnected,
  setIsDisconnected,
}) => (
  <>
    <Layout
      user={data.user}
      game={data.game}
      message={message}
      setMessage={setMessage}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
      isDisconnected={isDisconnected}
      setIsDisconnected={setIsDisconnected}
    />
  </>
);

AppConnected.propTypes = propTypes;
AppConnected.defaultProps = defaultProps;
export default AppConnected;
