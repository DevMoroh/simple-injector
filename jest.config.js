const jestConfig = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    coverageThreshold: {
        global: {
            lines: 1,
            functions: 60,
        },
    },
    verbose: true,
    notify: false,
    transformIgnorePatterns: ['node_modules'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleDirectories: ['./node_modules', './src'],
    collectCoverage: true,
    coverageDirectory: 'reports/coverage',
    setupFiles: [],
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/**/handler.ts',
    ],
    moduleFileExtensions: ['ts', 'js'],
    testEnvironment: 'node',
    testLocationInResults: true,
};
module.exports = jestConfig;
