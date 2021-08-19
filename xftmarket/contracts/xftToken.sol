// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// ERC721 Standard Token for XFTMarket
import "xftmarket/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "xftmarket/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "xftmarket/node_modules/@openzeppelin/contracts/utils/Counters.sol";

// create token and create process

contract XFTToken is ERC721URIStorage {  //Inheriting from URI storage
    using Counter for Counters.Counter;
    Counters.Counter private token_ids;
    address market_addr;

    constructor(address addr) ERC721("Metaverse Token", "METT"){
        require(addr != address(0));    // Protects the 0x0 address
        market_addr = addr;
    }

    function create_token(string memory uri) public returns (uint) {
        /* Mint a token, 
                add uri, 
                increment the ids using the counters,
                _mint and _approve */

       require(uri != "");
       Counters.increment(token_ids);
       const new_token = Counters.current(token_ids);

       _mint(msg.sender, new_token);    // create with requester
       _setTokenURI(new_token, uri);    // Set New token URI
       setApprovalForAll(addr, new_token);   //approve for marketplace use
       
       return new_token;
    }
}