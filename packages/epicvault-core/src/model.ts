/**
 * Core Models for EpicVault
 */

import { Address, Hash, Amount, Network } from './types';

export interface EpicVaultObject<T> {
  toJSON(): T;
}

/**
 * Base model for all blockchain entities
 */
export abstract class BlockchainEntity {
  protected _network: Network;
  protected _address: Address;

  constructor(network: Network, address: Address) {
    this._network = network;
    this._address = address;
  }

  get network(): Network {
    return this._network;
  }

  get address(): Address {
    return this._address;
  }

  abstract toJSON(): Record<string, any>;
}

/**
 * Wallet model representing a blockchain wallet
 */
export class WalletModel extends BlockchainEntity {
  private _balance: Amount;
  private _nonce: number;

  constructor(network: Network, address: Address, balance: Amount = '0', nonce: number = 0) {
    super(network, address);
    this._balance = balance;
    this._nonce = nonce;
  }

  get balance(): Amount {
    return this._balance;
  }

  get nonce(): number {
    return this._nonce;
  }

  toJSON(): Record<string, any> {
    return {
      network: this._network,
      address: this._address,
      balance: this._balance,
      nonce: this._nonce
    };
  }
}

/**
 * Transaction model representing a blockchain transaction
 */
export class TransactionModel extends BlockchainEntity {
  private _hash: Hash;
  private _from: Address;
  private _to: Address;
  private _amount: Amount;
  private _timestamp: number;
  private _status: 'pending' | 'confirmed' | 'failed';

  constructor(
    network: Network,
    hash: Hash,
    from: Address,
    to: Address,
    amount: Amount,
    timestamp: number,
    status: 'pending' | 'confirmed' | 'failed'
  ) {
    super(network, hash);
    this._hash = hash;
    this._from = from;
    this._to = to;
    this._amount = amount;
    this._timestamp = timestamp;
    this._status = status;
  }

  get hash(): Hash {
    return this._hash;
  }

  get from(): Address {
    return this._from;
  }

  get to(): Address {
    return this._to;
  }

  get amount(): Amount {
    return this._amount;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get status(): 'pending' | 'confirmed' | 'failed' {
    return this._status;
  }

  toJSON(): Record<string, any> {
    return {
      network: this._network,
      hash: this._hash,
      from: this._from,
      to: this._to,
      amount: this._amount,
      timestamp: this._timestamp,
      status: this._status
    };
  }
}
