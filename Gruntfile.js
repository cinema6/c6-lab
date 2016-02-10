module.exports = function(grunt) {
    var pkg = require('./package.json');
    var tasks = Object.keys(pkg.devDependencies).filter(function(name) {
        return (/^grunt-/).test(name);
    });

    tasks.forEach(function(task) { grunt.loadNpmTasks(task); });

    grunt.initConfig({
        clean: {
            build: ['build', '.tmp']
        },

        inline: {
            widgets: {
                options: {
                    cssmin: true,
                    uglify: true,
                    tag: ''
                },
                files: [
                    {
                        expand: true,
                        src: ['widgets/**/*.html'],
                        dest: '.tmp/build/'
                    }
                ]
            }
        },

        htmlmin: {
            tmp: {
                options: {
                    collapseWhitespace: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    preventAttributesEscaping: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeOptionalTags: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/build/',
                        src: ['**/*.html'],
                        dest: 'build/'
                    }
                ]
            }
        },

        connect: {
            options: {
                port: 9000
            },
            dev: {
                options: {
                    livereload: true,
                    open: true
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: {
                        liveCSS: false
                    }
                },
                files: [
                    '**/*.*',
                    '!build/**',
                    '!node_modules/**'
                ]
            }
        }
    });

    grunt.registerTask('server', 'Run a dev server out of the root repo directory', [
        'connect:dev',
        'watch:livereload'
    ]);

    grunt.registerTask('build', 'Build into the build folder.', [
        'clean:build',
        'inline:widgets',
        'htmlmin:tmp'
    ]);
};
