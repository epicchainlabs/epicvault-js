module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  overrides: [
    {
      files: ["**/*.ts"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json"
      },
      rules: {
        "tsdoc/syntax": "warn",
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true
          }
        ],
        "@typescript-eslint/no-non-null-assertion": ["warn"],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { 
            varsIgnorePattern: "^_", 
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true
          }
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow"
          },
          {
            selector: "typeLike",
            format: ["PascalCase"]
          }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "import/order": [
          "error",
          {
            "groups": [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index"
            ],
            "newlines-between": "always",
            "alphabetize": {
              "order": "asc"
            }
          }
        ]
      }
    },
    {
      files: ["**/*.js"],
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
      rules: {
        "no-console": "warn",
        "no-unused-vars": "warn"
      }
    }
  ],
  settings: {
    "import/resolver": {
      "typescript": {},
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
