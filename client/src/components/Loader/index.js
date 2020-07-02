import React from "react";
import { Row, Col } from "react-bootstrap";

import Gif from "../../assets/gif/eth-loader.gif";

import "./index.css";

const Loader = () => (
  <div className="Loader" data-testid="Loader">
    <Row className="justify-content-center">
      <Col className="mx-auto w-50 text-center">
        <img src={Gif} className="mx-auto" alt="Ethereum Loader" />
      </Col>
    </Row>
  </div>
);

export default Loader;
