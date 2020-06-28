import React from "react";
import { string, object, func, bool } from "prop-types";

import NavMenu from "./NavMenu";
import Main from "./Main";
import Message from "./Message";
import Footer from "./Footer";

import GithubIcon from "../../assets/img/github.svg";

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

const Layout = ({
  user,
  game,
  message,
  setMessage,
  showMessage,
  setShowMessage,
}) => (
  <>
    <Message
      message={message}
      setMessage={setMessage}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
    />

    <NavMenu user={user} game={game} githubIcon={GithubIcon} />

    <Main
      user={user}
      game={game}
      message={message}
      setMessage={setMessage}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
    />

    <Footer />
  </>
);

Layout.defaultProps = propTypes;
Layout.defaultProps = defaultProps;
export default Layout;
