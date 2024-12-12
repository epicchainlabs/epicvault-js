import { rpc, CONST, wallet } from "@cityofzion/neon-core";
import * as TestHelpers from "../../../../testHelpers";
import testWalletJson from "../../../neon-core/__tests__/testWallet.json";

import { getTokenBalances } from "../../src/api/getTokenBalances";

let client: rpc.NeoServerRpcClient;
const address = testWalletJson.accounts[0].address;

beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.NeoServerRpcClient(url);
}, 20000);

describe("getTokenBalances", () => {
  test("EpicChain & EpicPulse (some balance)", async () => {
    const neoScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicChain;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicPulse;
    const result = await getTokenBalances(
      address,
      [neoScriptHash, gasScriptHash],
      client
    );
    expect(result).toStrictEqual([expect.any(String), expect.any(String)]);
    expect(parseInt(result[0])).toBeGreaterThan(0);
    expect(parseInt(result[1])).toBeGreaterThan(0);
  });

  test("EpicChain & EpicPulse (empty)", async () => {
    const neoScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicChain;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicPulse;
    const result = await getTokenBalances(
      new wallet.Account().address,
      [neoScriptHash, gasScriptHash],
      client
    );
    expect(result).toStrictEqual(["0", "0.00000000"]);
  });
});
