import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { truncateString } from '../utils';
import { useLayout, useTheme } from '../hooks';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Emoji,
  ToggleSwitch,
  Button,
  OverlayTrigger,
  Tooltip,
} from '.';
import Moon from '../assets/img/moon.svg';

const Header = () => {
  const { active, account, library } = useWeb3React();
  const { layout, setLayout } = useLayout();
  const { theme, toggleTheme } = useTheme();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(3)));
    }
  }, [library, active, account]);

  return (
    <Navbar id="Navbar" className="Navbar">
      <NavbarBrand id="Navbar__NavbarBrand" to="/" theme={theme}>
        <Emoji unicode="🌈" ariaLabel="Rainbows Emoji" margin="0 0.3rem 0 0" />
        Coinflip
      </NavbarBrand>
      <Nav>
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
        <ToggleSwitch
          id="ToggleSwitch--theme"
          title={`Activate ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          onClick={toggleTheme}
        >
          <img src={Moon} alt="Moon" aria-label="Moon" className="w-100" />
        </ToggleSwitch>
      </Nav>
    </Navbar>
  );
};

export default Header;
