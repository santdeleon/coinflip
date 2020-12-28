import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { UseWalletProvider } from 'use-wallet';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';

import { getLibrary } from './utils/getLibrary';
import * as serviceWorker from './serviceWorker';

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <UseWalletProvider>
          <ThemeProvider>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </ThemeProvider>
        </UseWalletProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root'),
);

serviceWorker.unregister();
