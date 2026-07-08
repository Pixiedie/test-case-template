// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
// Disabled eslint rules for no conflict. It must be the LAST `extends` in each block to have the final say.
const eslintConfigPrettier = require("eslint-config-prettier/flat");

module.exports = defineConfig([
	{
		files: ["**/*.ts"],
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
			tseslint.configs.stylistic,
			angular.configs.tsRecommended,
			eslintConfigPrettier,
		],
		processor: angular.processInlineTemplates,
		rules: {
			"@angular-eslint/directive-selector": [
				"error",
				{
					type: "attribute",
					prefix: "app",
					style: "camelCase",
				},
			],
			"@angular-eslint/component-selector": [
				"error",
				{
					type: ["element", "attribute"],
					prefix: "app",
					style: "kebab-case",
				},
			],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
				},
			],
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/no-empty-function": [
				"error",
				{ allow: ["arrowFunctions"] },
			],
		},
	},
	{
		files: ["**/*.html"],
		extends: [
			angular.configs.templateRecommended,
			angular.configs.templateAccessibility,
			eslintConfigPrettier,
		],
		rules: {},
	},
]);
