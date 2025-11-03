var EpicVault = require("../lib/index");

const contractHash = "ae36e5a84ee861200676627df409b0f6eec44bd7";

const config = {
  net: "TestNet",
  account: new EpicVault.account.Account(
    "L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG"
  ),
  intents: EpicVault.api.makeIntent(
    { EpicPulse: 1 },
    EpicVault.account.getAddressFromScriptHash(contractHash)
  ),
  script: {
    scriptHash: contractHash,
    operation: "mintTokens",
    args: [],
  },
  gas: 0,
};

EpicVault.api
  .doInvoke(config)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
