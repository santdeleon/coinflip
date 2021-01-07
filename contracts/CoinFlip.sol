import './Ownable.sol';
import './Betting.sol';

pragma solidity >=0.4.21 <0.7.0;

contract CoinFlip is Ownable, Betting {

    event ContractFunded(uint amount);

    function fundContract() public payable onlyOwner {
        require(msg.sender.balance >= msg.value);
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
        require(balances[contractAddress] > 0, "There are no funds to withdraw");
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

    emit BetPlaced(msg.sender, msg.value, _betWon);
  }

  function withdraw() public {
    require(balances[msg.sender] > 0, "There are no funds to withdraw");
    uint withdrawal = balances[msg.sender];
    balances[msg.sender] = 0;
    msg.sender.transfer(withdrawal);
  }

  function withdrawContract() public onlyOwner {
    require(balances[contractAddress] > 0, "There are no funds to withdraw");
    uint withdrawal = balances[contractAddress];
    balances[contractAddress] = 0;
    msg.sender.transfer(withdrawal);
  }

  function getContract() public view returns (address, uint) {
    return (contractAddress, balances[contractAddress]);
  }

  function getContractOwner() public view returns(address) {
    return owner;
  }

  function getBalance() public view returns (uint) {
    return balances[msg.sender];
  }
}
