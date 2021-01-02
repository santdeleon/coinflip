import React from 'react'; // { StrictMode }
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider, GlobalStyles } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { getLibrary } from './utils';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ThemeProvider>
      <GlobalStyles />
      <HashRouter>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </HashRouter>
    </ThemeProvider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
