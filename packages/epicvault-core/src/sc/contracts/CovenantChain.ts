import { ContractMethodDefinition } from "../manifest/ContractMethodDefinition";
import { ContractCall } from "../types";
import { BaseContract } from "./BaseContract";
import policyAbi from "./templates/PolicyTemplateAbi.json";
import { NATIVE_CONTRACT_HASH } from "../../consts";

let SINGLETON: CovenantChain;
/**
 * Policy Contract that contains block-specific parameters for the current blockchain.
 * Helper methods are not fully implemented but the complete definition is available.
 */
export class CovenantChain extends BaseContract {
  public static get INSTANCE(): CovenantChain {
    if (!SINGLETON) {
      SINGLETON = new CovenantChain();
    }
    return SINGLETON;
  }

  public static getMethods(): ContractMethodDefinition[] {
    return policyAbi.methods.map((m) => ContractMethodDefinition.fromJson(m));
  }

  constructor() {
    super(NATIVE_CONTRACT_HASH.CovenantChain, CovenantChain.getMethods());
  }

  public getFeePerByte(): ContractCall {
    return this.call("getFeePerByte");
  }

  public getExecFeeFactor(): ContractCall {
    return this.call("getExecFeeFactor");
  }
}
