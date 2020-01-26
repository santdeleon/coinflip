import React from 'react';
import Ethereum from '../../assets/gif/ethereum-loader-2.gif';

import './Loader.css';


function Loader() {

  return (
    <section className="Loader">
      <div className="row flex">
        <div className="col flex flex-column align-items-center justify-content-center mx-auto">
          <img src={Ethereum} className="mx-auto" alt="Ethereum Glitch"/>
        </div>
      </div>
    </section>
  )
}

export default Loader;
