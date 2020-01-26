import React from "react";

import './SuccessBar.css';

function SuccessBar() {
  return (
    <section className="SuccessBar">
      <div className="row flex justify-content-center">
        <div className="col text-center">
          <h1 className="Success-text">Success! Your transaction went through</h1>
        </div>
      </div>
    </section>
  )
}

export default SuccessBar;
