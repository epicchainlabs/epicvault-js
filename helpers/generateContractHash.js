const sc = require("@cityofzion/neon-core").sc;

const nativeContractNames = [
  "EpicChain",
  "EpicPulse",
  "CovenantChain",
  "ManagementContract",
  "OracleNexus",
  "DesignationContract",
];

console.log(
  nativeContractNames
    .map((name) => `${name} = "${sc.getNativeContractHash(name)}"`)
    .join(",\n")
);
