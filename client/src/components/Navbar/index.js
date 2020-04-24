import React from 'react';
import { number } from 'prop-types';

import Logo from '../../assets/img/coinflip-logo.svg';
import Github from '../../assets/img/github.svg';

import './Navbar.css';

const propTypes = {
  contractBalance: number.isRequired
};

const defaultProps = {
  contractBalance: 0
};

const Navbar = ({ contractBalance }) => (
  <div className='Navbar'>
    <nav className='navbar flex align-center justify-content-between'>
      <img src={Logo} className='navbar-brand' alt='app-logo' />

      <div className='navbar-nav flex align-center'>
        <div className="flex align-center">
          <label
            htmlFor='contractBalance'
            style={{ marginRight: '1rem' }}
          >
            Contract balance:
          </label>
          <input
            type='text'
            id='contractBalance'
            name='contractBalance'
            className='contract-balance'
            value={`${contractBalance} ether`}
            style={{ width: '100px', marginRight: '1rem'}}
            readOnly
          />
        </div>
        <div className='flex'>
            <a
              href='https://github.com/santdeleon'
              target='_blank'
              rel='noopener noreferrer'
              title='Github'
              aria-label='Github'
            >
              <img src={Github} className='github-icon' alt='Github'/>
            </a>
        </div>
      </div>
    </nav>

    <div className='hyphens'></div>
  </div>
);

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
export default Navbar;
