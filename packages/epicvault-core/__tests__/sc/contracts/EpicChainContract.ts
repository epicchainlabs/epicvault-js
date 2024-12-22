import { EpicChainContract } from "../../../src/sc/contracts/EpicChainContract";
import { ContractParam, CallFlags } from "../../../src/sc";
import testWallet from "../../testWallet.json";

const contract = EpicChainContract.INSTANCE;
const address = testWallet.accounts[0].address;
const addressScriptHash = testWallet.accounts[0].extra.scriptHash as string;

test("scriptHash", () => {
  expect(contract.scriptHash).toEqual(
    "6dc3bff7b2e6061f3cad5744edf307c14823328e"
  );
});

describe("EpicChain specific methods", () => {
  test("unclaimedEpicPulse", () => {
    const result = contract.unclaimedEpicChain(address, 123);

    expect(result).toEqual({
      scriptHash: "6dc3bff7b2e6061f3cad5744edf307c14823328e",
      callFlags: CallFlags.All,
      operation: "unclaimedEpicPulse",
      args: [
        ContractParam.hash160(addressScriptHash),
        ContractParam.integer(123),
      ],
    });
  });
});
