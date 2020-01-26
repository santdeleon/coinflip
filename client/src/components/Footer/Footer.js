import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";


import './Footer.css';

function Footer() {
  return (
    <section className="Footer">
      <footer>
        <div className="row footer-bottom donations flex justify-content-between">
          <div className="flex flex-column">
            <p className="donate-text">show some <span className="heart">♥</span> donate crypto. <small>- these are my real addresses :)</small></p>

            <div className="col flex btc-wrapper">
              <div className="flex">
                <FontAwesomeIcon className="crypto-logo bitcoin-logo" icon={faBitcoin}/><span className="crypto-text">1FHhqvXD766wW39JMwZx4XdRyXegZUdNLa</span>
              </div>
            </div>

            <div className="col flex eth-wrapper">
              <div className="flex">
                <FontAwesomeIcon className="crypto-logo ethereum-logo" icon={faEthereum}/><span className="crypto-text">0x64dF4A3216C6835F48B2A34c98591ef5bD82eb71</span>
              </div>
            </div>
          </div>

          <div className="col copyright flex flex-column justify-content-end">
            <p className="copyright-text">Copyright © Sant Deleon 2020</p>
            <p className="credit-text">Website designed and coded by Sant.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Footer;
