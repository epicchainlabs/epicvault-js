import { parse, UriIntent } from "../src/parse";

test("errors if nothing given", () => {
  expect(() => parse("epicchain:")).toThrow();
});

describe("parse", () => {
  test.each([
    [
      "Address with asset name",
      "epicchain:XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=epicchain",
      {
        intent: "pay",
        description: "Transfer some EpicChain to XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk",
        contractCall: {
          scriptHash: "6dc3bff7b2e6061f3cad5744edf307c14823328e",
          operation: "transfer",
          args: [
            { type: "Hash160", value: "" },
            { type: "Hash160", value: "XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk" },
            { type: "Integer", value: "" },
          ],
        },
      },
    ],
    [
      "Address with asset scriptHash",
      "epicchain:XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=d2a4cff31913016155e38e474a2c06d08be276cf",
      {
        intent: "pay",
        description:
          "Transfer some tokens(d2a4cff31913016155e38e474a2c06d08be276cf) to XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk",
        contractCall: {
          scriptHash: "d2a4cff31913016155e38e474a2c06d08be276cf",
          operation: "transfer",
          args: [
            { type: "Hash160", value: "" },
            { type: "Hash160", value: "NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk" },
            { type: "Integer", value: "" },
          ],
        },
      },
    ],
    [
      "Address transferring some specific amount of epicpulse",
      "epicchain:XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=epicpulse&amount=1000",
      {
        intent: "pay",
        description: "Transfer 1000 EpicPulse to XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk",
        contractCall: {
          scriptHash: "d2a4cff31913016155e38e474a2c06d08be276cf",
          operation: "transfer",
          args: [
            { type: "Hash160", value: "" },
            { type: "Hash160", value: "XNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk" },
            { type: "Integer", value: "1000" },
          ],
        },
      },
    ],
    [
      "vote",
      "epicchain:vote-02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef",
      {
        intent: "vote",
        description:
          "Vote for 02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef",
        contractCall: {
          scriptHash: "6dc3bff7b2e6061f3cad5744edf307c14823328e",
          operation: "vote",
          args: [
            { type: "Hash160", value: "" },
            {
              type: "PublicKey",
              value:
                "02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef",
            },
          ],
        },
      },
    ],
  ])("%s", (_: string, uri: string, expected: UriIntent) => {
    const result = parse(uri);
    expect(result).toMatchObject(expected);
  });
});
