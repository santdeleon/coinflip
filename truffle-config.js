const path = require("path");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "coinflip-interface/src/contracts"
  ),
  networks: {
    development: {
      provider: () => new HDWalletProvider(mnemonic, "http://127.0.0.1:8545"),
      network_id: "*",
    },
  },
};
