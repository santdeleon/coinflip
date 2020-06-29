import React from "react";
import { string, object } from "prop-types";
import { Navbar, Nav } from "react-bootstrap";

import "./index.css";

const propTypes = {
  user: object.isRequired,
  game: object.isRequired,
  githubIcon: string.isRequired,
};

const defaultProps = {
  user: {},
  game: {},
  githubIcon: "",
};

const NavMenu = ({ user, game, githubIcon }) => (
  <Navbar id="NavMenu" className="NavMenu align-items-center pb-0">
    <Navbar.Brand href="/" className="font-weight-bold">
      <span role="img" className="mr-2" aria-label="Rainbow Emoji">
        🌈
      </span>
      Coinflip.io
    </Navbar.Brand>

    <Nav className="ml-auto align-items-center">
      <p className="mb-0 mr-4 d-none d-md-flex">Contract balance:</p>
      <input
        id="contractBalance"
        name="contractBalance"
        className="contract-balance"
        value={`${game.contractBalance} ether`}
        readOnly
      />
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
  </Navbar>
);

NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;
export default NavMenu;
