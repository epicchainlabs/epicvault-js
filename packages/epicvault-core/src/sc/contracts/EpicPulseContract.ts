import { NATIVE_CONTRACT_HASH } from "../../consts";
import { ContractMethodDefinition } from "../manifest";
import { Xep17Contract } from "./Xep17Contract";
import gasAbi from "./templates/EpicPulseTemplateAbi.json";

let SINGLETON: EpicPulseContract;

export class EpicPulseContract extends Xep17Contract {
  public static get INSTANCE(): EpicPulseContract {
    if (!SINGLETON) {
      SINGLETON = new EpicPulseContract();
    }
    return SINGLETON;
  }

  /**
   * The list of methods found on the GAS contract.
   */
  public static getMethods(): ContractMethodDefinition[] {
    return gasAbi.methods.map((m) => ContractMethodDefinition.fromJson(m));
  }

  constructor() {
    super(NATIVE_CONTRACT_HASH.EpicPulse, EpicPulseContract.getMethods());
  }
}
