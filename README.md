# @santdeleon/coinflip

> A decentralized gaming application built on Ethereum

[![License](https://img.shields.io/github/license/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/main/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/santdeleon/coinflip)](https://github.com/santdeleon/coinflip/blob/main/package.json)

## To start working locally

This application assumes the use of the Ganache Ethereum node.

1. `git clone` this repo to your local environment
2. `cd coinflip` into your new project directory
3. `yarn` to install the required dependencies
4. configure the `truffle-config.js` file to your local Ganache node
5. spin up the Ganache GUI
6. run `truffle console` in your terminal to connect to the Ganache development environment
7. run `truffle migrate` to build and deploy the contracts for the blockchain
8. `cd coinflip-interface` and run `yarn` install the front-end dependencies
9. run `yarn start` to spin up the App front-end
10. Connect to MetaMask with the correct Ganache config in your browser (preferably Google Chrome)
11. You're good to go!

## Contributing

If you'd like to contribute to the project `git fork` this repo at `main` and submit a pull request.
