// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FractionalNFTVault.sol";

contract FractionalNFTFactory {
    address[] public deployedContracts;
    mapping(address => address) public contractOwners;
    address public priceFeedAddress;

    event FractionalNFTCreated(address indexed owner, address fractionalNFT);

    constructor(address _priceFeedAddress) {
        priceFeedAddress = _priceFeedAddress;
    }

    function createFractionalNFT(address _nftAddress, uint256 _tokenId, uint256 _totalFractions) external {
        FractionalNFT fractionalNFT = new FractionalNFT(_nftAddress, _tokenId, _totalFractions, priceFeedAddress);
        deployedContracts.push(address(fractionalNFT));
        contractOwners[address(fractionalNFT)] = msg.sender;

        emit FractionalNFTCreated(msg.sender, address(fractionalNFT));
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }

    function getContractOwner(address _contract) external view returns (address) {
        return contractOwners[_contract];
    }
}
