import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider, GlobalStyles } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { getLibrary } from './utils';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import './flexbox.css';

render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
