module.exports = function(grunt) {

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist/js', 'dist/css', 'dist/vendor', 'dist/index.html'],
        concat: {
            options: {
                separator: ';\n',
            },
            dist: {
                src: 'src/frontend/js/*.js',
                dest: 'dist/js/scripts.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/js/scripts.js',
                dest: 'dist/js/scripts.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/css/styles.css': 'src/frontend/sass/main.scss'
                }
            }
        },
        copy: {
            main: {
                files: [
                {src: ['src/frontend/index.html'], dest: 'dist/index.html'},
                {expand: true, cwd: "src/frontend/bower_components/", src: ['**/**'], dest: 'dist/vendor/'},
                ],
            },
        },
        watch: {
            html: {
                files: 'src/frontend/*.html',
                tasks: ['copy'],
            },
            js: {
                files: ['src/frontend/js/*.js'],
                tasks: ['concat', 'uglify'],
            },
            css: {
                files: ['src/frontend/sass/*.scss', 'src/frontend/sass/**/*.scss'],
                tasks: ['sass'],
            },
        },
        jshint: {
            all: ['Gruntfile.js', 'src/frontend/js/*.js']
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'sass']);

};
