const CoinFlip = artifacts.require("CoinFlip");
var truffleAssert = require("truffle-assertions");


contract("CoinFlip", async (accounts) => {
  const [owner, alice, bob] = accounts;
  let instance;
  const gasPrice = 20000000000;
  const gasLimit = 6721975;

  beforeEach(async () => {
    instance = await CoinFlip.new();
  });

  context("when deploying the contract", async () => {
    it("should set the deployer of the contract as the owner of the contract", async () => {
      let ownerLookup = await instance.getOwner({from: alice});
      truffleAssert.passes(ownerLookup[0] === accounts[0], truffleAssert.ErrorType.REVERT);
    });
  });

  // context("when placing a bet", async () => {
  //   it("shouldn't allow a bet if the sender sends less than the wager", async () => {
  //     let wager = await instance.bet(alice, web3.utils.toWei("0.01", "ether"), { from: alice, value: web3.utils.toWei("0.001", "ether") });
  //     truffleAssert.fails(wager, truffleAssert.ErrorType.REVERT);
  //   });
  //
  //   it("shouldn't allow a bet if the sender sends more than the amount being wagered", async () => {
  //     let wager = await instance.bet(alice, web3.utils.toWei("0.01", "ether"), { from: alice, value: web3.utils.toWei("0.02", "ether") });
  //     console.log(wager.receipt);
  //     truffleAssert.fails(wager, truffleAssert.ErrorType.REVERT);
  //   });
  //
  //   it("shouldn't allow a bet if the sender isn't wagering their own address", async () => {
  //     let wager = await instance.bet(alice, web3.utils.toWei("0.01", "ether"), { from: bob, value: web3.utils.toWei("0.01", "ether") });
  //     truffleAssert.fails(wager, truffleAssert.ErrorType.REVERT);
  //   });
  //
  //   it("should allow a bet if the sender sends the amount being wagered", async () => {
  //     let wager = await instance.bet(alice, web3.utils.toWei("0.01", "ether"), { from: alice, value: web3.utils.toWei("0.01", "ether") });
  //     let rand = await instance.random();
  //     console.log(`Random number was: ${rand}`);
  //     console.log(wager.receipt);
  //     truffleAssert.passes(wager);
  //   });
  // });
});
