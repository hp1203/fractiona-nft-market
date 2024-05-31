// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FractionalNFTVault.sol";

contract FractionalNFTFactory {
    address public priceFeedAddress;
    address[] public deployedContracts;

    event FractionalNFTCreated(address indexed owner, address indexed fractionalNFT);
    event ContractCreationFailed(address indexed owner, string reason);

    constructor(address _priceFeedAddress) {
        priceFeedAddress = _priceFeedAddress;
    }

    function createFractionalNFT(
        address _nftAddress, 
        uint256 _tokenId, 
        uint256 _totalFractions
    ) external {
        IERC721 nft = IERC721(_nftAddress);

        // Check if the sender owns the NFT
        require(nft.ownerOf(_tokenId) == msg.sender, "You must own the NFT");

        // Check if the factory is approved to transfer the NFT
        require(
            nft.isApprovedForAll(msg.sender, address(this)) || 
            nft.getApproved(_tokenId) == address(this), 
            "Factory is not approved to transfer the NFT"
        );

        try new FractionalNFT(_nftAddress, _tokenId, _totalFractions, priceFeedAddress) returns (FractionalNFT fractionalNFT) {
            deployedContracts.push(address(fractionalNFT));
            emit FractionalNFTCreated(msg.sender, address(fractionalNFT));
        } catch Error(string memory reason) {
            emit ContractCreationFailed(msg.sender, reason);
        } catch (bytes memory /* lowLevelData */) {
            emit ContractCreationFailed(msg.sender, "low-level error");
        }
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}