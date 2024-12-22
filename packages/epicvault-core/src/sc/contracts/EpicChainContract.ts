import { NATIVE_CONTRACT_HASH } from "../../consts";
import { BigInteger, HexString } from "../../u";
import { ContractParam } from "../ContractParam";
import { ContractMethodDefinition } from "../manifest";
import { ContractCall } from "../types";
import { Xep17Contract } from "./Xep17Contract";
import epicchainAbi from "./templates/EpicChainTemplateAbi.json";

let SINGLETON: EpicChainContract;

export class EpicChainContract extends Xep17Contract {
  public static get INSTANCE(): EpicChainContract {
    if (!SINGLETON) {
      SINGLETON = new EpicChainContract();
    }
    return SINGLETON;
  }

  /**
   * The list of methods found on the EpicChain contract.
   */
  public static getMethods(): ContractMethodDefinition[] {
    return epicchainAbi.methods.map((m) => ContractMethodDefinition.fromJson(m));
  }

  constructor() {
    super(NATIVE_CONTRACT_HASH.EpicChain, EpicChainContract.getMethods());
  }

  public unclaimedEpicChain(address: string, end: number | BigInteger): ContractCall {
    return this.call(
      "unclaimedEpicChain",
      ContractParam.hash160(address),
      ContractParam.integer(end)
    );
  }

  public getCandidates(): ContractCall {
    return this.call("getCandidates");
  }

  public getRegisterPrice(): ContractCall {
    return this.call("getRegisterPrice");
  }

  public registerCandidate(publicKey: string | HexString): ContractCall {
    return this.call("registerCandidate", ContractParam.publicKey(publicKey));
  }

  public vote(address: string, voteTo: string | HexString): ContractCall {
    return this.call(
      "vote",
      ContractParam.hash160(address),
      ContractParam.publicKey(voteTo)
    );
  }
}
