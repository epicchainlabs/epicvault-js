---
id: installation
title: Installation
---

## Install

To install

```sh
npm install @epicchain/epicvault-js
```

or

```sh
npm install @epicchain/epicvault-core
```

This will give you the release that is compatible for the EpicChain mainnet and testnet.

> **Note**
> For most use-cases, we recommend `epicvault-js`.
> Do not use `epicvault-js` and `epicvault-core`  in the same project.  The classes are not cross-package compatible. See https://github.com/epicchain/epicvault-js/.

## Node

Support policy is to support the maintainence and LTS versions of Node. At the
time of writing, this is:

- Node 12
- Node 14
- Node 16

## Web

Both `epicvault-core` and `epicvault-js` are packaged for the web. Use script tags:

```html
<script src="https://unpkg.com/@epicchain/epicvault-js@next"></script>
```

The library will be loaded under the variable `EpicVault`.
