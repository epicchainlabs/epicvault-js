# epicvault-core

## Overview

`epicvault-core` is the core package for `epicvault-js`, providing the foundational components for all EpicVault JavaScript distributions. This package is the backbone of the EpicVault platform, enabling developers to build powerful decentralized applications (dApps) that interact with EpicChain, EpicVault, and associated smart contracts.

The `epicvault-core` package includes several sub-packages that handle essential functionality for wallet management, transaction crafting, smart contract interaction, remote procedure calls (RPC), utilities, logging, constants, and configuration settings.

## Available Packages

The `epicvault-core` package consists of the following sub-packages:

### 1. **wallet**
   - Manages wallet creation, import, export, and signing of transactions.
   - Provides functions to interact with user accounts and private keys securely.

### 2. **tx (Transaction)**
   - Handles transaction creation, signing, and broadcasting.
   - Allows users to craft transactions, interact with smart contracts, and send tokens or assets.

### 3. **sc (Smart Contracts)**
   - Interacts with deployed smart contracts.
   - Allows developers to call smart contract functions, listen for events, and deploy contracts on the EpicChain network.

### 4. **rpc (Remote Procedure Calls)**
   - Provides the necessary methods for interacting with the EpicChain blockchain nodes via RPC.
   - Allows querying of blockchain data, submitting transactions, and interacting with nodes.

### 5. **u (Utilities)**
   - Includes helper functions and utilities for managing and manipulating data.
   - Provides general-purpose functions like encoding, decoding, and data formatting.

### 6. **logging**
   - A simple logging utility for tracking actions, errors, and debugging information.
   - Helps in logging transaction details, smart contract calls, and other important events during development.

### 7. **CONST (Constants)**
   - Contains all the constant values used across the EpicVault ecosystem, such as token symbols, contract addresses, and configuration parameters.

### 8. **settings**
   - Manages the configuration settings for the EpicVault system.
   - Allows easy customization and management of various system settings, including RPC endpoints, API keys, and wallet configurations.

## Installation

To use `epicvault-core` in your JavaScript or TypeScript project, you can install it from npm using the following commands.

### Using npm:

```sh
npm install @epicchain/epicvault-core
```

### Using yarn:

```sh
yarn add @epicchain/epicvault-core
```

## Setup and Configuration

To get started, import the necessary sub-packages into your project. Here's a basic configuration and example setup:

### Example Configuration:

```javascript
const { Wallet } = require('@epicchain/epicvault-core/wallet');
const { Tx } = require('@epicchain/epicvault-core/tx');
const { Sc } = require('@epicchain/epicvault-core/sc');
const { Rpc } = require('@epicchain/epicvault-core/rpc');
const { Logging } = require('@epicchain/epicvault-core/logging');

// Example setup for wallet and transaction
const wallet = new Wallet();
const transaction = new Tx();
const sc = new Sc();
const rpc = new Rpc();
const logger = new Logging();

// Set up wallet
const myWallet = wallet.createWallet();

// Log transactions and interactions
logger.log('Transaction Started');

// Example of using the transaction module to create a transaction
transaction.createTransaction({
  from: '0xYourWalletAddress',
  to: '0xReceiverAddress',
  amount: '1000',
  token: 'XPR'
}).then((txHash) => {
  logger.log(`Transaction Successful: ${txHash}`);
}).catch((error) => {
  logger.error(`Transaction Failed: ${error}`);
});
```

## Usage Examples

Here are some example use cases to interact with various functionalities provided by the `epicvault-core` package.

### Example 1: Create a Wallet

The `wallet` package allows you to create and manage wallets:

```javascript
const { Wallet } = require('@epicchain/epicvault-core/wallet');

const wallet = new Wallet();

// Create a new wallet
const newWallet = wallet.createWallet();

// Export the wallet private key
const privateKey = newWallet.privateKey;
console.log('Wallet Private Key:', privateKey);

// Import a wallet using the private key
const importedWallet = wallet.importWallet(privateKey);
console.log('Imported Wallet Address:', importedWallet.address);
```

### Example 2: Create and Broadcast a Transaction

The `tx` package provides functionality to create and broadcast transactions:

```javascript
const { Tx } = require('@epicchain/epicvault-core/tx');

const transaction = new Tx();

// Craft a new transaction
const txDetails = {
  from: '0xYourWalletAddress',
  to: '0xReceiverAddress',
  amount: '1000',
  token: 'XPR',
};

transaction.createTransaction(txDetails).then((txHash) => {
  console.log('Transaction Hash:', txHash);
}).catch((error) => {
  console.error('Transaction Failed:', error);
});
```

### Example 3: Interact with a Smart Contract

The `sc` package allows you to interact with deployed smart contracts on EpicChain:

```javascript
const { Sc } = require('@epicchain/epicvault-core/sc');

const sc = new Sc();

// Example: Interact with a smart contract
const contractAddress = '0xSmartContractAddress';
const contractABI = []; // Provide the ABI of the contract

const contract = sc.loadContract(contractAddress, contractABI);

// Call a function from the contract
contract.methods.someFunction().call().then((result) => {
  console.log('Smart Contract Result:', result);
}).catch((error) => {
  console.error('Error calling smart contract:', error);
});
```

### Example 4: Use Remote Procedure Calls (RPC)

The `rpc` package allows you to interact with EpicChain nodes:

```javascript
const { Rpc } = require('@epicchain/epicvault-core/rpc');

const rpc = new Rpc();

// Get the latest block number
rpc.getBlockNumber().then((blockNumber) => {
  console.log('Latest Block Number:', blockNumber);
}).catch((error) => {
  console.error('RPC Error:', error);
});
```

## Documentation

Full documentation for the `epicvault-core` package and its sub-packages is available [here](#). Detailed descriptions of all available methods, configurations, and additional examples will be provided.

## Contributing

We encourage contributions to improve the `epicvault-core` package. If you want to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests to cover your changes.
4. Ensure that all tests pass.
5. Submit a pull request with a detailed explanation of the changes you made.

### Code of Conduct

Please refer to the [Code of Conduct](CODE_OF_CONDUCT.md) for our guidelines on expected behavior.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Support

For any support or inquiries, please contact us:

- **Email**: [support@epic-chain.org](mailto:support@epic-chain.org)

## Roadmap

The following features are planned for future releases:

- **Enhanced wallet security** with multi-signature support.
- **Expanded RPC functionality** for greater interaction with EpicChain nodes.
- **Advanced smart contract features** including contract creation and event monitoring.
- **Support for more token standards** to interact with a wider range of tokens.

Stay tuned for more updates as we continue to improve the `epicvault-core` package.

## Contact

For more information about EpicChain and EpicVault, visit the official website:

- **Website**: [epic-chain.org](https://epic-chain.org)
- **Twitter**: [@EpicChain](https://twitter.com/EpicChainLabs)
