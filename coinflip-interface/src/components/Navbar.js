import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { string, oneOfType, array, object } from 'prop-types';
import { colors } from '../utils';
import { useTheme } from '../hooks';

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledNavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none !important;
`;

const StyledNavbar = styled.header`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0.5rem 1rem;

  ${StyledNavbarBrand} {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$black : colors.$white};
  }
`;

// Nav
export const Nav = ({ id, className, children, ...props }) => (
  <StyledNav id={id} className={className}>
    {children}
  </StyledNav>
);
Nav.propTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};

// NavbarBrand
export const NavbarBrand = ({
  id,
  to,
  title,
  className,
  children,
  ...props
}) => (
  <StyledNavbarBrand
    id={id}
    to={to}
    title={title}
    className={className}
    {...props}
  >
    {children}
  </StyledNavbarBrand>
);
NavbarBrand.propTypes = {
  id: string.isRequired,
  to: string.isRequired,
  title: string.isRequired,
  className: string,
  children: oneOfType([array, object, string]),
};

// Navbar
export const Navbar = ({ id, className, children, ...props }) => {
  const { theme } = useTheme();

  return (
    <StyledNavbar id={id} className={className} theme={theme} {...props}>
      {children}
    </StyledNavbar>
  );
};
Navbar.propTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};
