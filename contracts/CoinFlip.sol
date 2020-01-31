import './Ownable.sol';
import './Betting.sol';


pragma solidity 0.5.12;

contract CoinFlip is Ownable, Betting {

    event ContractFunded(address funder, uint amount);

    function fundContract() public payable mustHaveRequiredFunds(msg.sender, msg.value) {
        emit ContractFunded(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public onlyOwner mustHaveRequiredFunds(address(this), _amount) {
        assert(msg.sender == owner);
        uint contractBalanceBefore = address(this).balance;
        owner.transfer(_amount);
        assert(address(this).balance == contractBalanceBefore - _amount);
    }

    function withdrawAll() public onlyOwner {
        assert(msg.sender == owner);
        uint withdrawalAmount = address(this).balance;
        owner.transfer(withdrawalAmount);
        assert(address(this).balance == 0);
    }

    function getContract() public view returns (address, uint) {
        return (address(this), address(this).balance);
    }

    function getOwner() public view returns (address, uint) {
        return (address(owner), address(owner).balance);
    }
}
