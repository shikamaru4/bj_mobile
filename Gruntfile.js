/*
 * grunt-codekit
 * https://github.com/carl-erik.kopseng/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var lrPort = 35729;
  var mozjpeg = require('imagemin-mozjpeg');
  var lrSnippet = require('connect-livereload')({ port: lrPort });
  var lrMiddleware = function(connect, options) {
    return [
      lrSnippet,
      connect.static(options.base[0]),
      connect.directory(options.base[0])
    ];
  };
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    clean: {
        tests: [
          'dist/*.html',
          'src/styles/style-md.css',
          'src/styles/style-lt.css',
          'src/styles/style.css'
        ]
    },

    codekit: {
      defaults: {
        options: {},
        files: {
          'dist/': ['app/*.kit']
        }
      },
    },

    imagemin: {                          // Task 
      static: {                          // Target 
        options: {                       // Target options 
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
        }
      },
      dynamic: {                         // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          src: ['src/images/*.{png,jpg,gif}'],   // Actual patterns to match 
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['src/styles/style*.css', 'src/styles/!*.min.css'],
          dest: './',
          ext: '.min.css'
        }]
      }
    },

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        base: '.'
      },
      livereload: {
        options: {
          middleware: lrMiddleware
        }
      }
    },

    watch: {
      css: {
        files: ['src/styles/*.scss', 'app/*'],
        tasks: ['clean','sass','codekit'],
        options: {
          livereload: true,
          spawn: false,
        }
      },
      client: {
        options: {
          livereload: lrPort
        },
        files: ['app/*.kit', 'src/styles/*', 'src/scripts/*']
      }
    },

    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
        expand: true,
          cwd: 'src/styles',
          src: ['*.scss'],
          dest: 'src/styles',
          ext: '.css'
        }]
      }
    }


  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'codekit']);
  grunt.registerTask('min', ['imagemin', 'cssmin']);
  grunt.registerTask('default', ['codekit','watch']);
};
