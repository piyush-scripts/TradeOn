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
      // Allow usage of the `object` type
      "@typescript-eslint/ban-types": [
        "error",
        {
          extendDefaults: true,
          types: {
            object: false,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
