# @santdeleon/coinflip

> A decentralized gaming application built on Ethereum

[![License](https://img.shields.io/github/license/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/ropsten/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/ropsten/package.json)

This branch of Coinflip uses Ethereum testnets and data oracles to simulate a
more realistic application experience. It's titled `ropsten` but can be configured to work with any Ethereum testnet.

1. `git clone` this repo to your local environment
2. `cd coinflip` into your new project directory
3. `yarn` to install the required dependencies
4. configure the `truffle-config.js` file to an Ethereum node
5. spin up your Ethereum node
6. run `truffle migrate` to deploy the contracts
7. `cd coinflip-interface` and run `yarn` to install the dependancies.
8. run `yarn start` to spin up the App front-end.
9. You're good to go.
