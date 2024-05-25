require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.25",
  paths:{
    artifacts: "./src",
  },
  networks: {
    zkEVM: {
      url: process.env.ZKEVM_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
