import React from 'react';
// import {} from 'prop-types';
import Ethereum from '../../assets/gif/ethereum-loader-2.gif';

import './Loader.css';

const propTypes = {};
const defaultProps = {};

const Loader = () => (
  <div className="Loader">
    <div className="row flex">
      <div className="col flex flex-column align-items-center justify-content-center mx-auto">
        <img src={Ethereum} className="mx-auto" alt="Ethereum Glitch"/>
      </div>
    </div>
  </div>
);

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;
export default Loader;
