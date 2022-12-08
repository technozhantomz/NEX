// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.tsx",
    "**/*.ts",
    "!**/node_modules/**",
    "!**/index.ts",
    "!**/*.styled.tsx",
    "!./src/pages/**/**.tsx",
  ],
  coverageReporters: ["clover", "json", "lcov", "text"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  return {
    ...nextJestConfig,
    transformIgnorePatterns: [
      "/node_modules/(?!(tiny-secp256k1|uint8array-tools|compare)/)",
    ],
  };
};

module.exports = jestConfig;
