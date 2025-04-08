import { sc, rpc, wallet, u, tx, logging } from "@epicchain/epicvault-core";
import { EpicVaultError } from "@epicchain/epicvault-core";

/**
 * Token management utilities
 */
export const token = {
  /**
   * Get token balance for an address
   */
  async getBalance(
    client: rpc.RPCClient,
    scriptHash: string,
    address: string
  ): Promise<string> {
    try {
      const result = await client.invokeFunction(scriptHash, "balanceOf", [
        sc.ContractParam.address(address),
      ]);
      return result.stack[0].value as string;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get token balance",
        "TOKEN_BALANCE_ERROR",
        error
      );
    }
  },

  /**
   * Get token decimals
   */
  async getDecimals(
    client: rpc.RPCClient,
    scriptHash: string
  ): Promise<number> {
    try {
      const result = await client.invokeFunction(scriptHash, "decimals", []);
      return parseInt(result.stack[0].value as string);
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get token decimals",
        "TOKEN_DECIMALS_ERROR",
        error
      );
    }
  },

  /**
   * Get token symbol
   */
  async getSymbol(
    client: rpc.RPCClient,
    scriptHash: string
  ): Promise<string> {
    try {
      const result = await client.invokeFunction(scriptHash, "symbol", []);
      return result.stack[0].value as string;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get token symbol",
        "TOKEN_SYMBOL_ERROR",
        error
      );
    }
  },

  /**
   * Get token total supply
   */
  async getTotalSupply(
    client: rpc.RPCClient,
    scriptHash: string
  ): Promise<string> {
    try {
      const result = await client.invokeFunction(scriptHash, "totalSupply", []);
      return result.stack[0].value as string;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get token total supply",
        "TOKEN_SUPPLY_ERROR",
        error
      );
    }
  },
};

/**
 * Network utilities
 */
export const network = {
  /**
   * Get network height
   */
  async getHeight(client: rpc.RPCClient): Promise<number> {
    try {
      const response = await client.getBlockCount();
      return response - 1;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get network height",
        "NETWORK_HEIGHT_ERROR",
        error
      );
    }
  },

  /**
   * Get network fee
   */
  async getFee(client: rpc.RPCClient): Promise<{
    networkFee: string;
    systemFee: string;
  }> {
    try {
      const response = await client.getFeePerByte();
      return {
        networkFee: response.networkFee,
        systemFee: response.systemFee,
      };
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get network fee",
        "NETWORK_FEE_ERROR",
        error
      );
    }
  },

  /**
   * Get network version
   */
  async getVersion(client: rpc.RPCClient): Promise<string> {
    try {
      const response = await client.getVersion();
      return response.protocol.version;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get network version",
        "NETWORK_VERSION_ERROR",
        error
      );
    }
  },
};

/**
 * Transaction utilities
 */
export const transaction = {
  /**
   * Calculate transaction fee
   */
  calculateFee(
    tx: tx.Transaction,
    networkFee: string = "0.00001",
    systemFee: string = "0"
  ): string {
    try {
      const size = tx.serialize().length / 2;
      const fee = (
        parseFloat(networkFee) * size +
        parseFloat(systemFee)
      ).toString();
      return fee;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to calculate transaction fee",
        "FEE_CALCULATION_ERROR",
        error
      );
    }
  },

  /**
   * Get transaction history for an address
   */
  async getHistory(
    client: rpc.RPCClient,
    address: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<any[]> {
    try {
      const response = await client.getApplicationLog(address, {
        page,
        pageSize,
      });
      return response;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to get transaction history",
        "HISTORY_ERROR",
        error
      );
    }
  },

  /**
   * Wait for transaction confirmation
   */
  async waitForConfirmation(
    client: rpc.RPCClient,
    txid: string,
    timeout: number = 30000,
    interval: number = 1000
  ): Promise<boolean> {
    try {
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        const status = await client.getTransactionStatus(txid);
        if (status.confirmations > 0) {
          return true;
        }
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
      return false;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to wait for transaction confirmation",
        "CONFIRMATION_ERROR",
        error
      );
    }
  },
};

/**
 * Wallet utilities
 */
export const walletUtils = {
  /**
   * Generate a new wallet
   */
  generate(): wallet.Wallet {
    try {
      const privateKey = wallet.generatePrivateKey();
      const account = new wallet.Account(privateKey);
      return new wallet.Wallet({
        name: "Wallet",
        version: "1.0",
        scrypt: {
          n: 16384,
          r: 8,
          p: 8,
        },
        accounts: [account],
        extra: null,
      });
    } catch (error) {
      throw new EpicVaultError(
        "Failed to generate wallet",
        "WALLET_GENERATION_ERROR",
        error
      );
    }
  },

  /**
   * Import wallet from WIF
   */
  importFromWIF(wif: string): wallet.Wallet {
    try {
      const account = wallet.Account.fromWIF(wif);
      return new wallet.Wallet({
        name: "Wallet",
        version: "1.0",
        scrypt: {
          n: 16384,
          r: 8,
          p: 8,
        },
        accounts: [account],
        extra: null,
      });
    } catch (error) {
      throw new EpicVaultError(
        "Failed to import wallet from WIF",
        "WALLET_IMPORT_ERROR",
        error
      );
    }
  },

  /**
   * Export wallet to WIF
   */
  exportToWIF(wallet: wallet.Wallet, accountIndex: number = 0): string {
    try {
      return wallet.accounts[accountIndex].WIF;
    } catch (error) {
      throw new EpicVaultError(
        "Failed to export wallet to WIF",
        "WALLET_EXPORT_ERROR",
        error
      );
    }
  },
}; 