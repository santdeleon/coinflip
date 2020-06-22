import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Footer = () => (
  <Navbar fixed="bottom">
    <Nav className="mx-auto text-center">
      <p className="font-weight-bold" style={{ fontSize: "14px" }}>
        © Sant Deleon, 2020
      </p>
    </Nav>
  </Navbar>
);

export default Footer;
