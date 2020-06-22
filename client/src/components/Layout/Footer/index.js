import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { string, object, func, array, bool } from "prop-types";

// const propTypes = {};

// const defaultProps = {};

const Footer = () => (
  <Navbar fixed="bottom">
    <Nav className="mx-auto text-center">
      <p className="font-weight-bold" style={{ fontSize: "14px" }}>
        © Sant Deleon, 2020
      </p>
    </Nav>
  </Navbar>
);

// Footer.defaultProps = propTypes;
// Footer.defaultProps = defaultProps;
export default Footer;
