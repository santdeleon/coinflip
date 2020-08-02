import React, { useState } from "react";
import { string, object, bool, func } from "prop-types";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

import ConnectWalletModal from "./ConnectWalletModal";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  githubIcon: string.isRequired,
  showConnectBtn: bool.isRequired,
  fetchData: func.isRequired,
  isLoading: bool.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  githubIcon: "",
  showConnectBtn: false,
  fetchData: () => {},
  isLoading: false,
};

const NavMenu = ({
  user,
  game,
  githubIcon,
  showConnectBtn,
  fetchData,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar id="NavMenu" className="NavMenu align-items-center pb-0">
      <Navbar.Brand
        href="/"
        className="font-weight-bold d-flex align-items-center"
      >
        <span role="img" className="mr-2" aria-label="Rainbow Emoji">
          🌈
        </span>
        Coinflip
        <p
          className="ml-2 d-flex font-weight-bold align-items-center"
          style={{
            color: showConnectBtn ? "#ff007a" : "#62e07b",
            fontSize: "11px",
          }}
        >
          <FontAwesomeIcon icon={faWifi} className="mr-1"></FontAwesomeIcon>
          {game.networkName}
        </p>
      </Navbar.Brand>

      <Nav className="ml-auto align-items-center">
        {showConnectBtn ? (
          <Button
            variant="link"
            className="text-decoration-none font-weight-bold"
            style={{ color: "#ff007a", fontSize: "14px" }}
            onClick={() => setShowModal(true)}
          >
            Connect to a Wallet
          </Button>
        ) : (
          <span className="d-flex align-items-center">
            <p className="mb-0 mr-2 d-none d-md-flex">Contract balance:</p>
            <input
              id="contractBalance"
              name="contractBalance"
              className="contract-balance"
              value={`${game.contractBalance} ether`}
              readOnly
            />
          </span>
        )}
        <a
          href="https://github.com/santdeleon/coinflip"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          title="Github"
        >
          <img src={githubIcon} alt="Github" className="ml-3" />
        </a>
      </Nav>

      <ConnectWalletModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
        isLoading={isLoading}
      />
    </Navbar>
  );
};

NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;
export default NavMenu;
