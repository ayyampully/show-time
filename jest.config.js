module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js?$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/tests/unit/*.spec.(js|jsx|ts|tsx)']
}
