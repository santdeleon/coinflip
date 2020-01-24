var PseudoRandomness = artifacts.require("./PseudoRandomness.sol");

module.exports = function(deployer) {
  deployer.deploy(PseudoRandomness);
};
