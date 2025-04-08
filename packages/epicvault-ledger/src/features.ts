import Transport from "@ledgerhq/hw-transport";
import { u } from "@epicchain/epicvault-core";
import { StatusWord, evalTransportError, TransportStatusError, looksLikeTransportStatusError } from "./ErrorCode";
import { DerToHexSignature } from "./utils";
import { BIP44 } from "./BIP44";

const DEFAULT_STATUSLIST = [StatusWord.OK];

enum Command {
  GET_APP_NAME = 0x00,
  GET_VERSION = 0x01,
  SIGN_TX = 0x02,
  GET_PUBLIC_KEY = 0x04,
  GET_ADDRESS = 0x05,
  SIGN_MESSAGE = 0x06,
  GET_APP_CONFIG = 0x07,
}

/**
 * Ledger device configuration
 */
export interface LedgerConfig {
  timeout?: number;
  retry?: {
    attempts: number;
    delay: number;
  };
}

/**
 * Ledger device information
 */
export interface LedgerInfo {
  name: string;
  version: string;
  deviceId: string;
  path: string;
}

/**
 * Ledger application configuration
 */
export interface AppConfig {
  version: string;
  name: string;
  network: number;
  allowCustomNetwork: boolean;
  allowDebug: boolean;
}

/**
 * Ledger device manager
 */
export class LedgerManager {
  private transport: Transport;
  private config: LedgerConfig;

  constructor(transport: Transport, config: LedgerConfig = {}) {
    this.transport = transport;
    this.config = {
      timeout: config.timeout || 30000,
      retry: config.retry || { attempts: 3, delay: 1000 }
    };
  }

  /**
   * Get device information
   */
  async getDeviceInfo(): Promise<LedgerInfo> {
    try {
      const name = await this.getAppName();
      const version = await this.getAppVersion();
      const deviceId = this.transport.deviceId;
      const path = this.transport.devicePath;
      return { name, version, deviceId, path };
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Get application configuration
   */
  async getAppConfig(): Promise<AppConfig> {
    try {
      const response = await this.transport.send(
        0x80,
        Command.GET_APP_CONFIG,
        0x00,
        0x00,
        undefined,
        DEFAULT_STATUSLIST
      );
      const version = response.readUInt8(0).toString() + "." +
                     response.readUInt8(1).toString() + "." +
                     response.readUInt8(2).toString();
      const name = response.slice(3, 11).toString("ascii");
      const network = response.readUInt32BE(11);
      const flags = response.readUInt8(15);
      return {
        version,
        name,
        network,
        allowCustomNetwork: !!(flags & 0x01),
        allowDebug: !!(flags & 0x02),
      };
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Get address for a BIP44 path
   */
  async getAddress(
    bip44String: string,
    showOnDevice: boolean = false
  ): Promise<string> {
    try {
      const response = await this.transport.send(
        0x80,
        Command.GET_ADDRESS,
        0x00,
        showOnDevice ? 0x01 : 0x00,
        Buffer.from(bip44String, "hex"),
        DEFAULT_STATUSLIST
      );
      return response.toString("ascii").substring(0, 34);
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Sign a message
   */
  async signMessage(
    message: string,
    bip44String: string,
    network: number
  ): Promise<string> {
    try {
      const hexMessage = u.str2hexstring(message);
      await this.sendDataToSign(bip44String, 0);
      await this.sendDataToSign(u.num2hexstring(network, 4, true), 1);

      const chunks = hexMessage.match(/.{1,510}/g) || [];
      for (let i = 0; i < chunks.length - 1; i++) {
        await this.sendDataToSign(chunks[i], 2 + i);
      }
      const response = await this.sendDataToSign(
        chunks[chunks.length - 1],
        2 + chunks.length,
        true
      );

      if (response.length <= 2) {
        throw new Error("No signature returned from device");
      }
      return DerToHexSignature(response.toString("hex"));
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Get public key for a BIP44 path
   */
  async getPublicKey(
    bip44String: string,
    showOnDevice: boolean = false
  ): Promise<string> {
    try {
      const response = await this.transport.send(
        0x80,
        Command.GET_PUBLIC_KEY,
        0x00,
        showOnDevice ? 0x01 : 0x00,
        Buffer.from(bip44String, "hex"),
        DEFAULT_STATUSLIST
      );
      return response.toString("hex").substring(0, 130);
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Get application name
   */
  private async getAppName(): Promise<string> {
    try {
      const response = await this.transport.send(
        0x80,
        Command.GET_APP_NAME,
        0x00,
        0x00,
        undefined,
        DEFAULT_STATUSLIST
      );
      return response.toString("ascii").substring(0, response.length - 2);
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Get application version
   */
  private async getAppVersion(): Promise<string> {
    try {
      const response = await this.transport.send(
        0x80,
        Command.GET_VERSION,
        0x00,
        0x00,
        undefined,
        DEFAULT_STATUSLIST
      );
      const major = response.readUInt8(0);
      const minor = response.readUInt8(1);
      const patch = response.readUInt8(2);
      return `${major}.${minor}.${patch}`;
    } catch (error) {
      if (looksLikeTransportStatusError(error)) {
        throw evalTransportError(error as TransportStatusError);
      }
      throw error;
    }
  }

  /**
   * Send data to sign
   */
  private async sendDataToSign(
    msg: string,
    chunk: number,
    finalChunk: boolean = false
  ): Promise<Buffer> {
    return await this.transport.send(
      0x80,
      Command.SIGN_TX,
      chunk,
      finalChunk ? 0x00 : 0x80,
      Buffer.from(msg, "hex"),
      DEFAULT_STATUSLIST
    );
  }
} 