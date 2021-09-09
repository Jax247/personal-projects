// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Actual MarketPlace Contract, use the XFT Tokens to facilitate payments

import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Provides security utility to protect cross contract transactions, Reentry attacks 
import "./@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./hardhat/console.sol";


contract xftMarket is ReentrancyGuard {
    // Need counters for the item ids in the market and the items that have been sold 
    using Counters for Counters.Counter;
    Counters.Counter private item_ids;
    Counters.Counter private items_sold;

    address payable contract_owner;
    uint256 price_to_list = 0.025 ether; 

    constructor() {
        contract_owner = payable(msg.sender);
    }

    struct Product {
        uint256 product_id;
        uint256 price;
        // uint256 quantity;
        uint256 token_id;
        address nft_contract;
        address payable seller;
        address payable owner;
        bool is_sold;
    }

    mapping(uint256 => Product) private product_by_id;

    // event for when an item is created return the items
    // index items for logging purposes
    event item_created(
        uint256 indexed product_id,
        uint256 price,
        uint256 indexed token_id,
        address indexed nft_contract,
        address seller,
        address owner,
        bool is_sold
    );

    function get_price_to_list() public view returns (uint256) {
        return price_to_list;
    }

    // create item and sell item fucntions 

    function create_item(address nft_contract, uint256 token_id, uint256 price) public payable nonReentrant {
        require(price > 0, "Can't be free");
        require(nft_contract != address(0));
        require(msg.value == price_to_list, "Must pay exact listing price");

        Counters.increment(item_ids); 
        uint id = item_ids.current();
        
        product_by_id[id] = Product(
            {
                product_id: id,
                nft_contract : nft_contract,
                price : price,
                token_id : token_id,
                seller : payable(msg.sender),
                owner: payable(address(0)),
                is_sold : false,
            }
        );

        // transfer ownership of nft to the contract itself
        IERC721(nft_contract).transferFrom(msg.sender, address(this), token_id);

        // tell that an item has been Made with emit

        emit item_created (
            id, 
            price, 
            token_id,
            nft_contract,
            msg.sender, 
            address(0),
            false
        );

        

    }


    function sell_item(address nft_contract, uint256 item_id) public payable nonReentrant{
        // transfer ownership of item from contract to buyer
        // Use item id to get the product 
        // get the price and token_id

        uint price = product_by_id[item_id].price;
        uint token_id = product_by_id[item_id].token_id;

        // console.log("HELOOOOOOOOOOOOOOOO");

        require(msg.value == price, "Please submit the proper asking price");

        // payment
        product_by_id[item_id].seller.transfer(msg.value);
        IERC721(nft_contract).transferFrom(address(this), msg.sender, token_id);

        product_by_id[item_id].owner = payable(msg.sender);
        product_by_id[item_id].is_sold = true;
        Counters.increment(items_sold);

        payable(contract_owner).transfer(price_to_list);    // pay contract owner 
    }

    function fetch_all_available_items() public view returns (Product[] memory) {
        uint available_item_count = item_ids.current() - items_sold.current();

        Product[] memory available_items = new Product[](available_item_count);
        uint i = 0;

        for (uint index = 1; index < item_ids.current() - 1; index++) {
            if (product_by_id[index].is_sold == false) {
                Product storage np = product_by_id[index];
                available_items[i] = np;
                i++;
            } 
        }

        return available_items;
    }

    // Things user has purchased
    function fetch_my_items() public view returns (Product[] memory) {
        uint my_item_count = 0;
        uint i = 0;


        for (uint index = 1; index < item_ids.current() - 1; index++) {
            if (product_by_id[index].owner == msg.sender) {
                my_item_count++;
            } 
        }

        Product[] memory my_items = new Product[](my_item_count);

        for (uint index = 1; index < item_ids.current() - 1; index++) {
            if (product_by_id[index].owner == msg.sender) {
                Product storage np = product_by_id[index];
                my_items[i] = np;
                i++;
            } 
        }

        return my_items;
    }

    // Things User has listed 
    function get_selling_list() public view returns (Product[] memory){
        // if msg.sender matches the product seller

        uint item_count = 0;
        uint i = 0;

        for (uint index = 1; index < item_ids.current() - 1; index++){
            if (product_by_id[index].seller == msg.sender){
                item_count++;
            }
        }

        Product[] memory my_items = new Product[](item_count);

        for (uint index = 1; index < item_ids.current() - 1; index++) {
            if (product_by_id[index].seller == msg.sender){
                Product storage np = product_by_id[index];
                my_items[i] = np;
                i++;
            }
        }
        return my_items;
    }
}

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0.025 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }
  
  /* Places an item for sale on the marketplace */
  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();
  
    idToMarketItem[itemId] =  MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createMarketSale(
    address nftContract,
    uint256 itemId
    ) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToMarketItem[itemId].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
  }

  /* Returns all unsold market items */
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns onlyl items that a user has purchased */
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns only items a user has created */
  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
