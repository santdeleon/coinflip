import './Ownable.sol';
import './usingModifiers.sol';
import './usingPseudoRandomNumber.sol';
import './SafeMath.sol';

pragma solidity >=0.4.21 <0.7.0;

contract CoinFlip is Ownable, usingModifiers, usingPseudoRandomNumber {
  using SafeMath for uint256;

  address public contractAddress = address(this);

  event BetPlaced(address sender, uint amount, bool betWon);
  event ContractFunded(address sender, uint amount);

  mapping(address => uint) public balances;
  mapping(uint => address) public betToOwner;
  mapping(uint => address) public fundToOwner;

  struct Fund {
    uint amount;
  }

  struct Bet {
    uint amount;
    bool wasWon;
  }

  Bet[] public bets;
  Fund[] public funds;

  function fundContract() public payable {
    require(msg.sender.balance >= msg.value);

    balances[contractAddress] = balances[contractAddress].add(msg.value);
    funds.push(Fund(msg.value));
    fundToOwner[funds.length - 1] = msg.sender;
    emit ContractFunded(msg.sender, msg.value);
  }

  function bet() public payable costs(0.01 ether) setBettingLimit() {
    require(msg.sender.balance >= msg.value);
    bool _betWon;
    uint rand = random();

    // you win
    if (rand == 1) {
      _betWon = true;
      balances[msg.sender] = balances[msg.sender].add(msg.value.mul(2));
      bets.push(Bet(msg.value, _betWon));
      betToOwner[bets.length - 1] = msg.sender;
    //you lose
    } else {
      _betWon = false;
      balances[contractAddress] = balances[contractAddress].add(msg.value);
      bets.push(Bet(msg.value, _betWon));
      betToOwner[bets.length - 1] = msg.sender;
    }

    emit BetPlaced(msg.sender, msg.value, _betWon);
  }

  function withdraw() public onlyOwner {
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
