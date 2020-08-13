import React, { useState } from "react";
import { string, object, func, bool } from "prop-types";

import NavMenu from "./NavMenu";
import Main from "./Main";
import Message from "./Message";
import ConnectWalletModal from "./ConnectWalletModal";
import Footer from "./Footer";

import GithubIcon from "../../assets/img/github.svg";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  message: string.isRequired,
  setMessage: func.isRequired,
  showMessage: bool.isRequired,
  setShowMessage: func.isRequired,
  showConnectBtn: bool.isRequired,
  fetchData: func.isRequired,
  isLoading: bool.isRequired,
  isDisconnected: bool.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
  showConnectBtn: false,
  fetchData: () => {},
  isLoading: false,
  isDisconnected: true,
};

const Layout = ({
  user,
  game,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  showConnectBtn,
  fetchData,
  isLoading,
  isDisconnected,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Message
        message={message}
        setMessage={setMessage}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />

      <NavMenu
        user={user}
        game={game}
        githubIcon={GithubIcon}
        showConnectBtn={showConnectBtn}
        fetchData={fetchData}
        isLoading={isLoading}
        isDisconnected={isDisconnected}
        setShowModal={setShowModal}
      />

      <Main
        user={user}
        game={game}
        message={message}
        setMessage={setMessage}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        isDisconnected={isDisconnected}
        setShowModal={setShowModal}
      />

      <ConnectWalletModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
        isLoading={isLoading}
      />

      <Footer />
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
export default Layout;
