pragma solidity 0.5.12;


contract Modifiers {

   modifier costs(uint cost) {
      require(msg.value >= cost, "You must send the required cost or more");
      _;
    }

    modifier amountSentMustMatch(uint amount) {
      require(msg.value == amount, "You must send the amount specified");
      _;
    }

    modifier onlySender(address sender) {
      require(sender == msg.sender, "You can't use someone else's address");
      _;
    }

    modifier mustHaveRequiredFunds(address _address, uint amount) {
      require(_address.balance >= amount, "There are not enough funds to create this transaction");
      _;
    }
}
