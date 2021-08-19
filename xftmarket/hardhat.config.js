require("@nomiclabs/hardhat-waffle");

const file = require("fs");
const key = file.readFileSync(".ignoreme").toString()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const project_id = "2cd9a2d0880842e4b849110d46800c84"

module.exports = {
  networks: {
    hardhat: {      //Hardhat makes accounts for you.
      chainId: 1337,    // never hardcode this with real money

    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${project_id}`,
      accounts: [key],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${project_id}`, 
      accounts: [key],
    }
  },
  solidity: "0.8.7",
};
