import React from "react";
import { Send } from 'react-feather';

import Logo from "../../assets/img/coinflip-logo.svg";
import Sun from "../../assets/img/sun.svg";
import Github from "../../assets/img/github.svg";

import './Navbar.css';

function Navbar() {
  return (
    <section className="Navbar">
      <nav className="navbar flex align-center justify-content-between">
        <img src={Logo} className="navbar-brand" alt="app-logo" />

        <div className="navbar-nav flex align-center">
          <ul className="navbar-icon-menu flex align-center">
            <li className="nav-icon-item"><a href="mailto:sant@santdeleon.co"><Send size={22}/></a></li>
          </ul>

          <ul className="navbar-menu flex align-center">
            <li className="nav-item"><a href="mailto:sant@santdeleon.co">Contact</a></li>
          </ul>

          <div className="dark-light-mode-container">
              <a href="https://github.com/santdeleon" target="_blank" rel="noopener noreferrer"><img src={Github} className="github-icon" alt="Github"/></a>
              <img src={Sun} className="sun-icon" alt="Light Mode"/>
          </div>
        </div>
      </nav>

      <div className="hyphens"></div>
    </section>
  )
}

export default Navbar;
