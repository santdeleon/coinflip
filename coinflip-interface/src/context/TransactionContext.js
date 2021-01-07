import React, { useState, createContext, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { parseEther } from '@ethersproject/units';
import { oneOfType, array, object, func } from 'prop-types';

import { useContract } from '../hooks';

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const { account } = useWeb3React();
  const { contract } = useContract();
  const [transaction, setTransaction] = useState({
    amount: '',
    status: 'idle',
    error: null,
  });

  const sendTransaction = useCallback(
    async (action) => {
      if (action) {
        // if the action is to fund the contract, default the txValue to 2 ether
        const txValue = action !== 'fund' ? transaction.amount : '2';
        setTransaction({ status: 'pending' });

        let tx, config; // let receipt, sumEvent;
        if (action === 'fund' || action === 'bet') {
          config = { value: parseEther(txValue) };
        }

        switch (action) {
          case 'fund':
            tx = await contract.fundContract(config);
            break;
          case 'bet':
            tx = await contract.bet(config);
            break;
          case 'user_withdraw':
            tx = await contract.withdraw({ from: account });
            break;
          case 'owner_withdraw':
            tx = await contract.withdrawContract();
            break;
          default:
            setTransaction({
              amount: '0',
              status: 'rejected',
              error: 'Unhandled transaction type.',
            });
            return;
        }

        // receipt = await tx.wait(1);
        // sumEvent = receipt.events.pop();

        tx.wait().then(
          (data) => {
            console.log(data);
            setTransaction({ amount: '0', status: 'resolved', error: null });
            window.location.reload();
          },
          (err) => {
            console.log(err);
            setTransaction({ amount: '0', status: 'rejected', error: err });
          },
        );
      }
      return;
    },
    [contract, transaction, account],
  );

  return (
    <TransactionContext.Provider
      value={{ transaction, setTransaction, sendTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = { children: oneOfType([array, object, func]) };
export { TransactionProvider, TransactionContext };
