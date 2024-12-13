# epicvault-js

## Overview

`epicvault-js` is a high-level JavaScript package designed to provide an easy-to-use API for interacting with the EpicVault ecosystem. Built using the core and API layers of the EpicVault platform (`epicvault-core` and `epicvault-api`), this package provides developers with a simple interface for building decentralized applications (dApps) and integrating with the EpicChain blockchain.

It exposes a semantic API binding for beginner-friendly usage, which abstracts the complexity of working directly with the underlying components. This makes it easier for developers to get started with EpicVault while maintaining flexibility for more advanced interactions.

## Installation

To install `epicvault-js` into your JavaScript or TypeScript project, you can use either npm or yarn:

### Using npm:

```sh
npm install epicvault-js
```

### Using yarn:

```sh
yarn add epicvault-js
```

## Setup

Once installed, you can import the package and use the semantic API to perform various operations such as creating wallets, signing transactions, interacting with smart contracts, and more.

### Example:

```javascript
const Neon = require("epicchainlabs/epicvault-js");

console.log(Neon);
// Output: {wallet, tx, api, nep5, etc...}

const EpicVaultJs = Neon.default;

console.log(EpicVaultJs);
// Output: {create, get, sign, verify, ...}
```

The `Neon` object exposes various modules such as `wallet`, `tx`, `api`, `nep5`, and more, providing all the tools needed for developers to interact with the EpicVault ecosystem.

### Available API Methods

The semantic API in `epicvault-js` follows a convention of `Verb-EpicVault`. Any extra words beyond the first two are collapsed into the EpicVault and camelcased.

For example:

```javascript
EpicVaultJs.create.stringStream("1234");
EpicVaultJs.encrypt.privateKey("key");
```

The API methods are intuitive and follow the standard naming conventions of verbs such as `create`, `get`, `sign`, and `verify`.

## Key Features

`epicvault-js` provides a wide range of functionality:

- **Wallet Creation & Management**: Easily create and manage wallets for storing private keys and interacting with the blockchain.
- **Transaction Handling**: Build, sign, and broadcast transactions on the EpicChain network.
- **Smart Contract Interaction**: Deploy and interact with smart contracts using the high-level API.
- **Encryption & Security**: Tools for secure key handling and encryption.
- **Utility Functions**: Includes various helper functions for tasks like string manipulation, number conversion, and data formatting.

## Detailed Example

Here is an example of how you can use `epicvault-js` to create a wallet and sign a transaction:

### Creating a Wallet and Signing a Transaction

```javascript
const Neon = require("epicchainlabs/epicvault-js");

const EpicVaultJs = Neon.default;

// Create a new wallet
const wallet = EpicVaultJs.create.wallet();
console.log("Wallet Address:", wallet.address);

// Create a new transaction
const tx = EpicVaultJs.create.transaction({
  from: wallet.address,
  to: "0xReceiverAddress",
  amount: "1000",
  token: "XPR",
});

// Sign the transaction with the wallet
const signedTx = EpicVaultJs.sign.transaction(tx, wallet.privateKey);
console.log("Signed Transaction:", signedTx);

// Broadcast the transaction (assuming broadcasting function exists)
EpicVaultJs.tx.broadcast(signedTx).then((txHash) => {
  console.log("Transaction Broadcasted:", txHash);
}).catch((error) => {
  console.error("Transaction Failed:", error);
});
```

### Encrypting and Decrypting Data

You can also use the `encrypt` module to securely manage private keys or any sensitive information:

```javascript
const EpicVaultJs = Neon.default;

// Encrypt a private key
const encryptedKey = EpicVaultJs.encrypt.privateKey("yourPrivateKeyHere");
console.log("Encrypted Key:", encryptedKey);

// Decrypt the private key (assuming the key is encrypted with a specific method)
const decryptedKey = EpicVaultJs.decrypt.privateKey(encryptedKey);
console.log("Decrypted Key:", decryptedKey);
```

## API Reference

Here are the key modules available in the semantic API:

### **wallet**

- `create.wallet()`: Creates a new wallet.
- `get.wallet()`: Retrieves an existing wallet by its address or private key.
- `sign.transaction(tx, privateKey)`: Signs a transaction using a private key.

### **tx (Transaction)**

- `create.transaction(details)`: Creates a new transaction with the specified details.
- `broadcast(tx)`: Broadcasts a signed transaction to the network.

### **api**

- `get.balance(address)`: Retrieves the balance of an address.
- `get.transaction(txHash)`: Fetches a transaction by its hash.

### **nep5**

- `create.token(address)`: Interacts with a NEP-5 token contract.

### **encrypt**

- `encrypt.privateKey(privateKey)`: Encrypts a private key for secure storage.
- `decrypt.privateKey(encryptedKey)`: Decrypts a private key.

### **sign**

- `sign.message(message, privateKey)`: Signs a message with a private key.
- `verify.signature(message, signature, publicKey)`: Verifies the signature of a message.

### **utils (Utilities)**

- `utils.encodeBase58(data)`: Encodes data in Base58 format.
- `utils.decodeBase58(data)`: Decodes data from Base58 format.

## Roadmap

Future features for `epicvault-js` include:

- **Enhanced Wallet Security**: Support for multi-signature wallets and hardware wallet integration.
- **Expanded Smart Contract Interaction**: Support for more contract standards and features like contract deployment.
- **Improved RPC functionality**: More efficient and feature-rich interactions with EpicChain nodes.

## Contributing

We welcome contributions to `epicvault-js`. If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests to cover your changes.
4. Submit a pull request with a detailed description of your changes.

### Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

`epicvault-js` is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Support

For any issues, inquiries, or support, feel free to reach out to us:

- **Email**: [support@epic-chain.org](mailto:support@epic-chain.org)
- **GitHub Issues**: [https://github.com/epicchainlabs/epicvault-js/issues](https://github.com/epicchainlabs/epicvault-js/issues)

## Contact

For more information about EpicChain and EpicVault, visit the official website:

- **Website**: [epic-chain.org](https://epic-chain.org)
- **Twitter**: [@EpicChain](https://twitter.com/EpicChainLabs)
```

This extended `README.md` includes detailed usage examples, an API reference, and setup instructions to guide developers through using the `epicvault-js` package. You can adjust the links, names, and details based on your actual repository and contact information.
