import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';

import EarningsPopover from './EarningsPopover';
import BalancePopover from './BalancePopover';

import { useLayout, useContract, useTransaction, useUser } from '../context';

import { truncateString } from '../utils';

import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';

const Header = () => {
  const { active, account } = useWeb3React();
  const { balance: contractBalance } = useContract();
  const { isOwner: userIsOwner } = useUser();
  const { sendTransaction } = useTransaction();
  const { setShowWalletModal, setShowAccountModal } = useLayout();

  return (
    <header>
      <Navbar>
        <Navbar.Brand to="/" className="font-weight-bold text-dark">
          <span role="img" aria-label="Rainbows Emoji" className="mr-2">
            🌈
          </span>
          Coinflip
        </Navbar.Brand>
        <Nav className="ml-auto">
          {active && (
            <>
              <div className="d-none d-md-flex">
                {userIsOwner && contractBalance > 0 && (
                  <Button
                    variant="transparent"
                    className="mr-2"
                    onClick={() => sendTransaction('owner_withdraw')}
                  >
                    Withdraw from Contract
                  </Button>
                )}
                {contractBalance <= 0 && (
                  <Button
                    variant="transparent"
                    className="mr-2"
                    onClick={() => sendTransaction('fund')}
                  >
                    Fund Contract
                  </Button>
                )}
                <EarningsPopover />
                <BalancePopover />
              </div>
              <Button
                variant="light"
                className="d-inline-flex align-items-center"
                onClick={() => setShowAccountModal(true)}
              >
                {truncateString(account, 15)}
                <img
                  src={MetaMaskAvatar}
                  alt="MetaMask"
                  className="rounded-circle ml-1"
                />
              </Button>
            </>
          )}
          {!active && (
            <Button variant="primary" onClick={() => setShowWalletModal(true)}>
              Connect to a Wallet
            </Button>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
