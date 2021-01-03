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

    <Web3ReactManager>
      <Row>
        <Col>
          <Button variant="pink">Hello Button</Button>
          <Button variant="orange">Hello Button</Button>
          <Button variant="yellow">Hello Button</Button>
          <Button variant="green">Hello Button</Button>
          <Button variant="blue">Hello Button</Button>
          <Button variant="purple">Hello Button</Button>
          <Button variant="light">Hello Button</Button>
          <Button variant="dark">Hello Button</Button>
        </Col>
      </Row>
    </Web3ReactManager>
  </div>
);

export default App;
