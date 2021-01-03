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
  Row,
  Col,
} from '.';
import Moon from '../assets/img/moon.svg';
import EtherDiamond from '../assets/gif/ether-diamond.gif';

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
      <NavbarBrand id="Navbar__NavbarBrand" to="/" title="Home">
        <Emoji unicode="🌈" ariaLabel="Rainbows Emoji" margin="0 0.3rem 0 0" />
        Coinflip
      </NavbarBrand>
      <Nav>
        {active ? (
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="Navbar__Tooltip--ether-balance" placement="bottom">
                  <Row>
                    <Col style={{ padding: '0' }}>
                      <img
                        src={EtherDiamond}
                        alt="Pink Ethereum Diamond"
                        width={60}
                        height={50}
                      />
                    </Col>
                    <Col style={{ textAlign: 'center', padding: '0' }}>
                      <h1 style={{ marginLeft: '10px' }}>Ether</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      The currency used to transact on the Ethereum Network
                    </Col>
                  </Row>
                </Tooltip>
              }
            >
              <Button variant="primary" id="Navbar__Button--ether-balance">
                {parseInt(balance) < 1 ? 0 : balance} ETH
              </Button>
            </OverlayTrigger>
            <Button
              variant="green"
              id="Navbar__Button--selected-ethereum-address"
              margin="0 15px"
              onClick={() =>
                setLayout({
                  ...layout,
                  accountModal: { ...layout.accountModal, show: true },
                })
              }
            >
              {truncateString(account, 15)}
            </Button>
          </>
        ) : (
          <Button
            variant="pink"
            id="Navbar__Button--connect-to-wallet"
            margin="0 15px"
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
