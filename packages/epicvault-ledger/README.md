# epicvault-ledger

## Overview

`epicvault-ledger` is a wrapper package that allows you to interact with Ledger hardware wallets for signing transactions and managing keys within the EpicVault ecosystem. It simplifies the communication with Ledger devices, making it easier to integrate hardware wallet functionality into your decentralized applications (dApps) or blockchain services.

This package abstracts the complexities of Ledger interactions, providing straightforward methods to retrieve public keys, sign transactions, and manage BIP44 addresses securely. It's designed for both Node.js and browser environments, depending on the transport library used.

## Installation

To install the `epicvault-ledger` package, you can use npm or yarn. This package relies on other Ledger libraries for device communication. Ensure that you install the appropriate transport library based on your environment:

### Using npm:

```sh
npm install @epicchain/epicvault-node-ledger @epicchain/epicvault-core
```

### Using yarn:

```sh
yarn add @epicchain/epicvault-node-ledger @epicchain/epicvault-core
```

### Transport Libraries

In addition to `epicvault-ledger`, you need to install one of the Ledger transport libraries to facilitate communication with your Ledger device:

- For **Node.js** environment:
  ```sh
  npm install @ledgerhq/hw-transport-node-hid
  ```

- For **Browser** environment:
  ```sh
  npm install @ledgerhq/hw-transport-u2f
  ```

The transport library is used to instantiate the Ledger instance, which is required for interacting with the Ledger device.

## Usage

Once you've installed the necessary packages, you can begin using the `epicvault-ledger` API to interact with your Ledger device.

### Example:

```js
import * as LedgerLibrary from "@ledgerhq/hw-transport-node-hid"; // or the browser transport
import { epicvaultJs } from "epicvault-js";

(async () => {
  const paths = await epicvaultJs.ledger.getDevicePaths(LedgerLibrary);
  const ledgerInstance = await LedgerLibrary.open(paths[0]);

  const bipString = epicvaultJs.ledger.BIP44(1);
  const publicKey = await epicvaultJs.ledger.getPublicKey(ledgerInstance, bipString);

  console.log("Public Key:", publicKey);
})();
```

### Example Breakdown:

1. **Get Device Paths**:
   The `getDevicePaths()` function returns a list of available Ledger devices connected to the machine. This is used to select which device to interact with.

2. **Open Ledger Device**:
   You instantiate the Ledger device using the transport library's `open()` method with the selected path.

3. **Get BIP44 Address**:
   The `BIP44()` method is used to generate a BIP44-compatible address path. By default, it returns `0/0/0`, but you can customize the path for different types of keys or addresses.

4. **Get Public Key**:
   The `getPublicKey()` method retrieves the public key from the Ledger device based on the provided BIP44 path.

### BIP44 Method

The `BIP44()` helper method returns a BIP44-compatible hexstring address path. By default, it uses the path `m/44'/60'/0'/0/0`, but you can customize it by passing a different number. Most commonly, this is used to generate an address based on your required coin type (e.g., Ethereum).

#### Example Usage:

```js
const bipString = epicvaultJs.ledger.BIP44(1);
console.log(bipString); // "m/44'/60'/1'/0/0" for Ethereum-based addresses
```

### getDevicePaths Method

This method returns a list of paths representing the Ledger devices currently connected. Each path can be used to open the corresponding Ledger instance for further interactions.

#### Example Usage:

```js
import * as LedgerLibrary from "@ledgerhq/hw-transport-node-hid";
const paths = await epicvaultJs.ledger.getDevicePaths(LedgerLibrary);
const ledgerInstance = LedgerLibrary.open(paths[0]);
console.log("Ledger device opened:", ledgerInstance);
```

If Ledger is not supported on the device, an error will be thrown.

### getPublicKey Method

This method retrieves the unencoded public key from the Ledger device using the BIP44 path you provide.

#### Example Usage:

```js
const publicKey = await epicvaultJs.ledger.getPublicKey(ledgerInstance, bipString);
console.log("Public Key:", publicKey);
```

### getSignature Method

The `getSignature()` method returns a 64-bit hexstring signature for a transaction. You will need to assemble the witness from the signature when creating the final transaction.

#### Example Usage:

```js
const signature = await epicvaultJs.ledger.getSignature(
    ledgerInstance,
    tx,
    bipString
);
console.log("Transaction Signature:", signature);
```

## API Reference

### BIP44

- **`BIP44(index: number)`**
  Returns the BIP44-compatible address path. By default, `0` is used for the coin type. You can provide a custom index to generate other paths.

#### Example:

```js
const bipString = epicvaultJs.ledger.BIP44(1);
console.log(bipString); // "m/44'/60'/1'/0/0"
```

### getDevicePaths

- **`getDevicePaths(LedgerLibrary)`**
  Returns an array of paths for the connected Ledger devices. You need to call `open()` on the transport library with the selected path to instantiate a Ledger device.

#### Example:

```js
const paths = await epicvaultJs.ledger.getDevicePaths(LedgerLibrary);
const ledgerInstance = await LedgerLibrary.open(paths[0]);
```

### getPublicKey

- **`getPublicKey(ledgerInstance, bipString)`**
  Retrieves the unencoded public key from the Ledger device.

#### Example:

```js
const publicKey = await epicvaultJs.ledger.getPublicKey(ledgerInstance, bipString);
```

### getSignature

- **`getSignature(ledgerInstance, tx, bipString)`**
  Returns the 64-bit signature for the given transaction, allowing you to sign transactions securely on the Ledger device.

#### Example:

```js
const signature = await epicvaultJs.ledger.getSignature(ledgerInstance, tx, bipString);
```

## Contributing

We welcome contributions to `epicvault-ledger`. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests to cover your changes.
4. Submit a pull request with a detailed description of your changes.

### Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

`epicvault-ledger` is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Support

For any issues, inquiries, or support, feel free to reach out to us:

- **Email**: [support@epic-chain.org](mailto:support@epic-chain.org)
- **GitHub Issues**: [https://github.com/epicchainlabs/epicvault-js/issues](https://github.com/epicchainlabs/epicvault-js/issues)

## Contact

For more information about EpicChain and EpicVault, visit the official website:

- **Website**: [epic-chain.org](https://epic-chain.org)
- **Discord**: [EpicChain Discord](https://discord.com/epicchain)
- **Twitter**: [@EpicChain](https://twitter.com/EpicChainLabs)
