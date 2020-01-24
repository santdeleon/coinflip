pragma solidity 0.5.12;

contract PseudoRandomness {

    function random() public view returns (uint256) {
        return now % 2;
    }
}
