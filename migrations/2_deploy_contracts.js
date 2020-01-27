var CoinFlip = artifacts.require("./CoinFlip.sol");

module.exports = function(deployer) {
  deployer.deploy(CoinFlip);
};
