const sendingKey =
  "9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69";
const additionalInvocationGas = 0;
const additionalIntents = [];

function InvokeOperation()
{

const provider = new EpicVault.api.epicscan.instance("TestNet");

EpicVault.settings.httpsOnly = true;

const account = new EpicVault.account.Account(sendingKey);

const props = {
  scriptHash: '9488220e8654d798f9b9cb9e74bd611ecc83fd0f',
  operation: 'getBalance',
  args: [EpicVault.u.reverseHex('def0c0fdcfe7838eff6ff104f9cdec2922297525'),
         EpicVault.u.reverseHex('def0c0fdcfe7838eff6ff104f9cdec2922297524')]
}

const script = EpicVault.sc.createScript(props);
const gas = additionalInvocationGas;
const intent = additionalIntents;
const config = {
  api: provider,
  account: account,
  intents: intent,
  script: script,
  gas: gas
};
EpicVault.api.doInvoke(config)
  .then(config => {
    document.getElementById("result").innerHTML = "Relayed TX: " + config.response.txid;
    console.log("\n\n--- Response ---");
    console.log(config.response);
  })
  .catch(config => {
    console.log(config);
    document.getElementById("result").innerHTML = config;
  });
}
