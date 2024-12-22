import { getIntegrationEnvUrl } from "../../../../../testHelpers";
import { NATIVE_CONTRACT_HASH } from "../../../src/consts";
import { RPCClient } from "../../../src/rpc";
import { Xep17Contract } from "../../../src/sc/contracts/Xep17Contract";
import testWallet from "../../../__tests__/testWallet.json";

let rpcClient: RPCClient;
beforeAll(async () => {
  const url = await getIntegrationEnvUrl();
  rpcClient = new RPCClient(url);
});

describe("Xep17Contract", () => {
  test("totalSupply", async () => {
    const epicchainContract = new Xep17Contract(NATIVE_CONTRACT_HASH.EpicChain);
    const contractCall = epicchainContract.totalSupply();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "Integer",
        value: "100000000",
      },
    ]);
  });

  test("symbol", async () => {
    const epicchainContract = new Xep17Contract(NATIVE_CONTRACT_HASH.EpicChain);
    const contractCall = epicchainContract.symbol();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "ByteString",
        value: "TkVP",
      },
    ]);
  });

  test("decimals", async () => {
    const epicchainContract = new Xep17Contract(NATIVE_CONTRACT_HASH.EpicPulse);
    const contractCall = epicchainContract.decimals();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "Integer",
        value: "8",
      },
    ]);
  });

  test("balanceOf", async () => {
    const epicchainContract = new Xep17Contract(NATIVE_CONTRACT_HASH.EpicPulse);
    const contractCall = epicchainContract.balanceOf(testWallet.accounts[0].address);

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toHaveLength(1);

    expect(result.stack[0].type).toBe("Integer");
    expect(parseInt(result.stack[0].value as string)).toBeGreaterThan(0);
  });
});
