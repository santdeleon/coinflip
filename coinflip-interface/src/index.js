import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { getLibrary } from './utils/getLibrary';

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
