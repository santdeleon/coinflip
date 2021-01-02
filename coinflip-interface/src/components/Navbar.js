import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import styled from 'styled-components';
import { string, oneOfType, array, object } from 'prop-types';
import { truncateString, colors } from '../utils';
import { useLayout, useTheme } from '../hooks';
import { Emoji, ToggleSwitch, Button, OverlayTrigger, Tooltip } from '.';

// Navbar
const StyledNavbar = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 1rem;
`;

const navbarPropTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};

export const Navbar = ({ id, className, children }) => (
  <StyledNavbar id={id} className={className}>
    {children}
  </StyledNavbar>
);

Navbar.propTypes = navbarPropTypes;
// End Navbar

// NavbarBrand
const StyledNavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none !important;
  color: ${({ theme }) => (theme === 'light' ? colors.$gray70 : colors.$white)};
  &:hover {
    color: ${({ theme }) =>
      theme === 'light' ? colors.$black : colors.$gray20};
  }
`;

const navbarBrandPropTypes = {
  id: string,
  to: string.isRequired,
  className: string,
  children: oneOfType([array, object, string]),
};

export const NavbarBrand = ({ id, to, className, children }) => (
  <StyledNavbarBrand id={id} to={to} className={className}>
    {children}
  </StyledNavbarBrand>
);

NavbarBrand.propTypes = navbarBrandPropTypes;
// End NavbarBrand

//  Nav
const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const navPropTypes = {
  id: string,
  className: string,
  children: oneOfType([array, object, string]),
};

export const Nav = ({ id, className, children }) => (
  <StyledNav id={id} className={className}>
    {children}
  </StyledNav>
);

Nav.propTypes = navPropTypes;
// End Nav

const NavMenu = () => {
  const { active, account, library } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { theme } = useTheme();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(3)));
    }
  }, [library, active, account]);

  return (
    <StyledNavbar className="Navbar">
      <StyledNavbarBrand to="/" theme={theme}>
        <Emoji ariaLabel="Rainbows Emoji" unicode="🌈" className="mr-2" />
        Coinflip
      </StyledNavbarBrand>
      <StyledNav>
        {active ? (
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="Tooltip--ether-balance" placement="bottom">
                  The current balance of your Ether holdings.
                </Tooltip>
              }
            >
              <Button
                variant="primary"
                id="Button__ButtonPrimary--ethereum-balance"
              >
                {parseInt(balance) < 1 ? 0 : balance} ETH
              </Button>
            </OverlayTrigger>
            <Button
              variant="green"
              id="Button__ButtonGreen--ethereum-selected-address"
              onClick={() =>
                setLayout({
                  ...layout,
                  modals: {
                    ...layout.modals,
                    account: { show: true },
                  },
                })
              }
            >
              {truncateString(account, 15)}
            </Button>
          </>
        ) : (
          <Button
            variant="pink"
            id="Button__ButtonPink--connect-to-wallet"
            onClick={() =>
              setLayout({
                ...layout,
                modals: {
                  ...layout.modals,
                  wallet: { show: true },
                },
              })
            }
          >
            Connect to a Wallet
          </Button>
        )}
        <ToggleSwitch />
      </StyledNav>
    </StyledNavbar>
  );
};

export default NavMenu;
