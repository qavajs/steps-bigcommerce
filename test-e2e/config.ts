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
    storeHash: '0bvmqr36yg',
    accessToken: 'pke41vatg1c5gacbog3z8n39u4cxi1y',
    b2bAccessToken: ''
  },
  memory,
  parallel: 4,
  retry: 0,
};
