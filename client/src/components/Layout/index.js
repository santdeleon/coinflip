import React from "react";
import { string, object, func, array, bool } from "prop-types";

import NavMenu from "./NavMenu";
import Main from "./Main";
import Message from "./Message";

import GithubIcon from "../../assets/img/github.svg";

const propTypes = {
  statusMessage: string.isRequired,
  removeStatusMessage: func.isRequired,
  statusIsDisplayed: bool.isRequired,
  contractBalance: string.isRequired,
  isOwner: bool.isRequired,
  isUser: bool.isRequired,
};

const defaultProps = {
  statusMessage: "",
  removeStatusMessage: () => {},
  statusIsDisplayed: false,
  contractBalance: "string.isRequired",
  isOwner: false,
  isUser: false,
};

const Layout = ({
  statusMessage,
  removeStatusMessage,
  statusIsDisplayed,
  contractBalance,
  isOwner,
  isUser,
}) => (
  <>
    <Message
      statusMessage={statusMessage}
      removeStatusMessage={removeStatusMessage}
    />

    <NavMenu
      contractBalance={contractBalance}
      isOwner={isOwner}
      isUser={isUser}
      githubIcon={GithubIcon}
    />
  </>
);

Layout.defaultProps = propTypes;
Layout.defaultProps = defaultProps;
export default Layout;
