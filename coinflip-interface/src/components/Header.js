import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { truncateString, colors } from '../utils';
import { useLayout, useTheme, useContract } from '../hooks';
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
  // Row,
  // Col,
} from '.';
import Moon from '../assets/img/moon.svg';
import FireSpriteLight from '../assets/img/fire-sprite-light.svg';
import FireSpriteDark from '../assets/img/fire-sprite-dark.svg';
import EtherDiamond from '../assets/gif/ether-diamond.gif';

const Header = () => {
  const { active, account, library } = useWeb3React();
  const { contract } = useContract();
  const { theme, toggleTheme } = useTheme();
  const { layout, setLayout } = useLayout();
  const [balance, setBalance] = useState(null);
  const [availableFunds, setAvailableFunds] = useState(null);

  useEffect(() => {
    if (active && account) {
      library
        .getBalance(account)
        .then((res) => setBalance(parseFloat(formatEther(res)).toFixed(3)));

      if (contract) {
        contract.balances(account).then((funds) => setAvailableFunds(funds));
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
            <div className="d-none d-md-flex">
              {/* Available Funds */}
              <OverlayTrigger
                overlay={
                  <Tooltip id="Navbar__Tooltip--earnings" placement="bottom">
                    <Row className="align-items-center py-3 px-2">
                      <Col className="d-flex align-items-center text-left">
                        <img
                          src={
                            theme === 'light' ? FireSpriteLight : FireSpriteDark
                          }
                          alt="Fire"
                          width={90}
                          height={70}
                        />
                        <div className="ml-4">
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
                    <TooltipDivider />
                    <Row
                      className={cx('p-3 rounded-bottom', {
                        'bg-light': theme === 'light',
                      })}
                      style={{ backgroundColor: colors.$gray70 }}
                      noGutters
                    >
                      <Col>
                        <Button
                          variant="green"
                          id="Navbar__Button--withdraw-available-funds"
                          className="w-100"
                        >
                          Withdraw
                        </Button>
                      </Col>
                    </Row>
                  </Tooltip>
                }
              >
                <Button
                  variant={theme}
                  id="Navbar__Button--show-available-funds"
                  className="mr-2"
                >
                  {availableFunds < 0.0001 ? 0 : availableFunds}{' '}
                  <FontAwesomeIcon icon={faEthereum} />
                </Button>
              </OverlayTrigger>
              {/* Current Ether Balance */}
              <OverlayTrigger
                overlay={
                  <Tooltip
                    id="Navbar__Tooltip--ether-balance"
                    placement="bottom"
                  >
                    <Row className="align-items-center pt-3 pb-4 px-3">
                      <Col className="d-flex align-items-center text-left">
                        <img
                          src={EtherDiamond}
                          alt="Pink Ethereum Diamond"
                          width={90}
                          height={70}
                        />
                        <div className="ml-3">
                          <h3 className="m-0 mb-2 text-left">Balance</h3>
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
                <Button variant={theme} id="Navbar__Button--ether-balance">
                  {balance < 0.0001 ? 0 : balance}{' '}
                  <FontAwesomeIcon icon={faEthereum} />
                </Button>
              </OverlayTrigger>
            </div>
            {/* Selected Ethereum Address/Show Account Modal Button */}
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
