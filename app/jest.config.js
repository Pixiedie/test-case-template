// @ts-check

/** @type {import('jest').Config} */
module.exports = {
	preset: "jest-preset-angular",
	setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
	testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.spec.ts"],
	moduleNameMapper: {
		"^@ui/(.*)$": "<rootDir>/src/app/ui/$1",
		"^@pages/(.*)$": "<rootDir>/src/app/pages/$1",
		"^@testing/(.*)$": "<rootDir>/src/testing/$1",
		"^@layouts/(.*)$": "<rootDir>/src/app/layouts/$1",
		"^@data/(.*)$": "<rootDir>/src/app/data/$1",
		"^@appTypes/(.*)$": "<rootDir>/src/app/types/$1",
		"^@utils/(.*)$": "<rootDir>/src/app/utils/$1",
		"^@constants/(.*)$": "<rootDir>/src/app/constants/$1",
	},
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
