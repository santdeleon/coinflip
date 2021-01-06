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
          href="https://github.com/santdeleon/coinflip/commit/7c56a67e042ad3c2696dfe76ba6d9b65e33957eb"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          title="Github"
          className="mb-1 text-dark text-decoration-none"
        >
          <small className="font-weight-light text-secondary">7c56a67</small>
        </a>
      </Nav>
    </Navbar>
  </StyledFooter>
);

export default Footer;
