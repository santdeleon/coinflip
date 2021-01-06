import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import cx from 'classnames';

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

import { useLayout, useTheme, useContract, useTransaction } from '../hooks';

import { truncateString, colors } from '../utils';

import Moon from '../assets/img/moon.svg';
import FireSpriteLight from '../assets/img/fire-sprite-light.svg';
import FireSpriteDark from '../assets/img/fire-sprite-dark.svg';
import EtherDiamond from '../assets/gif/ether-diamond.gif';
import MetaMaskAvatar from '../assets/img/metamask-avatar.svg';

const Header = () => {
  const { active, account, library } = useWeb3React();
  const { contract } = useContract();
  const { sendTransaction } = useTransaction();
  const { theme, toggleTheme } = useTheme();
  const { layout, setLayout } = useLayout();
  const [userBalance, setUserBalance] = useState(null);
  const [availableFunds, setAvailableFunds] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setUserBalance(parseFloat(formatEther(res)).toFixed(3)));

      if (contract) {
        contract
          .balances(account)
          .then((funds) => setAvailableFunds(formatEther(funds)))
          .catch((err) => console.error(err));
      }
    }
  }, [library, active, account, contract]);

  return (
    <Navbar id="Navbar" className="Navbar">
      <NavbarBrand id="Navbar__NavbarBrand" to="/" title="Home">
        <Emoji unicode="🌈" ariaLabel="Rainbows Emoji" margin="0 0.3rem 0 0" />
        Coinflip
      </NavbarBrand>
      <Nav>
        {active && (
          <>
            <div className="d-none d-md-flex">
              {/* User Earnings Tooltip */}
              <OverlayTrigger
                overlay={
                  <Tooltip id="Navbar__Tooltip--earnings" placement="bottom">
                    <Row className="align-items-center p-3" noGutters>
                      <Col className="d-flex align-items-center text-left">
                        <img
                          src={
                            theme === 'light' ? FireSpriteLight : FireSpriteDark
                          }
                          alt="Fire"
                          width={90}
                          height={70}
                        />
                        <div className="ml-3">
                          <h3>Earnings</h3>
                          <p
                            className={cx('mb-0', {
                              'text-secondary': theme === 'light',
                            })}
                            style={{ color: colors.$gray40 }}
                          >
                            The current amount of available Ether you&apos;ve
                            earned.
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row
                      className={cx('p-3', {
                        'bg-light': theme === 'light',
                      })}
                      style={{
                        backgroundColor: colors.$gray70,
                        borderRadius: '0 0 8px 8px',
                      }}
                      noGutters
                    >
                      <Col>
                        <Button
                          variant="green"
                          id="Navbar__Button--withdraw-available-funds"
                          className="w-100"
                          onClick={() => sendTransaction('user_withdraw')}
                          disabled={availableFunds && availableFunds <= 0}
                        >
                          Withdraw
                        </Button>
                      </Col>
                    </Row>
                  </Tooltip>
                }
              >
                <Button
                  variant={availableFunds > 0 ? 'green' : 'dark'}
                  id="Navbar__Button--user-available-funds"
                  className="mr-2"
                >
                  {availableFunds < 0.0001 ? 0 : availableFunds} ETH
                </Button>
              </OverlayTrigger>

              {/* User Ether Balance Tooltip */}
              <OverlayTrigger
                overlay={
                  <Tooltip
                    id="Navbar__Tooltip--user-ether-balance"
                    placement="bottom"
                  >
                    <Row
                      className="align-items-center pt-3 pb-4 px-3"
                      noGutters
                    >
                      <Col className="d-flex align-items-center text-left">
                        <img
                          src={EtherDiamond}
                          alt="Pink Ethereum Diamond"
                          width={90}
                          height={70}
                        />
                        <div className="ml-3 text-left ">
                          <h3>Balance</h3>
                          <p
                            className={cx('mb-0', {
                              'text-secondary': theme === 'light',
                            })}
                            style={{ color: colors.$gray40 }}
                          >
                            The Ether balance for your currently selected
                            Ethereum address.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Tooltip>
                }
              >
                <Button variant="dark" id="Navbar__Button--user-ether-balance">
                  {userBalance && userBalance > 0.0001 ? userBalance : 0} ETH
                </Button>
              </OverlayTrigger>
            </div>

            {/* Selected Ethereum Address/Show Account Modal Button */}
            <Button
              variant="light"
              id="Navbar__Button--selected-ethereum-address"
              className="d-flex align-items-center mx-2"
              onClick={() => {
                setLayout({
                  ...layout,
                  walletModal: { ...layout.walletModal },
                  accountModal: { ...layout.accountModal, show: true },
                });
              }}
            >
              {truncateString(account, 15)}
              <img
                src={MetaMaskAvatar}
                alt="MetaMask Avatar"
                aria-label="MetaMask Avatar"
                className="rounded-circle ml-1"
              />
            </Button>
          </>
        )}

        {/* Connect to Wallet Button */}
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

        {/* Theme Toggle */}
        <ToggleSwitch
          id="ToggleSwitch--theme"
          title={`Activate ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          onClick={toggleTheme}
        >
          <img src={Moon} alt="Moon" aria-label="Moon" />
        </ToggleSwitch>
      </Nav>
    </Navbar>
  );
};

export default Header;
