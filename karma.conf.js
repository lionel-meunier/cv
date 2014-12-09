// Karma configuration

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // we use jasmine as test framework
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/underscore/underscore-min.js',
            'bower_components/underscore.string/dist/underscore.string.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/jquery/dist/jquery.min.js',

            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-animate/angular-animate.js',

            // application src under test
            'scripts/**/*.js',
            'views/**/*.html',

            // test src
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        preprocessors: {
            'app/scripts/**/*.js': 'coverage',
            'app/viewsStat/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            //stripPrefix: 'app/',
            //prependPrefix: '../ui-stat/',
            // prepend this to the
//      prependPrefix: 'served/',

            // or define a custom transform function
            //cacheIdFromPath: function(filepath) {
            //  console.log(filepath);
            //  return filepath;
            //},

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates'
        },

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['progress', 'coverage', 'junit' ],

        // web server port
        port: 8084,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO ||
        // LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers : [ 'Chrome' ],

        //browsers: [ 'PhantomJS' ],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        coverageReporter: {
            type: 'lcov',
            dir: 'test_output/coverage/'
        },

        junitReporter: {
            outputFile: 'test_output/test-results.xml'
        }
    });
};
