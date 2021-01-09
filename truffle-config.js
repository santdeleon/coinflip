const path = require("path");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const projectId = "313d0965856b40b28a7ccfd1bb0e237a";
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "coinflip-interface/src/contracts"
  ),
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
  networks: {
    development: {
      provider: () => new HDWalletProvider(mnemonic, `http://127.0.0.1:8545`),
      network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${projectId}`
        ),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
};
