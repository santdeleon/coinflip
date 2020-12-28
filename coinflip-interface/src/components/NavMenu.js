import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

import Emoji from './Emoji.js';

import { truncateString } from '../utils';
import { useLayout } from '../hooks';

const NavMenu = () => {
  const { active, account, library } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (active) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(2)));
    }
  }, [library, active, account]);

  return (
    <Navbar className="NavMenu align-items-center">
      <Navbar.Brand
        as={Link}
        to="/"
        className="font-weight-bold d-flex align-items-center"
      >
        <Emoji ariaLabel="Rainbows Emoji" unicode="🌈" className="mr-2" />
        Coinflip
      </Navbar.Brand>
      <Nav className="ml-auto align-items-center">
        {active ? (
          <>
            <Button
              variant="light"
              className="text-decoration-none font-weight-bold mr-2"
            >
              {balance} ETH
            </Button>
            <Button
              variant="light"
              className="text-decoration-none font-weight-bold"
            >
              {truncateString(account, 15)}
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            className="NavMenu__Button--connect-wallet text-decoration-none font-weight-bold"
            onClick={() =>
              setLayout({ ...layout, showConnectWalletModal: true })
            }
          >
            Connect to a Wallet
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
