import { rpc, sc, tx, u, wallet } from "@epicchain/epicvault-core";
import { getTokenInfos } from "./api";
import { Candidate, getCandidates } from "./api/getCandidates";
import {
  TransactionBuilder,
  TransactionValidator,
  ValidationAttributes,
  ValidationResult,
} from "./transaction";
import { SigningFunction } from "./transaction/signing";
import { logger } from "@epicchain/epicvault-core";
import { EpicVaultError } from "@epicchain/epicvault-core";

export interface NetworkFacadeConfig {
  node: string | rpc.EpicChainServerRpcClient;
  network?: string;
  timeout?: number;
  retry?: {
    attempts: number;
    delay: number;
  };
}

export interface Xep17TransferIntent {
  from: wallet.Account;
  to: string;
  integerAmt?: number | string | u.BigInteger;
  decimalAmt?: number | string;
  contractHash: string;
  data?: string;
}

export interface signingConfig {
  signingCallback: SigningFunction;
  gasPrice?: string;
  gasLimit?: number;
}

export interface TransactionOptions {
  gasPrice?: string;
  gasLimit?: number;
  nonce?: number;
  chainId?: number;
}

export class NetworkFacade {
  public magicNumber = 0;
  public client: rpc.EpicChainServerRpcClient;
  private config: NetworkFacadeConfig;

  public static async fromConfig(
    config: NetworkFacadeConfig
  ): Promise<NetworkFacade> {
    const i = new NetworkFacade(config);
    await i.initialize();
    return i;
  }

  private constructor(config: NetworkFacadeConfig) {
    this.config = {
      ...config,
      timeout: config.timeout || 30000,
      retry: config.retry || { attempts: 3, delay: 1000 }
    };
    this.client =
      typeof config.node === "string"
        ? new rpc.EpicChainServerRpcClient(config.node)
        : config.node;
  }

  async initialize(): Promise<void> {
    try {
      const response = await this.client.getVersion();
      this.magicNumber = response.protocol.network;
      logger.info(`Initialized NetworkFacade with network ${this.magicNumber}`);
    } catch (error) {
      throw new EpicVaultError(
        'Failed to initialize NetworkFacade',
        'INIT_ERROR',
        error
      );
    }
  }

  public getRpcNode(): rpc.EpicChainServerRpcClient {
    return this.client;
  }

  /**
   * Constructs and executes a transaction of multiple token transfers
   */
  public async transferToken(
    intents: Xep17TransferIntent[],
    config: signingConfig
  ): Promise<string> {
    try {
      const client = this.getRpcNode();
      const txBuilder = new TransactionBuilder();

      for (const intent of intents) {
        if (intent.decimalAmt) {
          const [tokenInfo] = await getTokenInfos([intent.contractHash], client);
          const amt = u.BigInteger.fromDecimal(
            intent.decimalAmt,
            tokenInfo.decimals
          );
          txBuilder.addXep17Transfer(
            intent.from,
            intent.to,
            intent.contractHash,
            amt
          );
        } else if (intent.integerAmt) {
          txBuilder.addXep17Transfer(
            intent.from,
            intent.to,
            intent.contractHash,
            intent.integerAmt
          );
        } else {
          throw new EpicVaultError('No amount specified', 'INVALID_AMOUNT');
        }
      }

      const txn = txBuilder.build();
      const validateResult = await this.validate(txn);

      if (!validateResult.valid) {
        throw new EpicVaultError(
          'Transaction validation failed',
          'VALIDATION_ERROR',
          validateResult
        );
      }

      const signedTxn = await this.sign(txn, config);
      const sendResult = await this.getRpcNode().sendRawTransaction(signedTxn);
      return sendResult;
    } catch (error) {
      throw new EpicVaultError(
        'Failed to transfer tokens',
        'TRANSFER_ERROR',
        error
      );
    }
  }

  /**
   * Claims all the gas available for the specified account
   */
  public async claimGas(
    acct: wallet.Account,
    config: signingConfig
  ): Promise<string> {
    try {
      const txn = TransactionBuilder.newBuilder().addGasClaim(acct).build();
      const validateResult = await this.validate(txn);

      if (!validateResult.valid) {
        throw new EpicVaultError(
          'Gas claim validation failed',
          'VALIDATION_ERROR',
          validateResult
        );
      }

      const signedTxn = await this.sign(txn, config);
      const sendResult = await this.getRpcNode().sendRawTransaction(signedTxn);
      return sendResult;
    } catch (error) {
      throw new EpicVaultError(
        'Failed to claim gas',
        'CLAIM_GAS_ERROR',
        error
      );
    }
  }

  /**
   * Get list of candidates
   */
  public async getCandidates(): Promise<Candidate[]> {
    try {
      return await getCandidates(this.getRpcNode());
    } catch (error) {
      throw new EpicVaultError(
        'Failed to get candidates',
        'GET_CANDIDATES_ERROR',
        error
      );
    }
  }

  /**
   * Vote for a candidate
   */
  public async vote(
    acct: wallet.Account,
    candidatePublicKey: string,
    config: signingConfig
  ): Promise<string> {
    try {
      const txn = TransactionBuilder.newBuilder()
        .addVote(acct, candidatePublicKey)
        .build();

      const validateResult = await this.validate(txn);

      if (!validateResult.valid) {
        throw new EpicVaultError(
          'Vote validation failed',
          'VALIDATION_ERROR',
          validateResult
        );
      }

      const signedTxn = await this.sign(txn, config);
      const sendResult = await this.getRpcNode().sendRawTransaction(signedTxn);
      return sendResult;
    } catch (error) {
      throw new EpicVaultError(
        'Failed to vote',
        'VOTE_ERROR',
        error
      );
    }
  }

  /**
   * Validate a transaction
   */
  public async validate(txn: tx.Transaction): Promise<ValidationResult> {
    try {
      const validator = new TransactionValidator(this.getRpcNode(), txn);
      return await validator.validate(
        ValidationAttributes.All,
        ValidationAttributes.All
      );
    } catch (error) {
      throw new EpicVaultError(
        'Failed to validate transaction',
        'VALIDATION_ERROR',
        error
      );
    }
  }

  /**
   * Sign a transaction
   */
  public async sign(
    txn: tx.Transaction,
    config: signingConfig
  ): Promise<tx.Transaction> {
    try {
      for (const [idx, w] of txn.witnesses.entries()) {
        const signature = await config.signingCallback(txn, {
          network: this.magicNumber,
          witnessIndex: idx,
        });

        const invocationScript = new sc.OpToken(
          sc.OpCode.PUSHDATA1,
          signature
        ).toScript();
        w.invocationScript = u.HexString.fromHex(invocationScript);
      }

      return txn;
    } catch (error) {
      throw new EpicVaultError(
        'Failed to sign transaction',
        'SIGNING_ERROR',
        error
      );
    }
  }

  /**
   * Invoke a contract function
   */
  public async invoke(
    contractCall: sc.ContractCall,
    options?: TransactionOptions
  ): Promise<rpc.InvokeResult> {
    try {
      return await this.getRpcNode().invokeFunction(
        contractCall.scriptHash,
        contractCall.operation,
        contractCall.args,
        options
      );
    } catch (error) {
      throw new EpicVaultError(
        'Failed to invoke contract',
        'INVOKE_ERROR',
        error
      );
    }
  }

  /**
   * Get transaction status
   */
  public async getTransactionStatus(hash: string): Promise<any> {
    try {
      return await this.getRpcNode().getTransactionStatus(hash);
    } catch (error) {
      throw new EpicVaultError(
        'Failed to get transaction status',
        'TX_STATUS_ERROR',
        error
      );
    }
  }

  /**
   * Get block information
   */
  public async getBlock(blockNumber: number): Promise<any> {
    try {
      return await this.getRpcNode().getBlock(blockNumber);
    } catch (error) {
      throw new EpicVaultError(
        'Failed to get block',
        'GET_BLOCK_ERROR',
        error
      );
    }
  }

  /**
   * Get account balance
   */
  public async getBalance(address: string): Promise<any> {
    try {
      return await this.getRpcNode().getBalance(address);
    } catch (error) {
      throw new EpicVaultError(
        'Failed to get balance',
        'GET_BALANCE_ERROR',
        error
      );
    }
  }
}
