import "./provableAPI.sol";
import './usingModifiers.sol';
import './SafeMath.sol';


pragma solidity 0.5.12;

contract Betting is usingModifiers, usingProvable  {
    using SafeMath for uint256;

    constructor() public {
        provable_setProof(proofType_Ledger);
        update();
    }

    uint constant MAX_INT_FROM_BYTE = 256;
    uint constant NUM_RANDOM_BYTES_REQUESTED = 1;

    event LogNewProvableQuery(string description);
    event BetPlaced(bytes32 queryId, address player, uint amount);
    event BetFailed(bytes32 queryId, string reason);
    event BetComplete(bytes32 queryId, address player, uint amount, bool betWon);

    struct Bet {
        bytes32 queryId;
        address payable player;
        uint amount;
        bool betWon;
        bool isPending;
    }

    Bet[] public bets;

    mapping (uint => address) public betToPlayer;
    mapping (address => uint) public playerBetCount;

    function bet(uint _amount) public payable
        costs(0.01 ether)
        setBettingLimit()
        mustHaveRequiredFunds(msg.sender, _amount)
        mustHaveRequiredFunds(address(this), _amount)
    {
        bytes32 _queryId = update();
        uint id = bets.push(Bet(_queryId, msg.sender, _amount, false, true)) - 1;
        betToPlayer[id] = msg.sender;
        playerBetCount[msg.sender] += 1;
        emit BetPlaced(_queryId, msg.sender, _amount);
    }

    function __callback(bytes32 _queryId, string memory _result, bytes memory _proof) public {
        require(msg.sender == provable_cbAddress());

        if (provable_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
            emit BetFailed(_queryId, "The bet was unable to be verified");
            return;
        } else {
            uint ceiling = (MAX_INT_FROM_BYTE ** NUM_RANDOM_BYTES_REQUESTED) - 1;
            uint randomNumber = uint(keccak256(abi.encodePacked(_result))) % ceiling;

            for (uint i = 0; i < bets.length; i++) {
                Bet storage b = bets[i];

                if (b.queryId == _queryId && b.isPending == true) {
                    b.isPending = false;

                    // Player lost
                    if (randomNumber <= 128) {
                        b.betWon = false;
                        emit BetComplete(_queryId, b.player, b.amount, b.betWon);

                    // Player Won
                    } else if (randomNumber >= 129) {
                        uint earnings = b.amount.mul(2);

                        b.betWon = true;
                        address(b.player).transfer(earnings);
                        emit BetComplete(_queryId, b.player, earnings, b.betWon);
                    }
                }
            }
        }
    }

    function update() payable public returns (bytes32) {
        uint QUERY_EXECUTION_DELAY = 0;
        uint GAS_FOR_CALLBACK = 200000;
        bytes32 queryId = provable_newRandomDSQuery(QUERY_EXECUTION_DELAY, NUM_RANDOM_BYTES_REQUESTED, GAS_FOR_CALLBACK);
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        return queryId;
    }
}
