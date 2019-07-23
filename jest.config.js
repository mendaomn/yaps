module.exports = {
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}
