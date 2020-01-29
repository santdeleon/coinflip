pragma solidity 0.5.12;


contract usingModifiers {

   modifier costs(uint cost) {
      require(msg.value >= cost, "You must send the required cost or more");
      _;
    }

    modifier setBettingLimit() {
      require(msg.value <= 5 ether, "You can't wager more than 5 ether");
      _;
    }

    modifier amountSentMustMatch(uint amount) {
      require(msg.value == amount, "You must send the amount specified");
      _;
    }

    modifier mustHaveRequiredFunds(address _address, uint amount) {
      require(_address.balance >= amount, "There are not enough funds to create this transaction");
      _;
    }
}
