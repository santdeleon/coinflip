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
          <Button variant="red" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="orange" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="yellow" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="green" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="blue" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="purple" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="pink" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="light" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="dark" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="transparent" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
          <Button variant="link" style={{ margin: '5px 5px 0 0' }}>
            Hello Button
          </Button>
        </Col>
      </Row>
    </Web3ReactManager>
  </div>
);

export default App;
