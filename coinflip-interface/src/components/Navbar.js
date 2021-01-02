import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { string, oneOfType, array, object } from 'prop-types';
import { colors } from '../utils';

// Start Navbar
const StyledNavbar = styled.header`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
`;

const navbarPropTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};

export const Navbar = ({ id, className, children, ...props }) => (
  <StyledNavbar id={id} className={className} {...props}>
    {children}
  </StyledNavbar>
);

Navbar.propTypes = navbarPropTypes;
// End Navbar

// Start NavbarBrand
const StyledNavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none !important;
  color: ${({ theme }) => (theme === 'light' ? colors.$black : colors.$white)};
`;

const navbarBrandPropTypes = {
  id: string.isRequired,
  to: string.isRequired,
  className: string,
  children: oneOfType([array, object, string]),
};

export const NavbarBrand = ({ id, to, className, children, ...props }) => (
  <StyledNavbarBrand id={id} to={to} className={className} {...props}>
    {children}
  </StyledNavbarBrand>
);

NavbarBrand.propTypes = navbarBrandPropTypes;
// End NavbarBrand

// Start Nav
const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const navPropTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};

export const Nav = ({ id, className, children, ...props }) => (
  <StyledNav id={id} className={className} {...props}>
    {children}
  </StyledNav>
);

Nav.propTypes = navPropTypes;
// End Nav
