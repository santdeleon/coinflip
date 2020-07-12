const CoinFlip = artifacts.require("CoinFlip");
// import passes from "truffle-assertions";

contract("CoinFlip", async accounts => {
  const [owner, alice, bob] = accounts;
  let instance;
  // gasPrice and gasLimit are default values on the Ganache client
  const gasPrice = 20000000000;
  const gasLimit = 6721975;

  beforeEach(async () => {
    instance = await CoinFlip.new();
  });

  xcontext("when deploying the contract", async () => {
    it("should set the deployer of the contract as the owner of the contract", async () => {
      let ownerLookup = await instance.getOwner({ from: alice });

      passes(ownerLookup[0] === owner, truffleAssert.ErrorType.REVERT);
    });
  });

  // xcontext("when retrieving contract info", async () => {
  //   // function getContract()
  //   it("should return the correct contract address and contract balance", async () => {
  //     let addressMatches, balanceMatches;
  //
  //     // get the contract info
  //     let contractLookup = await instance.getContract({ from: alice });
  //     // assure the contract address is correct
  //     contractLookup[0] === instance.address
  //       ? (addressMatches = true)
  //       : (addressMatches = false);
  //     // assure the contract balance is correct
  //     parseFloat(contractLookup[1]) ===
  //     parseFloat(await web3.eth.getBalance(instance.address))
  //       ? (balanceMatches = true)
  //       : (balanceMatches = false);
  //     truffleAssert.passes(
  //       addressMatches,
  //       balanceMatches,
  //       truffleAssert.ErrorType.REVERT
  //     );
  //   });
  //
  //   // function getOwner()
  //   it("should return the correct contract owner address and contract owner balance", async () => {
  //     let addressMatches, balanceMatches;
  //
  //     // get the owner info
  //     let ownerLookup = await instance.getOwner({ from: alice });
  //     // assure the owner address is correct
  //     ownerLookup[0] === owner
  //       ? (addressMatches = true)
  //       : (addressMatches = false);
  //     // assure the owner balance is correct
  //     parseFloat(ownerLookup[1]) ===
  //     parseFloat(await web3.eth.getBalance(owner))
  //       ? (balanceMatches = true)
  //       : (balanceMatches = false);
  //     truffleAssert.passes(
  //       addressMatches,
  //       balanceMatches,
  //       truffleAssert.ErrorType.REVERT
  //     );
  //   });
  // });
  //
  // /* @dev
  //  *  When looking at the withdraw and withdrawAll functions
  //  * 'withdraw' - is the action of withdrawing (VERB)
  //  * 'withdrawal' - is the result of the withdraw (NOUN)
  //  */
  //
  // // function withdraw()
  // xcontext(
  //   "when withdrawing some of the balance of the contract address",
  //   async () => {
  //     // modifier mustHaveRequiredFunds()
  //     xcontext("testing the mustHaveRequiredFunds() modifier", async () => {
  //       it("shouldn't allow a withdraw of more ether than the contract has", async () => {
  //         let expectedErr;
  //         let oneEther = web3.utils.toWei("1", "ether");
  //         let halfAnEther = web3.utils.toWei("0.5", "ether");
  //         await instance.fundContract({ from: owner, value: halfAnEther });
  //
  //         try {
  //           await instance.withdraw(oneEther, { from: owner });
  //         } catch (err) {
  //           expectedErr = err.reason;
  //         }
  //
  //         expect(expectedErr).to.equal(
  //           "There are not enough funds to create this transaction"
  //         );
  //       });
  //     });
  //
  //     // modifier onlyOwner()
  //     xcontext("testing the onlyOwner() modifier", async () => {
  //       it("shouldn't allow a non owner to withdraw some of the funds", async () => {
  //         let expectedErr;
  //         let oneEther = web3.utils.toWei("1", "ether");
  //         await instance.fundContract({ from: bob, value: oneEther });
  //
  //         try {
  //           await instance.withdraw(oneEther, { from: bob });
  //         } catch (err) {
  //           expectedErr = err.reason;
  //         }
  //         expect(expectedErr).to.equal(
  //           "You are not entitled to execute this function."
  //         );
  //       });
  //
  //       it("should allow the owner to withdraw some funds", async () => {
  //         let oneEther = web3.utils.toWei("1", "ether");
  //         await instance.fundContract({ from: bob, value: oneEther });
  //         let withdrawal = await instance.withdraw(oneEther, { from: owner });
  //         truffleAssert.passes(withdrawal, truffleAssert.ErrorType.REVERT);
  //       });
  //     });
  //
  //     it("should allow the contract owner to withdraw some of the contract balance and subtract the withdrawal from the contract balance", async () => {
  //       let oneEther = web3.utils.toWei("1", "ether");
  //       // fund the contract some ether
  //       await instance.fundContract({
  //         from: owner,
  //         value: oneEther,
  //         gasPrice: gasPrice
  //       });
  //       // get the contract balance
  //       let contractBalance = parseFloat(
  //         await web3.eth.getBalance(instance.address)
  //       );
  //       // get the contract owner balance
  //       let ownerBalance = parseFloat(await web3.eth.getBalance(owner));
  //       // owner withdraws 1 ether
  //       let withdrawal = await instance.withdraw(oneEther, { from: owner });
  //       // get the amount of gas used from the withdraw
  //       let gasUsed = withdrawal.receipt.gasUsed;
  //       // get the owner balance after the withdraw
  //       let newOwnerBalance = parseFloat(await web3.eth.getBalance(owner));
  //       // do some math to assure the withdraw was correct
  //       let math = ownerBalance + parseFloat(oneEther) - gasPrice * gasUsed;
  //       // get the contract balance after the withdraw to assure the withdrawal was subtracted
  //       let finalContractBalance = parseFloat(
  //         await web3.eth.getBalance(instance.address)
  //       );
  //
  //       truffleAssert.passes(
  //         // if the math was correct it should equal the owners balance
  //         newOwnerBalance === math &&
  //           // if the math was correct the contract balance should be (the contract balance before - 1 ether)
  //           finalContractBalance === contractBalance - parseFloat(oneEther),
  //         truffleAssert.ErrorType.REVERT
  //       );
  //     });
  //   }
  // );
  //
  // // function withdrawAll()
  // xcontext(
  //   "when withdrawing the entire balance of the contract address",
  //   async () => {
  //     // modifier onlyOwner()
  //     xcontext("testing the onlyOwner() modifier", async () => {
  //       it("shouldn't allow a non owner to withdraw the contract balance", async () => {
  //         await instance.fundContract({
  //           from: bob,
  //           value: web3.utils.toWei("1", "ether")
  //         });
  //         await truffleAssert.fails(
  //           instance.withdrawAll({ from: bob }),
  //           truffleAssert.ErrorType.REVERT
  //         );
  //       });
  //
  //       it("should allow the owner to withdraw the contract balance", async () => {
  //         await instance.fundContract({
  //           from: bob,
  //           value: web3.utils.toWei("1", "ether")
  //         });
  //         await truffleAssert.passes(
  //           instance.withdrawAll({ from: owner }),
  //           truffleAssert.ErrorType.REVERT
  //         );
  //       });
  //     });
  //
  //     it("should allow the contract owner to withdraw the contract balance and set contract balance to 0", async () => {
  //       // fund the contract some ether
  //       await instance.fundContract({
  //         from: bob,
  //         value: web3.utils.toWei("1", "ether"),
  //         gasPrice: gasPrice
  //       });
  //       // get the contract balance
  //       let contractBalance = parseFloat(
  //         await web3.eth.getBalance(instance.address)
  //       );
  //       // get the contract owner balance
  //       let ownerBalance = parseFloat(await web3.eth.getBalance(owner));
  //       // owner withdraws all the funds
  //       let withdrawal = await instance.withdrawAll({ from: owner });
  //       // get the amount of gas used from the withdraw
  //       let gasUsed = withdrawal.receipt.gasUsed;
  //       // get the owner balance after the withdraw
  //       let newOwnerBalance = parseFloat(await web3.eth.getBalance(owner));
  //       // do some math to assure the withdraw was correct
  //       let math = ownerBalance + contractBalance - gasPrice * gasUsed;
  //       // get the contract balance after the withdraw to assure its now empty
  //       let finalContractBalance = parseFloat(
  //         await web3.eth.getBalance(instance.address)
  //       );
  //
  //       truffleAssert.passes(
  //         // if the math was correct it should equal the owners balance
  //         newOwnerBalance === math &&
  //           // if the math was correct the contract balance should be empty (0)
  //           finalContractBalance === 0,
  //         truffleAssert.ErrorType.REVERT
  //       );
  //     });
  //   }
  // );
  //
  // // function fundContract()
  // xcontext("when funding to the contract", async () => {
  //   /* @dev
  //    * The following test fails if the user has less than 1 million ether.
  //    * This type of assertion isn't ideal, however, the user will get a rejection regardless
  //    * if they try to send more funds to the contract than they have.
  //    * This test is a visual respresentation of that but is not a necessary test in xcontext.
  //    */
  //   //modifier mustHaveRequiredFunds()
  //   xcontext("testing mustHaveRequiredFunds() modifier", async () => {
  //     it("shouldn't allow a funding of more ether than the sender has", async () => {
  //       let doesntHaveEnoughFunds;
  //       // set a *somewhat* unobtainable ether amount
  //       let msgValue = parseFloat(web3.utils.toWei("1000000", "ether"));
  //       let sendersBalance = await web3.eth.getBalance(alice);
  //       sendersBalance < msgValue
  //         ? (doesntHaveEnoughFunds = true)
  //         : (doesntHaveEnoughFunds = false);
  //       truffleAssert.passes(
  //         doesntHaveEnoughFunds === true,
  //         truffleAssert.ErrorType.REVERT
  //       );
  //     });
  //   });
  //
  //   it("should allow the sender to fund the contract", async () => {
  //     let funding = await instance.fundContract({
  //       from: alice,
  //       value: web3.utils.toWei("0.01", "ether")
  //     });
  //     truffleAssert.passes(funding, truffleAssert.ErrorType.REVERT);
  //   });
  //
  //   // event ContractFunded()
  //   xcontext("testing the ContractFunded event", async () => {
  //     it("should emit an event if the contract was successfully funded", async () => {
  //       let eventEmitted;
  //
  //       let funding = await instance.fundContract({
  //         from: alice,
  //         value: web3.utils.toWei("0.01", "ether")
  //       });
  //       let receipt = funding.receipt;
  //       (receipt.logs[0].event = "ContractFunded")
  //         ? (eventEmitted = true)
  //         : (eventEmitted = false);
  //       truffleAssert.passes(eventEmitted, truffleAssert.ErrorType.REVERT);
  //     });
  //   });
  // });
  //
  // // function bet()
  // xcontext("when placing a bet", async () => {
  //   // modifier costs()
  //   xcontext("testing the costs() modifier", async () => {
  //     it("shouldn't allow the user to bet less than 0.01 ether", async () => {
  //       let expectedErr;
  //
  //       try {
  //         await instance.bet(web3.utils.toWei("0.001", "ether"), {
  //           from: alice,
  //           value: web3.utils.toWei("0.001", "ether")
  //         });
  //       } catch (err) {
  //         expectedErr = err.reason;
  //       }
  //
  //       expect(expectedErr).to.equal("You must send the required cost or more");
  //     });
  //   });
  //
  //   // modifier setBettingLimit()
  //   xcontext("testing the setBettingLimit() modifier", async () => {
  //     it("shouldn't allow the user to bet more than 5 ether", async () => {
  //       let expectedErr;
  //
  //       try {
  //         await instance.bet(web3.utils.toWei("6", "ether"), {
  //           from: alice,
  //           value: web3.utils.toWei("6", "ether")
  //         });
  //       } catch (err) {
  //         expectedErr = err.reason;
  //       }
  //
  //       expect(expectedErr).to.equal("You can't wager more than 5 ether");
  //     });
  //   });
  //
  //   // modifier amountSentMustMatch()
  //   xcontext("testing the amountSentMustMatch() modifier", async () => {
  //     it("shouldn't allow a bet if the sender sends less than the wager", async () => {
  //       let expectedErr;
  //
  //       try {
  //         await instance.bet(web3.utils.toWei("1", "ether"), {
  //           from: alice,
  //           value: web3.utils.toWei("0.01", "ether")
  //         });
  //       } catch (err) {
  //         expectedErr = err.reason;
  //       }
  //
  //       expect(expectedErr).to.equal("You must send the amount specified");
  //     });
  //
  //     it("shouldn't allow a bet if the sender sends more than the amount being wagered", async () => {
  //       let expectedErr;
  //
  //       try {
  //         await instance.bet(web3.utils.toWei("0.01", "ether"), {
  //           from: alice,
  //           value: web3.utils.toWei("1", "ether")
  //         });
  //       } catch (err) {
  //         expectedErr = err.reason;
  //       }
  //
  //       expect(expectedErr).to.equal("You must send the amount specified");
  //     });
  //   });
  //
  //   // modifier mustHaveRequiredFunds()
  //   xcontext("testing the mustHaveRequiredFunds() modifier", async () => {
  //     it("shouldn't allow the user to bet if they don't have enough funds", async () => {
  //       let doesntHaveEnoughFunds;
  //       // set a *somewhat* unobtainable ether amount
  //       let msgValue = parseFloat(web3.utils.toWei("1000000", "ether"));
  //       let sendersBalance = await web3.eth.getBalance(alice);
  //       sendersBalance < msgValue
  //         ? (doesntHaveEnoughFunds = true)
  //         : (doesntHaveEnoughFunds = false);
  //       truffleAssert.passes(
  //         doesntHaveEnoughFunds === true,
  //         truffleAssert.ErrorType.REVERT
  //       );
  //     });
  //   });
  // });
});
