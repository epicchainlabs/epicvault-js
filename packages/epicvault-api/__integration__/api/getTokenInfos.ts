import { rpc, CONST } from "@epicchain/epicvault-core";
import * as TestHelpers from "../../../../testHelpers";

import { getTokenInfos, TokenInfo } from "../../src/api/getTokenInfos";

let client: rpc.EpicChainServerRpcClient;

beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.EpicChainServerRpcClient(url);
}, 20000);

describe("getTokenInfos", () => {
  test("EpicChain & EpicPulse", async () => {
    const neoScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicChain;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.EpicPulse;
    const result = await getTokenInfos([neoScriptHash, gasScriptHash], client);
    expect(result).toStrictEqual([
      {
        symbol: "NEO",
        decimals: 0,
        totalSupply: "100000000",
      } as TokenInfo,
      {
        symbol: "GAS",
        decimals: 8,
        totalSupply: expect.any(String),
      } as TokenInfo,
    ]);

    expect(parseInt(result[1].totalSupply)).toBeGreaterThan(0);
  });
});
