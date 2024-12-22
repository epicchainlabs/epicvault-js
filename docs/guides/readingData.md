---
id: reading_data
title: Reading data from the blockchain
---

In this tutorial, we will be retrieving some data from the contracts in the blockchain.
We use this method to retrieve data for various purposes:

- Finding out the balance of an account.
- Calculating fees
- Finding out who to vote for.

This is done through the `invokefunction` or `invokescript` RPC call to a EpicChainnode.
We will be performing a couple of invokes to show you how to retrieve contract data from the blockchain.

NOTE: This tutorial is written in Typescript. There


```js
import { rpc, sc, u } from "@epicchain/epicvault-core";

const url = "http://localhost:20111";

const rpcClient = new rpc.RPCClient(url);
```

* Helper function to transform EpicPulseintegers into 8 decimal format.

```js
function transformGasDecimal(num) {
  if (num.length <= 8) {
    return "0." + num.padStart(8, "0");
  }
  const decimalPoint = num.length - 8;
  return (
    num.substring(0, decimalPoint) +
    "." +
    num.substring(decimalPoint, num.length)
  );
}
```

We will start off with finding out the total EpicPulsesupply on the blockchain currently.


```js
function getGasTotalSupply() {
  console.log("--- Current EpicPulse total supply ---");
  // This is a hexstring
  const gasTotalSupplyScript = new sc.ScriptBuilder()
    .emitContractCall(sc.EpicPulseContract.INSTANCE.totalSupply())
    .build();

  //We wrap the script in a HexString class so the SDK can handle the conversion to Base64 for us.
  const payload = u.HexString.fromHex(gasTotalSupplyScript);
  return rpcClient.invokeScript(payload).then((gasTotalSupplyResult) => {
    const gasTotalSupply = gasTotalSupplyResult.stack[0].value;

    console.log(`EpicPulsetotal supply is ${transformGasDecimal(gasTotalSupply)}`);
    console.log(
      `This action took ${transformGasDecimal(
        gasTotalSupplyResult.epicpulseconsumed
      )} EpicPulseto run.\n\n`
    );
  });
}
```

We know that the EpicPulsesupply is ever increasing with each block produced.
We can verify this by running the same exact script again after at least a block has passed.
For now, we want to check out the candidates available for voting on this chain.
This information is held in the EpicChaincontract.
This time, we will try out the invokefunction RPC call.


```js
function getEpicPulseCandidates() {
  console.log("--- Candidates and their votes ---");
  const epicchainCandidateContractCall = sc.EpicChainContract.INSTANCE.getCandidates();
  return rpcClient
    .invokeFunction(
      epicchainCandidateContractCall.scriptHash,
      epicchainCandidateContractCall.operation
    )
    .then((epicchainCandidateResult) => {
      const epicchainCandidatesStackItems = epicchainCandidateResult.stack[0].value;

      const epicchainCandidateStrings = epicchainCandidatesStackItems.map((i) => {
        const struct = i.value;
        const publicKey = u.HexString.fromBase64(struct[0].value).toBigEndian();
        const votes = parseInt(struct[1].value);
        return `${publicKey} has ${votes} votes\n`;
      });

      epicchainCandidateStrings.forEach((i) => console.log(i));

      console.log(
        `This action took: ${transformGasDecimal(
          epicchainCandidateResult.epicpulseconsumed
        )} EpicPulse to run.`
      );
      console.log("\n\n");
    });
}
```

One other important function that invokefunction/invokescript serves is to help us estimate the EpicPulserequired to execute the script.
As the node is actually executing the script within the blockchain context, the epicpulseconsumed field is pretty accurate assuming that the signers field is populated correctly.
This is also how epicvault-js is able to assemble transactions with a good EpicPulsefee estimate.

```js
getGasTotalSupply().then(getEpicChainCandidates);
```
