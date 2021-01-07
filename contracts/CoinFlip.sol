// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.6.0;

import './libraries/Ownable.sol';
import './Playable.sol';

contract Coinflip is Ownable, Playable {

    event ContractFunded(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    function fundContract() public payable {
        require(msg.sender.balance >= msg.value);
        balances[contractAddress] += msg.value;
        emit ContractFunded(msg.sender, msg.value);
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "There are no funds available to withdraw.");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function _withdrawContract() private onlyOwner {
        assert(msg.sender == owner);
        require(balances[contractAddress] > 0);
        uint256 amount = balances[contractAddress];
        balances[contractAddress] = 0;
        msg.sender.transfer(amount);
        emit Withdraw(msg.sender, balances[contractAddress]);
    }
}
