const CoinFlip = artifacts.require("CoinFlip");
var truffleAssert = require("truffle-assertions");


contract("CoinFlip", async (accounts) => {
  // this takes the first 3 Ganache accounts and sets them equal to the accounts at that index
  // accounts[0] = owner, accounts[1] = alice, accounts[2] = bob
  const [owner, alice, bob] = accounts;
  let instance;
  // gasPrice and gasLimit are default values on the Ganache client
  const gasPrice = 20000000000;
  const gasLimit = 6721975;

  // before each test instantiate a new CoinFlip instance
  beforeEach(async () => {
    instance = await CoinFlip.new();
  });

  context("when deploying the contract", async () => {
    it("should set the deployer of the contract as the owner of the contract", async () => {
      let ownerLookup = await instance.getOwner({from: alice});
      truffleAssert.passes(ownerLookup[0] === owner, truffleAssert.ErrorType.REVERT);
    });
  });

  context("when retrieving contract info", async () => {
    it("should return the correct contract address and contract balance", async () => {
      let addressMatches, balanceMatches;

      let contractLookup = await instance.getContract({from: alice});
      (contractLookup[0] === instance.address) ? addressMatches = true : addressMatches = false;
      (parseInt(contractLookup[1]) === parseInt(await web3.eth.getBalance(instance.address))) ? balanceMatches = true : balanceMatches = false;
      truffleAssert.passes(addressMatches, balanceMatches, truffleAssert.ErrorType.REVERT);
    });

    it("should return the correct contract owner address and contract owner balance", async () => {
      let addressMatches, balanceMatches;

      let ownerLookup = await instance.getOwner({from: alice});
      (ownerLookup[0] === owner) ? addressMatches = true : addressMatches = false;
      (parseInt(ownerLookup[1]) === parseInt(await web3.eth.getBalance(owner))) ? balanceMatches = true : balanceMatches = false;
      truffleAssert.passes(addressMatches, balanceMatches, truffleAssert.ErrorType.REVERT);
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
