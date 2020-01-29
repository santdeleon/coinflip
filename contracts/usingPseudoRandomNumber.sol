pragma solidity 0.5.12;

contract usingPseudoRandomNumber {
  function random() public view returns (uint) {
    return now % 2;
  }
}
