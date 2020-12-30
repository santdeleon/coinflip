import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Header = () => (
  <Row className="bg-light">
    <Col>
      <small>
        This app is currently undergoing remodel, expect some buggy
        functionality.
      </small>
    </Col>
  </Row>
);

export default Header;
