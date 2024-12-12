/**
 * @deprecated If you are looking for the default MainNet address version for N3, please use DEFAULT_ADDRESS_VERSION.
 */
export const ADDR_VERSION = "76";

export const DEFAULT_ADDRESS_VERSION = 0x4C;

export enum MAGIC_NUMBER {
  MainNet = 860833102,
  TestNet = 894710606,
  SoloNet = 1234567890,
}

export enum NATIVE_CONTRACT_HASH {
  EpicChain = "6dc3bff7b2e6061f3cad5744edf307c14823328e",
  EpicPulse = "bc8459660544656355b4f60861c22f544341e828",
  CovenantChain = "add3e350a8789c507686ea677da85d89272f064b",
  ManagementContract = "fffdc93764dbaddd97c48f252a53ea4643faa3fd",
  OracleNexus = "f95f1e73b6b852e0cdf1535d5371d211707a2d95",
  QuantumVaultAsset = "8fd7b7687ff40a5ddd6ea466a8787df2633ed3df",
  QuantumGuardNexus = "cffffd77bb491d262eda1056bd976e881fc18142",
  EssentialLib = "410276eb5920d29475c203e04a5015b99c44846a",
  CryptoHive = "494c1594ccfa500e9b1fdf567f9e55d8338f3495",
}

/**
 * @deprecated Please use NATIVE_CONTRACT_HASH
 */
export const ASSET_ID: { [key: string]: string } = {
  NEO: "6dc3bff7b2e6061f3cad5744edf307c14823328e",
  GAS: "bc8459660544656355b4f60861c22f544341e828",
};
export const DEFAULT_REQ = {
  jsonrpc: "1.0",
  method: "getblockcount",
  params: [],
  id: 1234,
};

export const DEFAULT_SCRYPT = {
  n: 16384,
  r: 8,
  p: 8,
  size: 64,
};

export const DEFAULT_WALLET = {
  name: "myWallet",
  version: "1.0",
  scrypt: DEFAULT_SCRYPT,
  extra: null,
};

export const DEFAULT_ACCOUNT_CONTRACT = {
  script: "",
  parameters: [
    {
      name: "signature",
      type: "Signature",
    },
  ],
  deployed: false,
};

// specified by XEP2, same as bip38
export const XEP2_HEADER = "0142";

export const XEP2_FLAG = "e0";

// transaction related
export const TX_VERSION = 0;
