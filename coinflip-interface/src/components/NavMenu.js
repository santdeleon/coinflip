import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from 'use-wallet';

import Emoji from './Emoji.js';

import { truncateString } from '../utils/truncateString.js';
import { useLayout } from '../hooks/useLayout';

const NavMenu = () => {
  const { active } = useWeb3React();
  const { setShowConnectWalletModal } = useLayout();
  const { account, balance, status } = useWallet();

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
              {/* {user.reedeemableBalance} ETH */}
            </Button>
            <Button
              variant="light"
              className="text-decoration-none font-weight-bold mr-2"
            >
              {/* {balance} ETH */}
            </Button>
            <Button
              variant="light"
              className="text-decoration-none font-weight-bold"
            >
              {/* {truncateString(user.address, 15)} */}
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            className="NavMenu__Button--connect-wallet text-decoration-none font-weight-bold"
            onClick={() => setShowConnectWalletModal(true)}
          >
            Connect to a Wallet
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
