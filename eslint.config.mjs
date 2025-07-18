import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ignore React hook/component naming errors
      "react-hooks/rules-of-hooks": "off",
      // Ignore unused variable errors
      "@typescript-eslint/no-unused-vars": "off",
      // Ignore explicit any errors
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
