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
          <Button variant="red" className="mr-5">
            Hello Button
          </Button>
          <Button variant="orange" className="mr-5">
            Hello Button
          </Button>
          <Button variant="yellow" className="mr-5">
            Hello Button
          </Button>
          <Button variant="green" className="mr-5">
            Hello Button
          </Button>
          <Button variant="blue" className="mr-5">
            Hello Button
          </Button>
          <Button variant="purple" className="mr-5">
            Hello Button
          </Button>
          <Button variant="pink" className="mr-5">
            Hello Button
          </Button>
          <Button variant="light" className="mr-5">
            Hello Button
          </Button>
          <Button variant="dark" className="mr-5">
            Hello Button
          </Button>
          <Button variant="transparent" className="mr-5">
            Hello Button
          </Button>
          <Button variant="link" className="mr-5">
            Hello Button
          </Button>
        </Col>
      </Row>
    </Web3ReactManager>
  </div>
);

export default App;
