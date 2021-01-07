import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider, GlobalStyles } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { ContractProvider } from './context/ContractContext';
import { TransactionProvider } from './context/TransactionContext';

import { getLibrary } from './utils';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractProvider>
        <TransactionProvider>
          <ThemeProvider>
            <GlobalStyles />
            <LayoutProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </LayoutProvider>
          </ThemeProvider>
        </TransactionProvider>
      </ContractProvider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
