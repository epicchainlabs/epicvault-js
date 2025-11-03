const EpicVault = require("../packages/epicvault-js/dist/index");
const testKeys = require("../packages/epicvault-core/__tests__/testKeys.json");

const url = "http://test1.cityofzion.io:8880";
console.log(EpicVault.nep5);
const printTokenBalances = function (scriptHash) {
  return EpicVault.nep5
    .getToken(url, scriptHash)
    .then(({ symbol }) => {
      console.log(`=== ${symbol} ===`);
    })
    .then(() => {
      const balances = Object.keys(testKeys).map((key) => {
        const addr = testKeys[key].address;
        return EpicVault.nep5
          .getToken(url, scriptHash, addr)
          .then((res) => console.log(`${key}: ${res.balance}`));
      });
      return Promise.all(balances);
    });
};

printTokenBalances(EpicVault.CONST.CONTRACTS.TEST_LWTF)
  .then(() => printTokenBalances(EpicVault.CONST.CONTRACTS.TEST_RPX))
  .then(() => printTokenBalances("ae36e5a84ee861200676627df409b0f6eec44bd7"));
