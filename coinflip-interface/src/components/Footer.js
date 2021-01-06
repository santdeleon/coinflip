import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { Navbar, Nav } from '.';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Footer = () => (
  <StyledFooter>
    <Navbar>
      <Nav className="ml-auto align-items-center px-2">
        <FontAwesomeIcon
          icon={faCircle}
          style={{ fontSize: '10px' }}
          className="text-success mr-1"
        />
        <a
          href="https://github.com/santdeleon/coinflip/commit/eef18ba840e1a7546233d0ef1e4590fa8a2e0132"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          title="Github"
          className="mb-1 text-dark text-decoration-none"
        >
          <small className="font-weight-light text-secondary">eef18ba</small>
        </a>
      </Nav>
    </Navbar>
  </StyledFooter>
);

export default Footer;
