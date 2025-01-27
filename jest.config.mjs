import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const sharedConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@chingu-x/components/(.*)$": "<rootDir>/node_modules/@chingu-x/components/dist/$1",
  },
};

const clientTestConfig = {
  ...sharedConfig,
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/{app,components,store}/**/*.test.ts?(x)"],
};

const config = {
  // Add more setup options before each test is run
  projects: [await createJestConfig(clientTestConfig)()],
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;
