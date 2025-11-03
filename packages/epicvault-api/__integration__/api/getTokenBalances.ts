import { rpc, CONST, wallet } from "@epicchain/epicvault-core";
import * as TestHelpers from "../../../../testHelpers";
import testWalletJson from "../../../epicvault-core/__tests__/testWallet.json";

import { getTokenBalances } from "../../src/api/getTokenBalances";

let client: rpc.EpicChainServerRpcClient;
const address = testWalletJson.accounts[0].address;

beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.EpicChainServerRpcClient(url);
}, 20000);

describe("getTokenBalances", () => {
  test("EpicChain & EpicPulse (some balance)", async () => {
    const epicchainScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicChain;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicPulse;
    const result = await getTokenBalances(
      address,
      [epicchainScriptHash, gasScriptHash],
      client
    );
    expect(result).toStrictEqual([expect.any(String), expect.any(String)]);
    expect(parseInt(result[0])).toBeGreaterThan(0);
    expect(parseInt(result[1])).toBeGreaterThan(0);
  });

  test("EpicChain & EpicPulse (empty)", async () => {
    const epicchainScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicChain;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicPulse;
    const result = await getTokenBalances(
      new wallet.Account().address,
      [epicchainScriptHash, gasScriptHash],
      client
    );
    expect(result).toStrictEqual(["0", "0.00000000"]);
  });
});
