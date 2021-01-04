import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  // Main,
  Web3ReactManager,
} from './components';

const App = () => (
  <div className="App">
    <Header />
    <WalletModal />
    <AccountModal />
    <Web3ReactManager>{/* <Main /> */} yo</Web3ReactManager>
  </div>
);

export default App;
