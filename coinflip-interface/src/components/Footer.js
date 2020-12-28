import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { truncateString } from '../utils/truncateString.js';

const Footer = () => (
  <Navbar as="footer" fixed="bottom">
    <Nav className="ml-auto align-items-center px-2">
      <FontAwesomeIcon
        icon={faCircle}
        style={{ fontSize: '10px' }}
        className="text-success mr-2"
      />
      <a
        aria-label="Github"
        title="Github"
        href="https://github.com/santdeleon/coinflip/commit/861d46453cae8356fd4895e9ccadbed7055b6621"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-1 text-dark text-decoration-none"
      >
        <small className="font-weight-bold">
          {truncateString('861d46453cae8356fd4895e9ccadbed7055b6621', 15)}
        </small>
      </a>
    </Nav>
  </Navbar>
);

export default Footer;
