const usingPseudoRandomNumber = artifacts.require("usingPseudoRandomNumber");

contract("usingPseudoRandomNumber", async accounts => {
  const [owner, alice, bob] = accounts;
  let instance;

  beforeEach(async () => {
    instance = await usingPseudoRandomNumber.new();
  });

  context("when testing random number generation", async () => {
    it("should return 0 if the number is generated at an odd time or 1 if the generated at an even time", async () => {
      let rand = parseInt(await instance.random({ from: alice }));
      assert(rand === 1 || rand === 0);
    });
  });
});
