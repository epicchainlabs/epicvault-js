/* eslint-disable @typescript-eslint/no-explicit-any */
import * as api from "@cityofzion/neon-api";
import * as epicvaultCore from "@epicchain/epicvault-core";
import * as experimental from "./experimental";
import * as features from "./features";

const { sc, rpc, wallet, CONST, u, tx, logging } = epicvaultCore;

/**
 * Semantic path for creation of a resource.
 */
const create = {
  account: (k: string): epicvaultCore.wallet.Account => new wallet.Account(k),
  privateKey: wallet.generatePrivateKey,
  signature: wallet.generateSignature,
  wallet: (k: epicvaultCore.wallet.WalletJSON): epicvaultCore.wallet.Wallet =>
    new wallet.Wallet(k),
  contractParam: (
    type: keyof typeof sc.ContractParamType,
    value?:
      | string
      | number
      | boolean
      | epicvaultCore.sc.ContractParamJson[]
      | null
      | undefined
  ): epicvaultCore.sc.ContractParam => sc.ContractParam.fromJson({ type, value }),
  script: sc.createScript,
  scriptBuilder: (): epicvaultCore.sc.ScriptBuilder => new sc.ScriptBuilder(),
  rpcClient: (net: string): epicvaultCore.rpc.RPCClient => new rpc.RPCClient(net),
  query: (
    req: epicvaultCore.rpc.QueryLike<unknown[]>
  ): epicvaultCore.rpc.Query<unknown[], unknown> => new rpc.Query(req),
  network: (net: Partial<epicvaultCore.rpc.NetworkJSON>): epicvaultCore.rpc.Network =>
    new rpc.Network(net),
  stringStream: (str?: string): epicvaultCore.u.StringStream =>
    new u.StringStream(str),
};

/**
 * Semantic path for verification of a type.
 */
const is = {
  address: wallet.isAddress,
  publicKey: wallet.isPublicKey,
  encryptedKey: wallet.isXEP2,
  privateKey: wallet.isPrivateKey,
  wif: wallet.isWIF,
  scriptHash: wallet.isScriptHash,
};

/**
 * Semantic path for deserialization of object.
 */
const deserialize = {
  attribute: tx.TransactionAttribute.deserialize,
  script: tx.Witness.deserialize,
  tx: tx.Transaction.deserialize,
};

/**
 * Semantic path for signing using private key.
 */
const sign = {
  hex: wallet.sign,
  message: (msg: string, privateKey: string): string => {
    const hex = u.str2hexstring(msg);
    return wallet.sign(hex, privateKey);
  },
};

/**
 * Semantic path for verifying signatures using public key.
 */
const verify = {
  hex: wallet.verify,
  message: (msg: string, sig: string, publicKey: string): boolean => {
    const hex = u.str2hexstring(msg);
    return wallet.verify(hex, sig, publicKey);
  },
};

export default {
  create,
  deserialize,
  is,
  sign,
  verify,
  encrypt: {
    privateKey: wallet.encrypt,
  },
  decrypt: {
    privateKey: wallet.decrypt,
  },
  u,
  CONST,
  experimental,
  features,
};

export {
  experimental,
  api,
  sc,
  rpc,
  wallet,
  CONST,
  u,
  tx,
  logging,
  features,
};
