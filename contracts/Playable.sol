// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.6.0;

import "./libraries/provableAPI.sol";

contract Playable is usingProvable  {

    constructor() public {
        provable_setProof(proofType_Ledger);
        update();
    }

    address public contractAddress = address(this);

    uint QUERY_PRICE = provable_getPrice("Random");
    uint constant MAX_INT_FROM_BYTE = 256;
    uint constant NUM_RANDOM_BYTES_REQUESTED = 1;

    event LogNewProvableQuery(string description);
    event BetPlaced(bytes32 queryId, address indexed sender, uint256 amount);
    event BetFailed(bytes32 queryId, string reason);
    event BetSucceeded(bytes32 queryId, address indexed sender, uint256 amount, bool won);

    struct Bet {
        bytes32 queryId;
        address sender;
        uint256 amount;
        uint256 calculatedAmount;
        bool won;
        bool isPending;
    }

    Bet[] public bets;

    mapping (address => uint256) public balances;
    mapping (uint256 => address) public betToPlayer;
    mapping (address => uint256) public playerBetCount;

    function totalBetCount() public view returns (uint256 count) {
        return bets.length;
    }

    function bet(uint _amount) public payable {
        require(msg.sender.balance >= _amount);
        require(balances[contractAddress] >= _amount + QUERY_PRICE);
        require(QUERY_PRICE < balances[contractAddress]);

        uint256 calculatedBet = _amount - QUERY_PRICE;
        balances[contractAddress] = balances[contractAddress] + calculatedBet;
        bytes32 queryId = update();
        uint id = bets.push(Bet(queryId, msg.sender, _amount, calculatedBet, false, true)) - 1;
        betToPlayer[id] = msg.sender;
        playerBetCount[msg.sender] = playerBetCount[msg.sender] + 1;

        emit BetPlaced(queryId, msg.sender, calculatedBet);
        assert(balances[contractAddress] == contractAddress.balance);
    }

    function update() payable public returns (bytes32) {
        uint256 QUERY_EXECUTION_DELAY = 0;
        uint256 GAS_FOR_CALLBACK = 200000;
        bytes32 queryId = provable_newRandomDSQuery(QUERY_EXECUTION_DELAY, NUM_RANDOM_BYTES_REQUESTED, GAS_FOR_CALLBACK);
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        return queryId;
    }

    function __callback(bytes32 _queryId, string memory _result, bytes memory _proof) public {
        require(msg.sender == provable_cbAddress());

        if (provable_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
            emit BetFailed(_queryId, "The bet was unable to be verified");
            return;
        } else {
            uint256 ceiling = (MAX_INT_FROM_BYTE ** NUM_RANDOM_BYTES_REQUESTED) - 1;
            uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % ceiling;

            for (uint256 i = 0; i < bets.length; i++) {
                Bet storage b = bets[i];

                if (b.queryId == _queryId && b.isPending == true) {
                    b.isPending = false;

                    // Player lost
                    if (randomNumber <= 128) {
                        b.won = false;
                        emit BetSucceeded(_queryId, b.sender, b.amount, b.won);

                    // Player Won
                    } else if (randomNumber >= 129) {
                        uint earnings = b.calculatedAmount * 2;

                        b.won = true;
                        balances[contractAddress] -= earnings;
                        balances[b.sender] += earnings;

                        emit BetSucceeded(_queryId, b.sender, earnings, b.won);
                    }
                }
            }
        }
    }
}
