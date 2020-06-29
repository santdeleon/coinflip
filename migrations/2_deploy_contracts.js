var CoinFlip = artifacts.require("./CoinFlip.sol");

module.exports = deployer => {
  deployer.deploy(CoinFlip);
};
