module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-mocha-reporter'),
        require('karma-junit-reporter')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      reporters: ['mocha', 'junit'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      singleRun: true,
      restartOnFileChange: true,
      junitReporter: {
        useBrowserName: false,
        outputFile: 'unit.xml',
        suite: 'unit'
      }
    });
  };
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};