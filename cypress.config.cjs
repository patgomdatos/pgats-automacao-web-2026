const { defineConfig } = require('cypress')
const cypressMochawesomeReporter = require('cypress-mochawesome-reporter/plugin')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on);
    },
  },
})
