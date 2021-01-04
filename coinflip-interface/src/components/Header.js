import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import cx from 'classnames';
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
  TooltipDivider,
  Row,
  Col,
} from '.';
import Moon from '../assets/img/moon.svg';
import EtherDiamond from '../assets/gif/ether-diamond.gif';

const Header = () => {
  const { active, account, library } = useWeb3React();
  const { theme, toggleTheme } = useTheme();
  const { layout, setLayout } = useLayout();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(3)));
    }
  }, [library, active, account]);

  return (
    <Navbar id="Navbar" className="Navbar">
      <NavbarBrand id="Navbar__NavbarBrand" to="/" title="Home">
        <Emoji unicode="🌈" ariaLabel="Rainbows Emoji" margin="0 0.3rem 0 0" />
        Coinflip
      </NavbarBrand>
      <Nav>
        {!active && (
          <Button
            variant="pink"
            id="Navbar__Button--connect-to-wallet"
            className="mr-3"
            onClick={() =>
              setLayout({
                ...layout,
                walletModal: { ...layout.walletModal, show: true },
              })
            }
          >
            Connect to a Wallet
          </Button>
        )}
        {active && (
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="Navbar__Tooltip--ether-balance" placement="bottom">
                  <Row>
                    <Col className="d-flex align-items-center w-100 pl-1">
                      <img
                        src={EtherDiamond}
                        alt="Pink Ethereum Diamond"
                        width={60}
                        height={50}
                      />
                      <h2 className="m-0 ml-4 text-center">Ether</h2>
                    </Col>
                  </Row>
                  <TooltipDivider />
                  <Row>
                    <Col
                      className={cx('d-flex py-3 px-3 rounded-bottom', {
                        'bg-light': theme === 'light',
                        'bg-dark': theme === 'dark',
                      })}
                    >
                      <p className="mb-0">
                        The digital currency used to transact on the Ethereum
                        Network.
                      </p>
                    </Col>
                  </Row>
                </Tooltip>
              }
            >
              <Button
                variant={theme}
                id="Navbar__Button--ether-balance"
                className="pe-none"
              >
                {balance} ETH
              </Button>
            </OverlayTrigger>
            <Button
              variant="purple"
              id="Navbar__Button--selected-ethereum-address"
              className="mx-2"
              onClick={() => {
                setLayout({
                  ...layout,
                  walletModal: { ...layout.walletModal },
                  accountModal: { ...layout.accountModal, show: true },
                });
              }}
            >
              {truncateString(account, 15)}
            </Button>
          </>
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
