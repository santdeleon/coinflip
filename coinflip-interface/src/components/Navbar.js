import React, { useEffect, useState, useContext } from 'react';
import { Navbar as RBSNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import cx from 'classnames';
import styled, { ThemeContext } from 'styled-components';

import Emoji from './Emoji.js';
import ToggleSwitch from './ToggleSwitch';
import Button from './Button';

import { truncateString } from '../utils';
import { useLayout, useTheme } from '../hooks';

const Navbar = () => {
  const { active, account, library } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { theme } = useTheme();
  const { color } = useContext(ThemeContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(3)));
    }
  }, [library, active, account]);

  // return (
  //   <RBSNavbar className="Navbar align-items-center px-0">
  //     <Nav className="ml-auto align-items-center">
  //       {active ? (
  //         <>
  //
  //           <Button
  //             variant={theme === 'light' ? 'light' : 'dark'}
  //             className="text-decoration-none font-weight-bold mr-3"
  // onClick={() =>
  //   setLayout({
  //     ...layout,
  //     modals: {
  //       ...layout.modals,
  //       account: { show: true },
  //     },
  //   })
  // }
  //           >
  //             {truncateString(account, 15)}
  //           </Button>
  //         </>
  //       ) : (
  // <Button
  //   variant="link"
  //   className="mr-3 p-0 text-decoration-none font-weight-bold"
  //   onClick={() =>
  //     setLayout({
  //       ...layout,
  //       modals: {
  //         ...layout.modals,
  //         wallet: { show: true },
  //       },
  //     })
  //   }
  // >
  //   Connect to a Wallet
  // </Button>
  //       )}
  //       <ToggleSwitch />
  //     </Nav>
  //   </RBSNavbar>
  // );

  const StyledNavbar = styled.header`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 1rem;
  `;

  const StyledNavbarBrand = styled(Link)`
    display: flex;
    align-items: center;
    margin-right: auto;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none !important;
    color: ${color};
    &:hover {
      color: ${({ theme }) => (theme === 'light' ? '#000' : '#e5e5e5')};
    }
  `;

  const StyledNav = styled.nav`
    display: flex;
    align-items: center;
  `;

  return (
    <StyledNavbar className="Navbar">
      <StyledNavbarBrand to="/" theme={theme}>
        <Emoji ariaLabel="Rainbows Emoji" unicode="🌈" className="mr-2" />
        Coinflip
      </StyledNavbarBrand>
      <StyledNav>
        {active ? (
          <>
            <Button margin="0 10px 0 0" disabled>
              {parseInt(balance) < 1 ? 0 : balance} ETH
            </Button>
            <Button margin="0 10px 0 0">{truncateString(account, 15)}</Button>
          </>
        ) : (
          <Button margin="0 10px 0 0">Connect to a Wallet</Button>
        )}
        <ToggleSwitch />
      </StyledNav>
    </StyledNavbar>
  );
};

export default Navbar;
