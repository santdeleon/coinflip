import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import App from './App';
import * as serviceWorker from './serviceWorker';

import {
  TransactionProvider,
  ContractProvider,
  LayoutProvider,
  ThemeProvider,
  GlobalStyles,
} from './context';

import { getLibrary } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractProvider>
        <TransactionProvider>
          <ThemeProvider>
            <LayoutProvider>
              <BrowserRouter>
                <App />
                <GlobalStyles />
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
