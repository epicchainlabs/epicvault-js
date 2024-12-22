import { CovenantChain, CallFlags } from "../../../src/sc";

const contract = CovenantChain.INSTANCE;
const scriptHash = "add3e350a8789c507686ea677da85d89272f064b";

test("scriptHash", () => {
  expect(contract.scriptHash).toEqual(
    "add3e350a8789c507686ea677da85d89272f064b"
  );
});

describe("default methods", () => {
  test("getFeePerByte", () => {
    const result = contract.getFeePerByte();

    expect(result).toEqual({
      scriptHash,
      callFlags: CallFlags.All,
      operation: "getFeePerByte",
      args: [],
    });
  });

  test("getExecFeeFactor", () => {
    const result = contract.getExecFeeFactor();

    expect(result).toEqual({
      scriptHash,
      callFlags: CallFlags.All,
      operation: "getExecFeeFactor",
      args: [],
    });
  });
});
