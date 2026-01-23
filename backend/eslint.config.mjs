import antfu from "@antfu/eslint-config"
import drizzle from "eslint-plugin-drizzle"

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: "double",
    },
  },
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      "node/prefer-global/process": "off",
      "no-console": "off",
      "antfu/no-top-level-await": "off",
      "antfu/consistent-chaining": "error", // Explicitly set the rule
      // Or potentially use the stylistic rule if it's managed there
      // "style/newlice-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    },
    plugins: {
      drizzle,
    },

  },
)
