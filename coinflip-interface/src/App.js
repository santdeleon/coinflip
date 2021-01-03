import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  Web3ReactManager,
  Row,
  Col,
  Button,
} from './components';

const App = () => (
  <div className="App">
    <Header />
    <WalletModal />
    <AccountModal />

    {/* Currently a sandbox for creating, styling, and modifying new components */}
    <Web3ReactManager>
      <Row>
        <Col></Col>
      </Row>
    </Web3ReactManager>
  </div>
);

export default App;
