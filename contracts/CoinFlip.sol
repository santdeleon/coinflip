import './PseudoRandomness.sol';
import './Ownable.sol';
import './Modifiers.sol';


pragma solidity 0.5.12;

contract CoinFlip is PseudoRandomness, Ownable, Modifiers {

    address payable public contractAddress = address(uint160(address(this)));

    event BetPlaced(address gambler, uint amount, bool betWon);
    event ContractFunded(address funder, uint amount);

    function bet(address payable _gambler, uint _amount) public payable
        costs(0.01 ether)
        setBettingLimit()
        amountSentMustMatch(_amount)
        onlySender(_gambler)
        mustHaveRequiredFunds(_gambler, _amount)
        mustHaveRequiredFunds(contractAddress, _amount)
    {
        bool _betWon;
        uint rand = random();

        if (rand == 1) {
            _gambler.transfer(_amount * 2);
            _betWon = true;
        } else {
            _betWon = false;
        }

        emit BetPlaced(_gambler, _amount, _betWon);
    }

    function fundContract() public payable mustHaveRequiredFunds(msg.sender, msg.value) {
        emit ContractFunded(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public onlyOwner mustHaveRequiredFunds(contractAddress, _amount) {
        assert(msg.sender == owner);
        uint contractBalanceBefore = contractAddress.balance;
        owner.transfer(_amount);
        assert(contractAddress.balance == contractBalanceBefore - _amount);
   }

    function withdrawAll() public onlyOwner {
        assert(msg.sender == owner);
        uint withdrawalAmount = contractAddress.balance;
        owner.transfer(withdrawalAmount);
        assert(contractAddress.balance == 0);
   }

    function getContract() public view returns (address, uint) {
        return (contractAddress, contractAddress.balance);
    }

    function getOwner() public view returns (address, uint) {
        return (address(owner), address(owner).balance);
    }
}
