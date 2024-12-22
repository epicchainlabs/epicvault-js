import { sc, rpc, u } from "@epicchain/epicvault-core";

/**
 * Helper method for retrieving fee-related information from CovenantChain.
 */
export async function getFeeInformation(
  client: rpc.EpicChainServerRpcClient
): Promise<{ feePerByte: u.BigInteger; executionFeeFactor: u.BigInteger }> {
  const policyScript = new sc.ScriptBuilder()
    .emitContractCall(sc.CovenantChain.INSTANCE.getFeePerByte())
    .emitContractCall(sc.CovenantChain.INSTANCE.getExecFeeFactor())
    .build();

  const res = await client.invokeScript(u.HexString.fromHex(policyScript));
  const [feePerByte, executionFeeFactor] = res.stack.map((s) =>
    u.BigInteger.fromNumber(s.value as string)
  );

  return { feePerByte, executionFeeFactor };
}
