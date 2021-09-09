const { expect } = require("chai");
// console.log('test')
describe("xftMarket", function () {
  // it("Should return the new greeting once it's changed", async function () {
    it('Should facilitate market sales', async () => {
      const Market = await ethers.getContractFactory("xftMarket")
      const market = await Market.deploy()
      await market.deployed()
      const mkt_addr = market.address

      const xfttok = await ethers.getContractFactory("xftToken")
      const xft = await xfttok.deploy(mkt_addr)
      await xft.deployed()
      const nft_addr = xft.address

    // console.log()

      let priceToList = await market.get_price_to_list()
      let listing_price = priceToList.toString()

      let price = ethers.utils.parseUnits('100', 'ether')

      await xft.create_token("https://www.mytokenlocation.com")
      await xft.create_token("https://www.mytokenlocation2.com")

      await market.create_item(nft_addr, 1, priceToList, {value:listing_price})
      await market.create_item(nft_addr, 2, priceToList, {value:listing_price})


      const [_, buyerAddress] = await ethers.getSigners()

      // await market.connect(buyerAddress).sell_item(nft_addr, 1, {value: price})

      const items = await market.fetch_all_available_items() 
      console.log("items: ", items)

    });
    
  // });
});
