// eslint-disable-next-line @typescript-eslint/no-var-requires
const commonEslintConfig = require("./eslint-common");

module.exports = {
  ...commonEslintConfig,
  ignorePatterns: [...commonEslintConfig.ignorePatterns],
  plugins: [...commonEslintConfig.plugins, "react", "react-hooks"],
  extends: [...commonEslintConfig.extends, "plugin:react/recommended"],

  settings: {
    ...commonEslintConfig.settings,
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  rules: {
    ...commonEslintConfig.rules,
    // Next.js does not require React to be in scope
    "react/react-in-jsx-scope": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
  },
};
