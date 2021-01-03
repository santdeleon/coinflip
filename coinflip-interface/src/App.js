import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  Web3ReactManager,
} from './components';

const App = () => {
  return (
    <div className="App">
      <Header />
      <WalletModal />
      <AccountModal />

      <Web3ReactManager>
        <small>connected</small>
      </Web3ReactManager>
    </div>
  );
};

export default App;
