require("@rushstack/eslint-config/patch/modern-module-resolution");
module.exports = {
  extends: ["@microsoft/eslint-config-spfx/lib/profiles/react"],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "@microsoft/spfx/no-async-await": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/jsx-no-bind": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-parameter-properties": [
      1,
      {
        allows: ["public"],
      },
    ],
    "max-lines": "off",
    "@rushstack/security/no-unsafe-regexp": "off",
    "dot-notation": "off",
    "prefer-const": "off",
    "react/self-closing-comp": "off",
  },
};
