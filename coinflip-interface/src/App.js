import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  // Main,
  Footer,
  Web3ReactManager,
} from './components';

const App = () => (
  <div className="App">
    <Header />
    <WalletModal />
    <AccountModal />
    <Web3ReactManager>
      hello
      {/* <Main /> */}
    </Web3ReactManager>
    <Footer />
  </div>
);

export default App;
