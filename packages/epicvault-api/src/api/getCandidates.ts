import { rpc, sc, u } from "@epicchain/epicvault-core";

export interface Candidate {
  publicKey: string;
  votes: number;
}

type getCandidatesStack = [
  {
    type: "Array";
    value: {
      type: "Struct";
      value: [
        { type: "ByteArray"; value: string },
        { type: "Integer"; value: string }
      ];
    }[];
  }
];
export async function getCandidates(
  client: rpc.EpicChainServerRpcClient
): Promise<Candidate[]> {
  const script = new sc.ScriptBuilder()
    .emitContractCall(sc.EpicChainContract.INSTANCE.getCandidates())
    .build();

  const res = await client.invokeScript(u.HexString.fromHex(script));
  const arrayOfCandidates = res.stack as getCandidatesStack;
  return arrayOfCandidates[0].value.map((i) => {
    return {
      publicKey: u.HexString.fromBase64(i.value[0].value).toBigEndian(),
      votes: parseInt(i.value[1].value),
    };
  });
}
