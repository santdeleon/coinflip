# Coinflip

> A decentralized gambling application built on the Ethereum Network.

[![License](https://img.shields.io/github/license/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/master/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/master/package.json)

## To start working locally

1. `git clone` this repo to your local environment
2. `cd coinflip` into your new project directory
3. `yarn` to install the required dependencies
4. configure the `truffle-config.js` file to an Ethereum node (preferably Ganache)
5. spin up your Ethereum node
6. run `truffle migrate` to deploy the contracts
7. `cd client` and run `yarn start` to spin up the App front-end
8. You're good to go.

## To start working on the Ropsten test network

> This branch is out-of-date and in progress at the moment.

1. `git clone` this repo to your local environment
2. `cd` into your new project directory
3. `git checkout testing/ropsten` to use the version of the app using Oracles
   to get off chain data
4. `yarn` to install the required dependencies
5. configure the `truffle-config.js` file to an Ethereum node
6. run `truffle migrate --network ropsten` to deploy the contract on the Ropsten testnet (You can also use any of the Ethereum networks).
7. `cd client` and run `yarn start` to spin up the React front end

### Technologies

- [React](https://reactjs.org/)
- [Solidity](https://solidity.readthedocs.io/en/v0.6.10/)
- [Truffle](https://www.trufflesuite.com/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Ethersjs](https://docs.ethers.io/v5/)

## Contributing

If you'd like to contribute to the project `git clone` this repo at `master` and submit a pull request.

Note: The `testing/ropsten` branch is currently being updated to [Ethersjs](https://docs.ethers.io/v5/) and is not currently working. If you'd like to contribute there: `git clone` from the `testing/ropsten` branch and submit a pull request.
