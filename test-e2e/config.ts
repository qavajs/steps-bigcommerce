import memory from './memory';

export default {
  paths: ['test-e2e/features/**.feature'],
  tags: 'not @skip',
  require: [
    'test-e2e/stepDefinitions/**.ts',
    'src/stepDefinitions/**.ts',
    'node_modules/@qavajs/steps-memory/index.js'
  ],
  format: [
    '@qavajs/console-formatter',
    'junit:test-e2e/report.xml',
    '@qavajs/html-formatter:test-e2e/report.html'
  ],
  bigCommerce: {
    storeHash: process.env.STORE_HASH,
    accessToken: process.env.BC_ACCESS_TOKEN,
    b2bAccessToken: 'b2bAccessToken not set'
  },
  memory,
  parallel: 4,
  retry: 0,
};
