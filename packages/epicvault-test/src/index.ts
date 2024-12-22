import { api, rpc } from "@epicchain/epicvault-js";

const RPC_URL = "https://testnet1-seed.epic-chain.org:20111";

const rpcClient = new rpc.RPCClient(RPC_URL);
console.log("EpicChain Weather Report");

rpcClient
  .getBlockCount()
  .then((currentHeight) => console.log(`Blockchain height: ${currentHeight}`))
  .then(() => api.getFeeInformation(rpcClient))
  .then((feeInfo) =>
    console.log(
      `Current fees: ${feeInfo.feePerByte} per byte, ${feeInfo.executionFeeFactor} multipler`
    )
  );
