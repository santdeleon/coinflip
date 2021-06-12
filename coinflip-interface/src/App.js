import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  Main,
  Footer,
  Web3ReactManager,
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
