import React from 'react';
import Ethereum from '../../assets/gif/ethereum-loader.gif';

import './Loader.css';


function Loader() {

  return (
    <section className="Loader">
      <div className="row flex">
        <div className="col flex justify-content-center mx-auto">
          <img src={Ethereum} alt="Ethereum Glitch"/>
        </div>
      </div>
    </section>
  )
}

export default Loader;
