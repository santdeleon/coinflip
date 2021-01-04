import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  Web3ReactManager,
  Row,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
} from './components';

const App = () => (
  <div className="App">
    <Header />
    <WalletModal />
    <AccountModal />

    <Web3ReactManager>
      <Row>
        <Col className="d-flex justify-content-center w-100 border border-danger p-0">
          <OverlayTrigger
            overlay={
              <Tooltip id="Navbar__Tooltip--ether-balance" placement="bottom">
                Ether - The currency used to transact on the Ethereum Network
              </Tooltip>
            }
          >
            <Button variant="dark" id="Navbar__Button--ether-balance">
              Tooltip Button
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Web3ReactManager>
  </div>
);

export default App;
