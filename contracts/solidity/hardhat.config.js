require("@parity/hardhat-polkadot");
const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Passet Hub (Polkadot EVM) - PRIMARY TARGET
    passetHub: {
      polkavm: true,  // Required for PolkaVM compilation
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [vars.get("PRIVATE_KEY")],
      chainId: 420420422,
      gasPrice: 2000000000, // 2 gwei
      gasLimit: 10000000,   // 10M gas
      timeout: 60000,       // 60 seconds
    },
    // Ethereum Sepolia Testnet - ALTERNATIVE
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    // Local Hardhat Network
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      passetHub: "no-api-key-needed",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
};
