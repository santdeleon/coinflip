const path = require("path");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const projectId = "587c0d97f7ae4e67aeed916ef391ce39";
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      provider: () => new HDWalletProvider(mnemonic, "http://127.0.0.1:7545"),
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  }
};
