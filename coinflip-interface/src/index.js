import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider, GlobalStyles } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { ContractProvider } from './context/ContractContext';
import { getLibrary } from './utils';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractProvider>
        <ThemeProvider>
          <GlobalStyles />
          <BrowserRouter>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ContractProvider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
