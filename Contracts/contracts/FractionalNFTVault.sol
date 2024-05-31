// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FractionalNFT is ERC20 {
    using Math for uint256;

    IERC721 public nft;
    uint256 public tokenId;
    uint256 public totalFractions;
    address public nftOwner;
    AggregatorV3Interface internal priceFeed;

    event Fractionalized(address indexed owner, uint256 totalFractions);
    event ListedForSale(address indexed seller, uint256 amount, uint256 price);
    event Purchased(address indexed buyer, address indexed seller, uint256 amount, uint256 price);

    struct Sale {
        address seller;
        uint256 amount;
        uint256 price; // Price per fraction in USD
    }

    mapping(uint256 => Sale) public sales;
    uint256 public saleCounter;

    constructor(
        address _nftAddress, 
        uint256 _tokenId, 
        uint256 _totalFractions, 
        address _priceFeed
    ) ERC20("FractionalNFT", "FNFT") {
        nft = IERC721(_nftAddress);
        tokenId = _tokenId;
        totalFractions = _totalFractions;
        nftOwner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeed);

        // Transfer the NFT to this contract
        nft.transferFrom(msg.sender, address(this), _tokenId);

        // Mint fractional tokens to the owner
        _mint(msg.sender, _totalFractions);

        emit Fractionalized(msg.sender, _totalFractions);
    }

    function listForSale(uint256 amount, uint256 price) external {
        require(balanceOf(msg.sender) >= amount, "Not enough fractions");
        sales[saleCounter] = Sale(msg.sender, amount, price);
        emit ListedForSale(msg.sender, amount, price);
        saleCounter = saleCounter + 1;
    }

    function purchase(uint256 saleId, uint256 amount) external payable {
        Sale storage sale = sales[saleId];
        require(sale.amount >= amount, "Not enough fractions for sale");

        uint256 ethPrice = getLatestPrice();
        uint256 totalPriceInEth = (sale.price * amount * 1e18) / ethPrice; // Convert price to ETH

        require(msg.value >= totalPriceInEth, "Not enough ether sent");

        // Transfer fractional tokens
        _transfer(sale.seller, msg.sender, amount);

        // Update sale
        sale.amount = sale.amount - amount;
        if (sale.amount == 0) {
            delete sales[saleId];
        }

        // Transfer ether to seller
        payable(sale.seller).transfer(totalPriceInEth);

        emit Purchased(msg.sender, sale.seller, amount, sale.price);
    }

    function redeemNFT() external {
        require(balanceOf(msg.sender) == totalSupply(), "Must own all fractions to redeem NFT");
        _burn(msg.sender, totalSupply());
        nft.transferFrom(address(this), msg.sender, tokenId);
    }

    function getLatestPrice() public view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price) * 1e10; // Price in 18 decimals
    }
}
