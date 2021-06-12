import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { oneOfType, arrayOf, node } from 'prop-types';

import { useContract } from '.';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { active, account, library } = useWeb3React();
  const { contract, owner } = useContract();
  const [user, setUser] = useState({
    balance: '',
    earnings: '',
    isOwner: false,
  });

  const fetchUserData = useCallback(async () => {
    const rawUserBalance = await library.getBalance(account);
    const rawUserEarnings = await contract.balances(account);

    setUser({
      balance: parseFloat(formatEther(rawUserBalance)).toFixed(3),
      earnings: formatEther(rawUserEarnings),
      isOwner: account === owner,
    });
  }, [account, contract, library, owner]);

  useEffect(() => {
    if (active && contract) {
      fetchUserData();
    }
  }, [active, contract, fetchUserData]);

  return (
    <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default UserProvider;
