import { XEF } from "../../src/sc/XEF";
import { CallFlags } from "../../src/sc";
import { Buffer } from "buffer";

import { readFileSync } from "fs";
import { join as joinPath } from "path";

describe("constructor", () => {
  test("ok", () => {
    const result = new XEF({
      compiler: "test-compiler",
      tokens: [],
      script: "00",
    });

    expect(result instanceof XEF).toBeTruthy();
  });
});

describe("fromJson", () => {
  test("incorrect magic", () => {
    expect(() =>
      XEF.fromJson({
        magic: 0,
        compiler: "test-compiler",
        source: "",
        tokens: [],
        script: "00",
        checksum: 0,
      })
    ).toThrowError("Incorrect magic");
  });

  test("invalid checksum", () => {
    expect(() =>
      XEF.fromJson({
        magic: XEF.MAGIC,
        compiler: "test-compiler",
        source: "github",
        tokens: [],
        script: "00",
        checksum: 0,
      })
    ).toThrowError("Invalid checksum");
  });

  test("ok", () => {
    const result = XEF.fromJson({
      magic: XEF.MAGIC,
      compiler: "test-compiler",
      source: "github",
      tokens: [],
      script: "00",
      checksum: 3977318361,
    });
    expect(result instanceof XEF).toBeTruthy();
  });
});

describe("fromBuffer", () => {
  test("ok", () => {
    /* Capture from C#
      var xef = new XefFile
      {
          Compiler = "test-compiler 0.1",
          Source = "github",
          Script = new byte[] {(byte) OpCode.RET},
          Tokens = new MethodToken[]
          {
              new MethodToken()
              {
                  Hash = UInt160.Zero,
                  Method = "test_method",
                  ParametersCount = 0,
                  HasReturnValue = true,
                  CallFlags = CallFlags.None
              }
          }
      };
      xef.CheckSum = XefFile.ComputeChecksum(xef);
      Console.WriteLine(xef.ToArray().ToHexString());
     */
    const data = Buffer.from(
      "4e454633746573742d636f6d70696c657220302e31000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006676974687562000100000000000000000000000000000000000000000b746573745f6d6574686f6400000100000001403374b4fd",
      "hex"
    );
    const xef = XEF.fromBuffer(data);
    expect(xef.compiler).toBe("test-compiler 0.1");
    expect(xef.source).toBe("github");
    expect(xef.tokens.length).toBe(1);
    expect(xef.tokens[0].hash).toBe("0000000000000000000000000000000000000000");
    expect(xef.tokens[0].method).toBe("test_method");
    expect(xef.tokens[0].parametersCount).toBe(0);
    expect(xef.tokens[0].hasReturnValue).toBe(true);
    expect(xef.tokens[0].callFlags).toBe(CallFlags.None);
    expect(xef.script).toBe("40");
    expect(xef.checksum).toBe(4256461875);
  });

  test("local file: djnicholson.EpicChainPetShopContract", () => {
    const xefFile = readFileSync(
      joinPath(__dirname, "./djnicholson.EpicChainPetShopContract.xef")
    );

    const xef = XEF.fromBuffer(xefFile);

    expect(xef.checksum).toBeDefined();
  });

  test("incorrect magic", () => {
    const data = Buffer.from("00010203", "hex");
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - incorrect magic"
    );
  });

  test("invalid source length", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "fd0101"; // var size of 257 (limit is 256)
    const data = Buffer.from(magic + compiler + source, "hex");
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - source field size exceeds maximum length of 256"
    );
  });

  test("invalid reserved 1", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const data = Buffer.from(magic + compiler + source + "01", "hex");
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - reserved bytes must be 0"
    );
  });

  test("invalid token length", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved + "ffff",
      "hex"
    );
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - token array exceeds maximum length of 128"
    );
  });

  test("invalid reserved 2", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved = "00";
    const methodLength = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved + methodLength + "0001",
      "hex"
    );
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - reserved bytes must be 0"
    );
  });

  test("script length cannot be 0", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved1 = "00";
    const reserved2 = "0000";
    const methodLength = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved1 + methodLength + reserved2 + "00",
      "hex"
    );
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - script length can't be 0"
    );
  });

  test("script length exceeds max value", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved1 = "00";
    const reserved2 = "0000";
    const methodLength = "00";
    const data = Buffer.from(
      magic +
        compiler +
        source +
        reserved1 +
        methodLength +
        reserved2 +
        "ffffffffffffffff",
      "hex"
    );
    expect(() => XEF.fromBuffer(data)).toThrowError(
      "XEF deserialization failure - max script length exceeded"
    );
  });
});

describe("serialize", () => {
  test("ok", () => {
    // hexstring captured from C#, see fromBuffer test for the capture code
    const hexstring =
      "4e454633746573742d636f6d70696c657220302e31000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006676974687562000100000000000000000000000000000000000000000b746573745f6d6574686f6400000100000001403374b4fd";
    const data = Buffer.from(hexstring, "hex");
    const xef = XEF.fromBuffer(data);
    expect(xef.serialize()).toEqual(hexstring);
  });
});
