const nodeLedger = require("@ledgerhq/hw-transport-node-hid").default;
const ledger = require("@epicchain/epicvault-ledger").default;
const epicvault = require("@epicchain/epicvault-js");

const epicvaultJs = { ...epicvault, ledger };
const addressNumber = 0;

const epicscan = new epicvaultJs.api.epicscan.instance("TestNet");

let ledgerInstance = null;

epicvaultJs.ledger
  .getDevicePaths(nodeLedger)
  .then((paths) => {
    console.log("\n\n ---Ledger devices---");
    console.log(paths);
    ledgerInstance = nodeLedger.open(paths[0]);
    return ledgerInstance;
  })
  .then((ledger) => {
    ledgerInstance = ledger;
    const bip = epicvaultJs.ledger.BIP44(addressNumber);
    console.log("\n\n ---BIP44 String---");
    console.log(bip);
    return epicvaultJs.ledger.getPublicKey(ledger, bip);
  })
  .then((key) => {
    console.log("\n\n ---Public Key---");
    console.log(key);
    return key;
  })
  .then((publicKey) => {
    return epicvaultJs.api.sendAsset({
      api: epicscan,
      account: new epicvaultJs.wallet.Account(publicKey),
      intents: epicvaultJs.api.makeIntent(
        { EpicChain: 1 },
        "XLq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW"
      ),
      signingFunction: async (tx, pubKey) => {
        const sig = await epicvaultJs.ledger.getSignature(
          ledgerInstance,
          tx,
          epicvaultJs.ledger.BIP44(addressNumber)
        );
        const witness = await epicvaultJs.tx.Witness.fromSignature(sig, pubKey);
        return witness.serialize();
      },
    });
  })
  .then((sendAsset) => {
    console.log("\n\n---SendAsset---");
    console.log(sendAsset.response);
  })
  .catch((e) => {
    console.log(e);
  });
