import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { ContractProvider } from './context/ContractContext';

import { getLibrary } from './utils/getLibrary';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ContractProvider>
          <ThemeProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ThemeProvider>
        </ContractProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root'),
);

serviceWorker.unregister();
