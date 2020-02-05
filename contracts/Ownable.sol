pragma solidity 0.5.12;

contract Ownable {

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not entitled to execute this function.");
        _;
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0));
        owner = newOwner;
    }

}
