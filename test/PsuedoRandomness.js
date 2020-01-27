const PseudoRandomness = artifacts.require("PseudoRandomness");
var truffleAssert = require("truffle-assertions");


contract("PseudoRandomness", async (accounts) => {
  const [owner, alice, bob] = accounts;
  let instance;

  beforeEach(async () => {
    instance = await PseudoRandomness.new();
  });

  context("when testing random number generation", async () => {
    it("should return 0 if number is generated at an odd time", async () => {
      let generatedAtOddTime;
      let rand = parseInt(await instance.random({from: alice}));
      (rand === 0) ? generatedAtOddTime = true : generatedAtOddTime = false;
      truffleAssert.passes(generatedAtOddTime, truffleAssert.ErrorType.REVERT);
    });

    it("should return 1 if number is generated at an even time", async () => {
      let generatedAtEvenTime;
      let rand = parseInt(await instance.random({from: alice}));
      (rand === 1) ? generatedAtEvenTime = true : generatedAtEvenTime = false;
      truffleAssert.passes(generatedAtEvenTime, truffleAssert.ErrorType.REVERT);
    });
  });
});
