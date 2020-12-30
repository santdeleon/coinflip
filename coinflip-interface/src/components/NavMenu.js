import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import cx from 'classnames';

import Emoji from './Emoji.js';
import ToggleSwitch from './ToggleSwitch';

import { truncateString } from '../utils';
import { useLayout, useTheme } from '../hooks';

const NavMenu = () => {
  const { active, account, library } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { theme, toggleTheme } = useTheme();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(2)));
    }
  }, [library, active, account]);

  return (
    <Navbar className="NavMenu align-items-center px-0">
      <Navbar.Brand
        as={Link}
        to="/"
        className={cx('font-weight-bold d-flex align-items-center', {
          'text-dark': theme === 'light',
          'text-light': theme === 'dark',
        })}
      >
        <Emoji ariaLabel="Rainbows Emoji" unicode="🌈" className="mr-2" />
        Coinflip
      </Navbar.Brand>
      <Nav className="ml-auto align-items-center">
        {active ? (
          <>
            <Button
              variant={theme === 'light' ? 'light' : 'dark'}
              className="text-decoration-none font-weight-bold mr-2"
            >
              {balance} ETH
            </Button>
            <Button
              variant={theme === 'light' ? 'light' : 'dark'}
              className="text-decoration-none font-weight-bold mr-3"
            >
              {truncateString(account, 15)}
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            className="NavMenu__Button--connect-wallet text-decoration-none font-weight-bold mr-2"
            onClick={() =>
              setLayout({ ...layout, walletModal: { show: true } })
            }
          >
            Connect to a Wallet
          </Button>
        )}
        <ToggleSwitch theme={theme} toggleTheme={toggleTheme} />
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
