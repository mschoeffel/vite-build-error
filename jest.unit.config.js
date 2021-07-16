module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/tests/e2e'],
  collectCoverageFrom: [
    '**/src/api/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}
