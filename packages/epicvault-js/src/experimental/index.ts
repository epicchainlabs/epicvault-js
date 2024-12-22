import * as nep17 from "./xep17";
import { SmartContract } from "./contract";
import {
  getSystemFee,
  calculateNetworkFee,
  setBlockExpiry,
  addFees,
  deployContract,
  getContractHash,
} from "./helpers";

const txHelpers = {
  getSystemFee,
  calculateNetworkFee,
  setBlockExpiry,
  addFees,
};

export { nep17, txHelpers, SmartContract, deployContract, getContractHash };
