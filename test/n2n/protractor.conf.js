exports.config = {
  allScriptsTimeout: 99999,

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // The address where our server under test is running

  //baseUrl: 'http://localhost:8000/',

  baseUrl: 'http://localhost:3030/',

  // Capabilities to be passed to the webdriver instance. chrome firefox
  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  // Spec patterns are relative to the location of the
  // spec file. They may include glob patterns.
  specs: ['*Spec*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
};
