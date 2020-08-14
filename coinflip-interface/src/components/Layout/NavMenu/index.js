import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

import Github from "../../../assets/img/github.svg";

import { useContract } from "../../../context/ContractContext.js";
import { useApplication } from "../../../context/ApplicationContext";

const NavMenu = () => {
  const { contractBalance, userIsConnected } = useContract();
  const { setShowModal } = useApplication();

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
          className={`connected-network-logo ml-2 d-flex font-weight-bold align-items-center ${
            userIsConnected ? "green" : "red"
          }`}
        >
          <FontAwesomeIcon icon={faWifi} className="mr-1"></FontAwesomeIcon>
          {/* TODO: Get Network Name */}
        </p>
      </Navbar.Brand>
      <Nav className="ml-auto align-items-center">
        {userIsConnected ? (
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-2 d-none d-md-flex">Contract balance:</p>
            <input
              id="contractBalance"
              name="contractBalance"
              className="contract-balance"
              value={`${contractBalance} ether`}
              readOnly
            />
          </div>
        ) : (
          <Button
            variant="link"
            className="connect-to-wallet-btn text-decoration-none font-weight-bold red"
            onClick={() => setShowModal(true)}
          >
            Connect to a Wallet
          </Button>
        )}
        <a
          href="https://github.com/santdeleon/coinflip"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          title="Github"
        >
          <img src={Github} alt="Github" className="ml-3" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
