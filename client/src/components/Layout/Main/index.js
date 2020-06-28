import React from "react";
import { object, string, bool, func } from "prop-types";

import Interface from "./Interface";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
};

const Main = ({
  user,
  game,
  message,
  setMessage,
  showMessage,
  setShowMessage,
}) => (
  <>
    <Interface
      user={user}
      game={game}
      message={message}
      setMessage={setMessage}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
    />
  </>
);

Main.defaultProps = propTypes;
Main.defaultProps = defaultProps;
export default Main;
