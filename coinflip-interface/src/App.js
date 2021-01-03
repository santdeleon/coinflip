import React from 'react';
import { Header, WalletModal, Web3ReactManager } from './components';

const App = () => {
  return (
    <div className="App">
      <Header />
      <WalletModal />

      <Web3ReactManager>
        <small>connected</small>
      </Web3ReactManager>
    </div>
  );
};

export default App;
