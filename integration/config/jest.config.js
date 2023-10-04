module.exports = {
  preset: 'jest-puppeteer',
  roots: ['../'],
  testRegex: 'tests/.*\\.test\\.js$',
  setupFilesAfterEnv: ['./setupTests.js'],
  testTimeout: 30000
};
