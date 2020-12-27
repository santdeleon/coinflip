import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './index.css';

import Tabs from './Tabs';

const Interface = () => {
  return (
    <Container id="Interface" className="Interface py-5">
      <Row className="justify-content-center px-3 my-5">
        <Col md={10} lg={6} className="interface-container bg-white pb-4 px-0">
          <div className="rainbow-rounded-top px-5 py-2" />
          <Tabs />
        </Col>
      </Row>
    </Container>
  );
};

export default Interface;
