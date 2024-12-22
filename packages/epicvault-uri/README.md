# EpicVault URI Parser

## Overview

`epicvault-uri` is a robust package that provides a way to parse, validate, and generate URIs compliant with the XEP-9 standard for the EpicChain ecosystem. These URIs enable interoperability across dApps, wallets, and other blockchain-enabled platforms by supporting a structured and flexible URI schema.

While XEP-9 defines the standard for EpicChain, this package extends it by introducing a relaxed interpretation and additional features to accommodate modern blockchain use cases. With this package, developers can easily handle various intents, such as token transfers, voting, and other custom functionalities within the EpicChain ecosystem.

## URI Schema

The URI format is:

```
epicchain:[?<usecase>-]<targetIdentifier>[?<key>=<value>]
```

### Components:
1. **`usecase`** *(Optional)*: A prefix indicating the intent or action.
2. **`targetIdentifier`**: The target address, key, or identifier for the intent.
3. **Query Parameters**: Key-value pairs providing additional details for the action.

### Supported Use Cases:

#### 1. Token Transfer (Default Intent)
Token transfers are the default intent when no `usecase` is specified.

**Format:**
```
epicchain:[?pay-]<toAddress>?asset=<contractHash>&amount=<amount>
```

- **Parameters:**
  | Parameter      | Description                                |
  |---------------|--------------------------------------------|
  | `toAddress`    | The recipient's EpicChain wallet address. |
  | `contractHash` | Token identifier (e.g., `epicchain`, `epicpulse`, or custom hash). |
  | `amount`       | (Optional) The amount of the token to transfer. |

**Example:**
To request 1 EpicPulse token to `XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R`:
```
epicchain:XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R?asset=epicpulse&amount=100000000
```

---

#### 2. Voting Intent
Vote requests enable users to cast votes for specific candidates using their public keys.

**Format:**
```
epicchain:vote-<candidatePublicKey>
```

- **Parameters:**
  | Parameter           | Description                                    |
  |---------------------|------------------------------------------------|
  | `candidatePublicKey`| The candidate's public key for the vote.       |

**Example:**
To vote for the candidate with public key `02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef`:
```
epicchain:vote-02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef
```

---

## Installation

### Using npm:
Install the `epicvault-uri` package along with `epicvault-core`:

```sh
npm install @epicchain/epicvault-uri @epicchain/epicvault-core
```

### Importing:
Use the package in your project:

```js
const uri = require("@epicchain/epicvault-uri");
```

---

## API Documentation

### Parsing URIs
The `parse` method extracts intent and relevant details from a given EpicChain URI string, returning a structured intent object.

#### Syntax:
```js
const intent = uri.parse("<epicchain-uri>");
```

#### Example:
```js
const intent = uri.parse(
  "epicchain:XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R?asset=epicpulse&amount=100000000"
);
```

#### Output:
```js
{
  intent: "pay",
  description: "Transfer 100000000 EpicPulse to XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R",
  contractCall: {
    scriptHash: "d2a4cff31913016155e38e474a2c06d08be276cf",
    operation: "transfer",
    args: [
      {
        type: "Hash160",
        value: "" // Sender address placeholder.
      },
      {
        type: "Hash160",
        value: "XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R"
      },
      {
        type: "Integer",
        value: "100000000"
      }
    ]
  }
}
```

#### Notes:
- Assets like `epicchain` and `epicpulse` are automatically resolved to their respective script hashes.
- The parser does not perform runtime validation (e.g., verifying address validity).

---

### URI Creation Helpers
The package provides utility methods for quickly generating compliant URIs for common intents.

#### 1. Creating a Payment URI
```js
const payUri = uri.createPayUri(toAddress, asset, amount);
```

**Parameters:**
- `toAddress` *(String)*: Recipient's wallet address.
- `asset` *(String)*: Asset name or contract hash.
- `amount` *(Integer)*: Amount to transfer.

**Example:**
```js
const payUri = uri.createPayUri("XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R", "epicpulse", 100000000);
```

**Output:**
```
epicchain:XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R?asset=epicpulse&amount=100000000
```

#### 2. Creating a Vote URI
```js
const voteUri = uri.createVoteUri(candidatePublicKey);
```

**Parameters:**
- `candidatePublicKey` *(String)*: Public key of the candidate to vote for.

**Example:**
```js
const voteUri = uri.createVoteUri("02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef");
```

**Output:**
```
epicchain:vote-02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef
```

---

## Advanced Usage

### Validating Addresses
Though the package does not natively validate wallet addresses, it is recommended to use `epicvault-core` or a similar library to ensure address validity before performing operations.

### Extending Use Cases
Developers can extend the package to handle custom intents by parsing URIs and implementing additional logic to process the `intent` object.

---

## Examples

### Parsing a Token Request URI
```js
const uri = require("@epicchain/epicvault-uri");
const tokenUri = "epicchain:XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R?asset=epicpulse&amount=100000000";

const parsedIntent = uri.parse(tokenUri);
console.log(parsedIntent);
```

### Generating a Payment Request
```js
const uri = require("@epicchain/epicvault-uri");
const payUri = uri.createPayUri("XjqCTDkSD1E7csjZZcRC82YAEv7hAckt3R", "epicpulse", 100000000);

console.log(payUri);
```

---

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Write tests for your changes.
4. Submit a pull request.

---

## License
This package is licensed under the MIT License. See the `LICENSE` file for details.

---

## Resources
- [EpicChain Documentation](https://epic-chain.org/)

