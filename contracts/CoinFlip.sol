import './Ownable.sol';
import './Betting.sol';


pragma solidity 0.5.12;

contract CoinFlip is Ownable, Betting {

    event ContractFunded(uint amount);

    function fundContract() public payable onlyOwner mustHaveRequiredFunds(msg.sender, msg.value) {
        balances[contractAddress] = balances[contractAddress].add(msg.value);
        emit ContractFunded(msg.value);
    }

    function withdrawBalance() public {
        require(balances[msg.sender] > 0, "There are no funds to withdraw");
        uint withdrawal = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(withdrawal);
    }

    function withdrawContract() public onlyOwner {
        assert(msg.sender == owner);
        uint withdrawalAmount = balances[contractAddress];
        balances[contractAddress] = 0;
        msg.sender.transfer(withdrawalAmount);
    }

    function getContract() public view returns (address, uint) {
        return (contractAddress, contractAddress.balance);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}
