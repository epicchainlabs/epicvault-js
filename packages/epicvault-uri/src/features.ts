import type { sc } from "@epicchain/epicvault-core";

/**
 * URI intent types
 */
export type UriIntentType = "pay" | "vote" | "contract" | "message";

/**
 * URI parameters
 */
export interface UriParams {
  [key: string]: string;
}

/**
 * Contract call parameters
 */
export interface ContractCallParams {
  scriptHash: string;
  operation: string;
  args: sc.ContractParamJson[];
}

/**
 * Message signing parameters
 */
export interface MessageSignParams {
  message: string;
  network?: number;
}

/**
 * URI builder
 */
export class UriBuilder {
  private scheme: string;
  private intent: UriIntentType;
  private target: string;
  private params: UriParams;

  constructor(scheme: string = "epicchain") {
    this.scheme = scheme;
    this.intent = "pay";
    this.target = "";
    this.params = {};
  }

  /**
   * Set the intent type
   */
  setIntent(intent: UriIntentType): this {
    this.intent = intent;
    return this;
  }

  /**
   * Set the target address or identifier
   */
  setTarget(target: string): this {
    this.target = target;
    return this;
  }

  /**
   * Add a parameter
   */
  addParam(key: string, value: string): this {
    this.params[key] = value;
    return this;
  }

  /**
   * Add multiple parameters
   */
  addParams(params: UriParams): this {
    Object.assign(this.params, params);
    return this;
  }

  /**
   * Build the URI string
   */
  build(): string {
    let uri = `${this.scheme}:`;
    if (this.intent !== "pay") {
      uri += `${this.intent}-`;
    }
    uri += this.target;

    const paramStrings = Object.entries(this.params).map(
      ([key, value]) => `${key}=${value}`
    );
    if (paramStrings.length > 0) {
      uri += `?${paramStrings.join("&")}`;
    }

    return uri;
  }
}

/**
 * Create a payment URI
 */
export function createPaymentUri(
  toAddress: string,
  asset: string,
  amount?: number,
  params?: UriParams
): string {
  const builder = new UriBuilder()
    .setIntent("pay")
    .setTarget(toAddress)
    .addParam("asset", asset);

  if (amount !== undefined) {
    builder.addParam("amount", amount.toString());
  }

  if (params) {
    builder.addParams(params);
  }

  return builder.build();
}

/**
 * Create a voting URI
 */
export function createVotingUri(
  publicKey: string,
  params?: UriParams
): string {
  const builder = new UriBuilder()
    .setIntent("vote")
    .setTarget(publicKey);

  if (params) {
    builder.addParams(params);
  }

  return builder.build();
}

/**
 * Create a contract call URI
 */
export function createContractUri(
  params: ContractCallParams,
  additionalParams?: UriParams
): string {
  const builder = new UriBuilder()
    .setIntent("contract")
    .setTarget(params.scriptHash)
    .addParam("operation", params.operation)
    .addParam("args", JSON.stringify(params.args));

  if (additionalParams) {
    builder.addParams(additionalParams);
  }

  return builder.build();
}

/**
 * Create a message signing URI
 */
export function createMessageUri(
  params: MessageSignParams,
  additionalParams?: UriParams
): string {
  const builder = new UriBuilder()
    .setIntent("message")
    .setTarget(params.message);

  if (params.network !== undefined) {
    builder.addParam("network", params.network.toString());
  }

  if (additionalParams) {
    builder.addParams(additionalParams);
  }

  return builder.build();
}

/**
 * Parse a URI into its components
 */
export function parseUri(uri: string): {
  scheme: string;
  intent: UriIntentType;
  target: string;
  params: UriParams;
} {
  const [scheme, uriBody] = uri.split(":", 2);
  if (!uriBody) {
    throw new Error("URI did not contain anything after scheme");
  }

  const bodyParts = uriBody.split("?", 2);
  const path = bodyParts[0];
  const query = bodyParts.length > 1 ? bodyParts[1] : "";

  const pathParts = path.split("-", 2);
  const intent = pathParts.length === 1 ? "pay" : pathParts[0] as UriIntentType;
  const target = pathParts.length === 1 ? pathParts[0] : pathParts[1];

  const params = query.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=", 2);
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as UriParams);

  return {
    scheme,
    intent,
    target,
    params,
  };
}

/**
 * Validate a URI
 */
export function validateUri(uri: string): boolean {
  try {
    const { scheme, intent, target, params } = parseUri(uri);

    if (scheme !== "epicchain") {
      return false;
    }

    if (!["pay", "vote", "contract", "message"].includes(intent)) {
      return false;
    }

    if (!target) {
      return false;
    }

    switch (intent) {
      case "pay":
        return !!params.asset;
      case "vote":
        return target.length === 66; // Public key length
      case "contract":
        return !!params.operation && !!params.args;
      case "message":
        return !!target;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
} 