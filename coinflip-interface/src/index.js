import React from 'react';
import { render } from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';

import {
  LayoutProvider,
  ContractProvider,
  TransactionProvider,
  UserProvider,
} from './context';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { getLibrary } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ContractProvider>
      <TransactionProvider>
        <UserProvider>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </UserProvider>
      </TransactionProvider>
    </ContractProvider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
