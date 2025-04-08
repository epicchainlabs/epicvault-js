/**
 * Core Type Definitions for EpicVault
 */

// Basic Types
export type Address = string;
export type Hash = string;
export type Amount = string | number;
export type Network = 'mainnet' | 'testnet' | 'devnet';
export type ChainId = number;
export type TokenSymbol = string;
export type TokenAddress = Address;

// Wallet Types
export interface WalletConfig {
  network: Network;
  address: Address;
  privateKey?: string;
  publicKey?: string;
  chainId?: ChainId;
  mnemonic?: string;
  derivationPath?: string;
}

export interface WalletInfo {
  address: Address;
  balance: Amount;
  nonce: number;
  network: Network;
  tokens?: TokenBalance[];
  isContract?: boolean;
  lastActivity?: number;
}

export interface TokenBalance {
  symbol: TokenSymbol;
  address: TokenAddress;
  balance: Amount;
  decimals: number;
}

// Transaction Types
export interface Transaction {
  hash: Hash;
  from: Address;
  to: Address;
  amount: Amount;
  nonce: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: number;
  gasPrice?: Amount;
  blockNumber?: number;
  blockHash?: Hash;
  input?: string;
  value?: Amount;
  tokenTransfers?: TokenTransfer[];
}

export interface TokenTransfer {
  token: TokenAddress;
  from: Address;
  to: Address;
  amount: Amount;
  symbol: TokenSymbol;
}

export interface TransactionConfig {
  from: Address;
  to: Address;
  amount: Amount;
  nonce?: number;
  gasLimit?: number;
  gasPrice?: Amount;
  data?: string;
  chainId?: ChainId;
  token?: TokenAddress;
}

// Smart Contract Types
export interface ContractConfig {
  address: Address;
  abi: any[];
  bytecode?: string;
  name?: string;
  version?: string;
  network?: Network;
}

export interface ContractMethod {
  name: string;
  inputs: any[];
  outputs: any[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
  payable?: boolean;
  constant?: boolean;
}

export interface ContractEvent {
  name: string;
  inputs: any[];
  anonymous: boolean;
}

// RPC Types
export interface RPCConfig {
  url: string;
  network: Network;
  timeout?: number;
  headers?: Record<string, string>;
  retry?: {
    attempts: number;
    delay: number;
  };
}

export interface RPCResponse<T> {
  id: number;
  jsonrpc: string;
  result: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// Block Types
export interface Block {
  number: number;
  hash: Hash;
  parentHash: Hash;
  nonce: string;
  sha3Uncles: Hash;
  logsBloom: string;
  transactionsRoot: Hash;
  stateRoot: Hash;
  receiptsRoot: Hash;
  miner: Address;
  difficulty: string;
  totalDifficulty: string;
  size: number;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  transactions: Transaction[];
  uncles: Hash[];
}

// Token Types
export interface TokenInfo {
  address: TokenAddress;
  symbol: TokenSymbol;
  name: string;
  decimals: number;
  totalSupply: Amount;
  owner?: Address;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: Amount;
  owner?: Address;
  icon?: string;
  website?: string;
  description?: string;
}

// Event Types
export interface EventFilter {
  address?: Address;
  topics?: (string | string[])[];
  fromBlock?: number | 'latest' | 'pending' | 'earliest';
  toBlock?: number | 'latest' | 'pending' | 'earliest';
}

export interface EventLog {
  address: Address;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: Hash;
  transactionIndex: number;
  blockHash: Hash;
  logIndex: number;
  removed: boolean;
}

// Utility Types
export type Callback<T> = (error: Error | null, result?: T) => void;
export type AsyncResult<T> = Promise<T>;
export type EventHandler = (event: EventLog) => void;

// Event Types
export interface EventEmitter {
  on(event: string, listener: (...args: any[]) => void): this;
  once(event: string, listener: (...args: any[]) => void): this;
  off(event: string, listener: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): boolean;
  removeAllListeners(event?: string): this;
}

// Error Types
export class EpicVaultError extends Error {
  constructor(message: string, public code?: string, public data?: any) {
    super(message);
    this.name = 'EpicVaultError';
  }
}

export interface ErrorResponse {
  code: string;
  message: string;
  data?: any;
}

/**
 * Interfaces of common objects used in the blockchain but is not implemented in the SDK.
 */

export interface BlockHeaderJson {
  hash: string;
  size: number;
  version: number;
  previousblockhash: string;
  merkleroot: string;
  time: number;

  /** Random hexstring used for uniqueness. */
  nonce: string;
  index: number;
  nextconsensus: string;
  witnesses: import("./tx/components/Witness").WitnessJson[];
  confirmations: number;
  nextblockhash: string;
}

export interface BlockJson extends BlockHeaderJson {
  primary: number;
  tx: import("./tx/transaction").TransactionJson[];
}

export interface Validator {
  publickey: string;
  /** Stringified number */
  votes: string;
  active: boolean;
}
