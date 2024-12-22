import { rpc } from "@epicchain/epicvault-core";
import * as TestHelpers from "../../../../testHelpers";

import { getFeeInformation } from "../../src/api/getFeeInformation";

let client: rpc.EpicChainServerRpcClient;
beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.EpicChainServerRpcClient(url);
}, 20000);

describe("getFeeInformation", () => {
  test("success", async () => {
    const result = await getFeeInformation(client);

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(["feePerByte", "executionFeeFactor"])
    );
  });
});
