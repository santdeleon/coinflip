import React from 'react';
import {
  Header,
  AccountModal,
  Main,
  Footer,
  Web3ReactManager,
  WalletModal,
} from './components';

const App = () => (
  <>
    <Header />
    <WalletModal />
    <AccountModal />
    <Web3ReactManager>
      <Main />
    </Web3ReactManager>
    <Footer />
  </>
);

export default App;
