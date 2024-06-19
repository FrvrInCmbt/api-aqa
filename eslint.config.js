import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        rules: {
            curly: "error",
            quotes: ["error", "double"],
            "no-console": "off",
            "no-unused-vars": "off",
            "no-setter-return": "off",
            "no-constant-condition": "off",
            "no-constant-binary-expression": "off",
            "no-undef": "off"
        }
    }
];
