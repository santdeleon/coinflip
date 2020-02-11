
# CoinFlip.io
- A decentralized gambling application built on the Ethereum Network.

## To start working locally
1. `git clone` this repo to your local environment
2. `cd` into your new project directory
3. `git checkout develop` to get the current working version of the app
4. run `npm install` to install the required dependancies
5. start up your local Ganache GUI
6. run `truffle migrate` to deploy the contracts
7. `cd client` and run `npm start` to spin up the React front end
8. Have fun!

## To start working on the Ropsten test network
1. `git clone` this repo to your local environment
2. `cd` into your new project directory
3. `git checkout testing/ropsten` to get the current working version of the app
4. run `npm install` to install the required dependancies
5. open the *truffle-config.js* file to configure the deployment with your address (*You'll need to get setup with a project on* [Infura](https://infura.io/))
6. import the project id from your new Infura project and set it in the *truffle-config.js*
7. create a .secret file (*Don't forget to .gitignore it*) with your Ethereum address' seed phrase inside.
6. run `truffle migrate --network ropsten` to deploy the contract on the testnet
7. `cd client` and run `npm start` to spin up the React front end
8. Have fun!

### Requirements
This application was built with [React](https://reactjs.org/). If you don't have prior experience with React or JavaScript this application may be a bit hard to follow.

#### Prior Knowledge to know
- HTML/CSS
- JavaScript
- Solidity
- React
- Truffle Suite

## Contributing
At the moment the project is not up for collaboration but if you find any issues and would like to highlight them, feel free to clone the repo and create a pull request.
