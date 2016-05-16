module.exports = function(grunt) {

  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: 'src/js/*.js',
        dest: 'dist/js/script.min.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/script.min.js',
        dest: 'dist/js/script.min.js'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/styles.css': 'src/sass/main.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['src/index.html'], dest: 'dist/index.html'},
        ],
      },
    },
    watch: {
      html: {
        files: 'src/*.html',
        tasks: ['copy'],
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
      },
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss'],
        tasks: ['sass'],
      },
    },
    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass']);

};