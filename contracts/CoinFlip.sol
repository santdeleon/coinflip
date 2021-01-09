// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

import "./libraries/Owner.sol";
import "./interfaces/AggregatorV3Interface.sol";

contract Coinflip is Owner  {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    event BetPlaced(address indexed sender, uint amount, bool won);
    event ContractFunded(address indexed sender, uint amount);

    mapping (address => uint) public balances;
    mapping (address => uint) public playerBetCount;
    mapping (uint => address) public betToPlayer;

    struct Bet {
        address sender;
        uint amount;
        bool won;
    }

    Bet[] public bets;

    /**
     * Returns the total bet count
     */
    function getTotalBetCount() public view returns (uint) {
        return bets.length;
    }

    /**
     * Allows a user to place a bet against the latest ETH price for a possible 2x return
     */
    function bet() public payable {
        require(msg.sender.balance >= msg.value, "You have insufficient funds.");

        int latestEthPrice = getLatestPrice();
        int mod = latestEthPrice % 2;
        bool _won = mod == 0 ? true : false;

        Bet memory b;
        b.sender = msg.sender;
        b.amount = msg.value;
        b.won = _won;
        bets.push(b);
        uint id = bets.length - 1;

        betToPlayer[id] = msg.sender;
        playerBetCount[msg.sender] += 1;
        balances[address(this)] += msg.value;

        emit BetPlaced(msg.sender, msg.value, _won);
    }

    /**
     * Allows any user to send funds to the contract address giving the ability to bet/play
     */
    function fund() public payable {
        require(msg.sender.balance >= msg.value, "You don't have enough funds.");
        balances[address(this)] += msg.value;
        emit ContractFunded(msg.sender, msg.value);
    }

    /**
     * Allows a user to withdraw their earnings
     */
    function withdraw() public {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    /**
     * Allows the contract owner to withdraw the contract balance
     */
    function _withdrawContract() private isOwner {
        uint amount = balances[address(this)];
        balances[address(this)] = 0;
        msg.sender.transfer(amount);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
