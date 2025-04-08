/**
 * RPC Client functionality for EpicVault
 */

import { RPCConfig, RPCResponse, Network, Block, Transaction, Address, Amount } from './types';
import { logger } from './logging';
import { EpicVaultError } from './types';

export class RPCClient {
  private idCounter: number = 0;
  private config: RPCConfig;

  constructor(config: RPCConfig) {
    this.config = {
      ...config,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };
  }

  /**
   * Make an RPC call
   */
  private async call<T>(method: string, params: any[] = []): Promise<T> {
    const id = ++this.idCounter;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };

    try {
      const response = await fetch(this.config.url, {
        method: 'POST',
        headers: this.config.headers,
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(this.config.timeout!)
      });

      if (!response.ok) {
        throw new EpicVaultError(
          `RPC call failed with status ${response.status}`,
          'RPC_ERROR',
          { status: response.status }
        );
      }

      const data: RPCResponse<T> = await response.json();

      if (data.error) {
        throw new EpicVaultError(
          data.error.message,
          'RPC_ERROR',
          data.error
        );
      }

      return data.result;
    } catch (error) {
      if (error instanceof Error) {
        throw new EpicVaultError(
          `RPC call failed: ${error.message}`,
          'RPC_ERROR',
          error
        );
      }
      throw error;
    }
  }

  /**
   * Get the current network
   */
  public getNetwork(): Network {
    return this.config.network;
  }

  /**
   * Get the latest block number
   */
  public async getBlockNumber(): Promise<number> {
    return this.call<number>('eth_blockNumber');
  }

  /**
   * Get block by number
   */
  public async getBlockByNumber(blockNumber: number): Promise<Block> {
    return this.call<Block>('eth_getBlockByNumber', [blockNumber, true]);
  }

  /**
   * Get transaction by hash
   */
  public async getTransactionByHash(hash: string): Promise<Transaction> {
    return this.call<Transaction>('eth_getTransactionByHash', [hash]);
  }

  /**
   * Get balance of an address
   */
  public async getBalance(address: Address): Promise<Amount> {
    return this.call<Amount>('eth_getBalance', [address, 'latest']);
  }

  /**
   * Get transaction count of an address
   */
  public async getTransactionCount(address: Address): Promise<number> {
    return this.call<number>('eth_getTransactionCount', [address, 'latest']);
  }

  /**
   * Send a raw transaction
   */
  public async sendRawTransaction(signedTx: string): Promise<string> {
    return this.call<string>('eth_sendRawTransaction', [signedTx]);
  }

  /**
   * Get transaction receipt
   */
  public async getTransactionReceipt(hash: string): Promise<any> {
    return this.call<any>('eth_getTransactionReceipt', [hash]);
  }

  /**
   * Get gas price
   */
  public async getGasPrice(): Promise<Amount> {
    return this.call<Amount>('eth_gasPrice');
  }

  /**
   * Estimate gas for a transaction
   */
  public async estimateGas(tx: any): Promise<number> {
    return this.call<number>('eth_estimateGas', [tx]);
  }

  /**
   * Get code at an address
   */
  public async getCode(address: Address): Promise<string> {
    return this.call<string>('eth_getCode', [address, 'latest']);
  }

  /**
   * Call a contract method
   */
  public async callContract(to: Address, data: string): Promise<string> {
    return this.call<string>('eth_call', [{ to, data }, 'latest']);
  }

  /**
   * Get logs
   */
  public async getLogs(filter: any): Promise<any[]> {
    return this.call<any[]>('eth_getLogs', [filter]);
  }

  /**
   * Get chain ID
   */
  public async getChainId(): Promise<number> {
    return this.call<number>('eth_chainId');
  }

  /**
   * Get network version
   */
  public async getNetworkVersion(): Promise<string> {
    return this.call<string>('net_version');
  }

  /**
   * Check if the node is syncing
   */
  public async isSyncing(): Promise<boolean | any> {
    return this.call<boolean | any>('eth_syncing');
  }
} 