
<h1 align="center">EpicVault JS</h1>

<p align="center">
  <strong>EpicVault JavaScript SDK</strong>
</p>

# Overview

EpicVault JS is a sophisticated and robust JavaScript SDK crafted for seamless interaction with the EpicChain blockchain platform. This library empowers developers with a lightweight and efficient framework to integrate EpicChain (XPR) and EpicPulse (XPP) functionalities into their web applications and decentralized applications (dApps). 

EpicVault JS is designed to simplify complex blockchain interactions and streamline the development process, providing a comprehensive suite of tools for building cutting-edge blockchain solutions. The library is used by various applications and tools within the EpicChain ecosystem, serving as a fundamental component for blockchain developers and enthusiasts alike.

For in-depth guidance on leveraging EpicVault JS, explore our detailed [documentation](https://docs.epicchain.org/epicvault-js/index.html). This resource includes extensive tutorials, API references, and best practices to help you get the most out of our SDK.

> **Note:** For those specifically focused on decentralized application development, we highly recommend exploring our [EpicVault DappKit](https://github.com/epicchainlabs/epicvault-dappkit) and [EpicWallet Connect SDK](https://github.com/epicchainlabs/epicwallet-connect-sdk). These tools are optimized for a user-friendly dApp development experience, offering enhanced features tailored to your needs. While EpicVault JS provides a broad range of functionalities, these additional tools may offer better solutions for specific use cases.

# Getting Started

## Installation

EpicVault JS can be easily installed and integrated into your projects. Below are the methods for installation via Node.js and browser.

### Node.js

To install EpicVault JS for use in a Node.js environment, execute the following command:

```bash
npm i @epicchainlabs/epicvault-js
```

This command installs the latest version of EpicVault JS and its dependencies, allowing you to utilize the SDK in your server-side applications or build tools.

### Browser through CDN

For browser-based projects, you can include EpicVault JS via a Content Delivery Network (CDN). Add the following script tag to your HTML file:

```html
<script src="https://unpkg.com/@epicchainlabs/epicvault-js"></script>
```

This method provides a convenient way to access the SDK directly from the browser, without needing to manage local dependencies.

## Usage

Once installed, you can start using EpicVault JS in your project. The following examples demonstrate how to integrate and utilize the library.

### Node.js

In a Node.js environment, you can import and use EpicVault JS as follows:

```js
import {
    default as EpicVault
} from "@epicchainlabs/epicvault-js";

// Create a new account
const account = EpicVault.create.account("XyZ12345ABCDEF");

// Example usage of the account
console.log(account);
```

This snippet demonstrates how to import the SDK, create a new account, and perform operations with it. For more advanced usage, refer to our comprehensive API documentation.

### Browser

For browser-based projects, after including the SDK via the CDN, it will be available as a global object `EpicVault`. Here’s an example of how to use it:

```js
console.log(EpicVault);

// Create a new account
var account = EpicVault.create.account("XyZ12345ABCDEF");

// Example usage of the account
console.log(account);
```

The global `EpicVault` object provides access to all the functionalities of the SDK, enabling you to manage blockchain interactions directly from the browser.

> **Important Note:** For optimal performance and compatibility, we recommend using only `epicvault-js` within your project. Avoid combining `epicvault-js` with other incompatible libraries to prevent conflicts and ensure smooth operation. For further details, see [this issue](https://github.com/epicchainlabs/epicvault-js/issues/850) on GitHub.

# Contributing

We welcome contributions to EpicVault JS from the community. To get involved, please review our [CONTRIBUTING](./CONTRIBUTING.md) guidelines, which provide information on our development practices and how to submit changes.

## Setup

EpicVault JS is maintained as a TypeScript monorepo using Lerna. To set up your development environment, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/epicchainlabs/epicvault-js.git
   cd epicvault-js
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

3. Bootstrap the project and build:

   ```sh
   npm run bootstrap
   npm run build
   ```

The setup process ensures that all dependencies are installed and the project is prepared for development and testing.

## Testing

To ensure the quality and functionality of EpicVault JS, we run a comprehensive suite of tests. Execute the following commands to perform linting, build the project, and run tests:

```sh
npm run lint
npm run build
npm run dist
npm run test:unit
npm run test:integration
```

These commands cover code linting, project building, distribution, and both unit and integration testing.

# Documentation

Our documentation is powered by Docusaurus, a modern documentation site generator. You can find the documentation in the `./docs` directory, while the main website configuration is located in `./website`. To view and edit the documentation, follow these steps:

```sh
cd website
yarn
npm run start
```

This will start a local development server, allowing you to preview changes and ensure that the documentation is up-to-date and accurate.

# License

EpicVault JS is open-source software licensed under the [MIT License](https://github.com/epicchainlabs/epicvault-js/blob/master/LICENSE.md). 

The main author and maintainer of this project is [Your Name](https://github.com/your-github-profile). We extend our gratitude to all contributors and supporters who help improve and advance this library.
