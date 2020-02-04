import './Ownable.sol';
import './Betting.sol';


pragma solidity 0.5.12;

contract CoinFlip is Ownable, Betting {

    event ContractFunded(address funder, uint amount);

    function fundContract() public payable onlyOwner mustHaveRequiredFunds(msg.sender, msg.value) {
        balances[contractAddress] = balances[contractAddress].add(msg.value);
        emit ContractFunded(msg.sender, msg.value);
    }

    function withdrawBalance() public {
        uint withdrawal = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(withdrawal);
    }

    function withdrawContract() public onlyOwner {
        assert(msg.sender == owner);
        uint withdrawal = balances[contractAddress];
        balances[contractAddress] = 0;
        msg.sender.transfer(withdrawal);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}
