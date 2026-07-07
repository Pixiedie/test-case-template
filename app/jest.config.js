// @ts-check

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'],
  moduleNameMapper: {
    '^@testing/(.*)$': '<rootDir>/src/testing/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
