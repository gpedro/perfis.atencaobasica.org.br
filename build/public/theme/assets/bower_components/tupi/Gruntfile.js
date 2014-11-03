// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  var appConfig = {

    // Default Paths
    path: {
      bower: 'bower_components',
      tests: 'tests',
    },

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Tupi v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Contributors: <%= pkg.contributors %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    /************************************
     * grunt-contrib-clean
     * Clean files and folders
     ************************************/
    clean: {
      dist: ['css/']
    },

    /************************************
     * grunt-sass
     * Compile SCSS to CSS using node-sass
     ************************************/
    sass: {
      options: {
        includePaths: ['scss/base'],
        outputStyle: 'nested'
      },
      components: {
        files: {
          'css/component/dot-styles.css'         : 'scss/dot-styles.scss',
          'css/component/page-overlay.css'       : 'scss/page-overlay.scss',
          'css/component/timeline-vertical.css'  : 'scss/timeline-vertical.scss',
          'css/component/header-shrink.css'      : 'scss/header-shrink.scss'
        }
      },
      transition: {
        files: {
          'css/transition/img-caption.css'      : 'scss/transition/img-caption.scss'
        }
      },
      icons: {
        files: {
          'css/icon/tupi-icon.awesome.css'       : 'scss/icon/awesome/build.scss',
          'css/icon/tupi-icon.line.css'          : 'scss/icon/line/build.scss',
          'css/icon/tupi-icon.cdp.css'           : 'scss/icon/cdp/build.scss'
        }
      }
    },

    /************************************
     * grunt-contrib-jshint
     * Validate files with JSHint
     ************************************/
    jshint: {
      options: {
        jshintrc: '<%= path.tests %>/.jshintrc'
      },
      all: ['Gruntfile.js', 'js/**/*.js']
    },

    /************************************
     * grunt-contrib-csslint
     * Lint CSS files
     ************************************/
    csslint: {
      options: {
        csslintrc: '<%= path.tests %>/.csslintrc'
      },
      strict: {
        src: ['css/**/*.css']
      }
    },

    /************************************
     * grunt-banner
     * Adds a simple banner to files
     ************************************/
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['css/**/*.css',
              'js/**/*.js']
      }
    },

    /************************************
     * grunt-bump
     * Bump package version, create tag, commit, push...
     ************************************/
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'css/', 'js/'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // Prepare to push new version task
  grunt.registerTask('newver', ['clean', 'usebanner']);

  // Test task
  grunt.registerTask('test', ['jshint', 'csslint']);

  // Default task
  grunt.registerTask('default', ['test', 'newver']);

};
