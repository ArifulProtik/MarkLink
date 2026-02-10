import antfu from "@antfu/eslint-config";

export default antfu(
  {
    stylistic: false,
  },
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      "node/prefer-global/process": "off",
      "no-console": "off",
      "antfu/no-top-level-await": "off",
      "antfu/consistent-chaining": "error", // Explicitly set the rule
      // Or potentially use the stylistic rule if it's managed there
      "antfu/top-level-function": "off",
      // "style/newlice-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
      "style/object-curly-newline": [
        "error",
        {
          ImportDeclaration: { multiline: true, minProperties: 3 },
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
    },
    plugins: {},
  },
);
