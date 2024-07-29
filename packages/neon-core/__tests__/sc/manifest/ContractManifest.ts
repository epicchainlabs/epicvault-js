import {
  ContractManifest,
  ContractManifestJson,
  ContractManifestLike,
  ContractParamType,
  ContractPermissionJson,
} from "../../../src/sc";

const defaultManifestLike: ContractManifestLike = {
  name: "",
  supportedStandards: [],
  abi: {
    events: [],
    methods: [],
  },
  groups: [],
  features: {},
  permissions: [],
  trusts: "*",
  extra: undefined,
};

const definedManifestLike: ContractManifestLike = {
  supportedStandards: ["NEP-5"],
  name: "contract_name",
  abi: {
    events: [
      {
        name: "transfer",
        parameters: [
          {
            name: "from",
            type: ContractParamType.Hash160,
          },
          {
            name: "to",
            type: ContractParamType.Hash160,
          },
          {
            name: "amount",
            type: ContractParamType.Integer,
          },
        ],
      },
    ],
    methods: [
      {
        name: "transfer",
        offset: 0,
        parameters: [
          {
            name: "from",
            type: ContractParamType.Hash160,
          },
          {
            name: "to",
            type: ContractParamType.Hash160,
          },
          {
            name: "amount",
            type: ContractParamType.Integer,
          },
        ],
        returnType: ContractParamType.Boolean,
        safe: false,
      },
    ],
  },
  groups: [
    {
      pubKey: "this_is_a_public_key",
      signature: "this_is_a_signature",
    },
  ],
  features: {},
  permissions: [
    {
      contract: "a1760976db5fcdfab2a9930e8f6ce875b2d18225",
      methods: ["balanceOf"],
    },
  ],
  trusts: "*",
  extra: "random note",
};

describe("constructor & export", () => {
  test("default", () => {
    const manifest = new ContractManifest({});
    expect(manifest.export()).toStrictEqual(defaultManifestLike);
  });

  test("specified", () => {
    const manifest = new ContractManifest(definedManifestLike);
    expect(manifest.export()).toStrictEqual(definedManifestLike);
  });
});

describe("fromJson", () => {
  test("neo", () => {
    const neoManifestJson = {
      groups: [],
      features: {},
      supportedstandards: ["NEP-5"],
      name: "NeoToken",
      abi: {
        methods: [
          {
            name: "totalSupply",
            parameters: [],
            offset: 0,
            returntype: "Integer",
            safe: true,
          },
          {
            name: "unclaimedGas",
            parameters: [
              {
                name: "account",
                type: "ByteArray",
              },
              {
                name: "end",
                type: "Integer",
              },
            ],
            offset: 0,
            returntype: "Integer",
            safe: true,
          },
          {
            name: "registerCandidate",
            parameters: [
              {
                name: "pubkey",
                type: "ByteArray",
              },
            ],
            offset: 0,
            returntype: "Boolean",
            safe: false,
          },
          {
            name: "unregisterCandidate",
            parameters: [
              {
                name: "pubkey",
                type: "ByteArray",
              },
            ],
            offset: 0,
            returntype: "Boolean",
            safe: false,
          },
          {
            name: "vote",
            parameters: [
              {
                name: "account",
                type: "ByteArray",
              },
              {
                name: "voteTo",
                type: "ByteArray",
              },
            ],
            offset: 0,
            returntype: "Boolean",
            safe: false,
          },
          {
            name: "getCandidates",
            parameters: [],
            offset: 0,
            returntype: "Array",
            safe: true,
          },
          {
            name: "getCommittee",
            parameters: [],
            offset: 0,
            returntype: "Array",
            safe: true,
          },
          {
            name: "getNextBlockValidators",
            parameters: [],
            offset: 0,
            returntype: "Array",
            safe: true,
          },
          {
            name: "balanceOf",
            parameters: [
              {
                name: "account",
                type: "ByteArray",
              },
            ],
            offset: 0,
            returntype: "Integer",
            safe: true,
          },
          {
            name: "transfer",
            parameters: [
              {
                name: "from",
                type: "ByteArray",
              },
              {
                name: "to",
                type: "ByteArray",
              },
              {
                name: "amount",
                type: "Integer",
              },
            ],
            offset: 0,
            returntype: "Boolean",
            safe: false,
          },
          {
            name: "symbol",
            parameters: [],
            offset: 0,
            returntype: "String",
            safe: true,
          },
          {
            name: "decimals",
            parameters: [],
            offset: 0,
            returntype: "Integer",
            safe: true,
          },
        ],
        events: [
          {
            name: "Transfer",
            parameters: [
              {
                name: "from",
                type: "Hash160",
              },
              {
                name: "to",
                type: "Hash160",
              },
              {
                name: "amount",
                type: "Integer",
              },
            ],
          },
        ],
      },
      permissions: [
        {
          contract: "*",
          methods: "*",
        } as ContractPermissionJson,
      ],
      trusts: [],
      extra: null,
    };

    const manifest = ContractManifest.fromJson(neoManifestJson);
    expect(manifest.toJson()).toStrictEqual(neoManifestJson);
  });

  test("custom permissions", () => {
    const manifestWithPermissionsJson: ContractManifestJson = {
      name: "custom_permissions",
      supportedstandards: [],
      abi: {
        events: [],
        methods: [
          {
            name: "method1",
            offset: 0,
            parameters: [
              {
                name: "param1",
                type: "ByteArray",
              },
              {
                name: "param2",
                type: "String",
              },
            ],
            returntype: "Boolean",
            safe: false,
          },
        ],
      },
      groups: [],
      features: {},
      permissions: [
        {
          contract: "0xabcd000000000000000000000000000000000000",
          methods: ["method1"],
        },
        {
          contract:
            "021234567890000000000000000000000000000000000000000000000000000000",
          methods: ["method1"],
        },
      ],
      trusts: [
        "0x1234000000000000000000000000000000000000",
        "02abcdef1230000000000000000000000000000000000000000000000000000000",
      ],
      extra: undefined,
    };

    const manifest = ContractManifest.fromJson(manifestWithPermissionsJson);

    expect(manifest.toJson()).toStrictEqual(manifestWithPermissionsJson);
  });
});
