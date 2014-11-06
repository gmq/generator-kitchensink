/* jshint node:true*/
// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // configurable paths
    var yeomanConfig = {
        src: 'src',
        build: 'build'
    };
    console.log('test');
    grunt.initConfig({
        yeoman: yeomanConfig,
        <% if (includeWebfonts) { %> webfont: {
            icons: {
                src: '<%%= yeoman.src %>/images/ico-src/*.svg',
                dest: '<%%= yeoman.src %>/css/fonts',
                destCss: '<%%= yeoman.src %>/css/modules',
                options: {
                    engine: 'node',
                    stylesheet: 'scss',
                    relativeFontPath: 'fonts'
                }
            }
        },
        <%
        } %>
        watch: {
            js: {
                    files: ['<%%= yeoman.src %>/scripts/{,*/}*.js'],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: ['<%%= yeoman.src %>/templates/{,*/}*.hbs', '.tmp/styles/{,*/}*.css', '<%%= yeoman.src %>/images/{,*/}*','<%%= yeoman.src %>/css/{,*/}*.{scss,sass}',
                    '<%%= yeoman.src %>/css/{,*/}{,*/}*.{scss,sass}'],
                tasks: ['assemble']
            },
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [connect.static('.tmp'), connect().use('/bower_components', connect.static('./bower_components')), connect.static(yeomanConfig.src)];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%%= yeoman.build %>',
                    livereload: false
                }
            }
        },
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%%= yeoman.build %>/*', '!<%%= yeoman.build %>/.git*']
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '<%%= yeoman.src %>/js/{,*/}*.js', '!<%%= yeoman.src %>/js/vendor/*', 'test/spec/{,*/}*.js']
        },
        // Do we really need compass?
        /*
        compass: {
            options: {
                require: [<% if (includeScut) { %>'scut',<% } %><% if (includeNormalize) { %>'compass-normalize',<% } %>,<% if (includeSusy) { %>'susy',<% } %>],
                sassDir: '<%%= yeoman.src %>/css',
                cssDir: '.tmp/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.src %>/images',
                javascriptsDir: '<%%= yeoman.src %>/js',
                fontsDir: '<%%= yeoman.src %>/css/fonts',
                importPath: '<%%= yeoman.src %>/bower_components',
                httpImagesPath: '../images',
                httpGeneratedImagesPath: '../images/generated',
                httpFontsPath: '../css/fonts',
                relativeAssets: false
            },
            build: {
                options: {
                    generatedImagesDir: '<%%= yeoman.build %>/images/generated',
                    outputStyle: 'compact',
                    noLineComments: true,
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },*/
        sass: {
            options: {
                loadPath: '<%%= yeoman.src %>/bower_components',
                <% if(includeSusy) { %>require: [<%if(includeSusy){%>'susy'<%}%>]<%}%>
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.src %>/css',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/css',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.src %>/css',
                    src: ['*.{scss,sass}','{,*/}*.{scss,sass}'],
                    dest: '.tmp/css',
                    ext: '.css'
                }]
            }
        },
        rev: {
            build: {
                files: {
                    src: ['<%%= yeoman.build %>/js/{,*/}*.js', '<%%= yeoman.build %>/css/{,*/}*.css', '<%%= yeoman.build %>/css/fonts/*']
                }
            }
        },
        assemble: {
            options: {
                flatten: true,
                layout: '<%%= yeoman.src %>/templates/layouts/default.hbs',
                partials: '<%%= yeoman.src %>/templates/partials/*.hbs'
            },
            pages: {
                files: {
                    '<%%= yeoman.src %>/': ['<%%= yeoman.src %>/templates/pages/*.hbs', '!<%%= yeoman.src %>/templates/pages/index.hbs']
                }
            },
            index: {
                files: {
                    '<%%= yeoman.src %>/': ['<%%= yeoman.src %>/templates/pages/index.hbs']
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.build %>'
            },
            html: ['<%%= yeoman.src %>/*.html']
        },
        usemin: {
            options: {
                dirs: ['<%%= yeoman.build %>']
            },
            html: ['<%%= yeoman.build %>/{,*/}*.html'],
            css: ['<%%= yeoman.build %>/css/{,*/}*.css']
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.build %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,src}) css/styles.css -->
            //
            // build: {
            //     files: {
            //         '<%%= yeoman.build %>/css/styles.css': [
            //             '.tmp/css/{,*/}*.css',
            //             '<%%= yeoman.src %>/css/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            build: {
                options: {
                    // removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // removeAttributeQuotes: true,
                    // removeRedundantAttributes: true,
                    // useShortDoctype: true,
                    // removeEmptyAttributes: true,
                    // removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.src %>',
                    src: '*.html',
                    dest: '<%%= yeoman.build %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.src %>',
                    dest: '<%%= yeoman.build %>',
                    src: ['*.html', '*.php', '*.{ico,png,txt}', '.htaccess', 'images/!(svg-src)/**', 'css/fonts/*']
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.src %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        <% if(includeAutoprefixer) { %>
        autoprefixer: {
            'options': {
                'map': false,
                'mapInline': false
            },
            no_dest: { 'src': '.tmp/css/*.css' },
            server: { 'no_dest': { 'src': '.tmp/css/*.css' } }
        },
        <% } %>
        concurrent: {
            'server': [
                'sass:server',
                <% if(includeWebfonts) { %>
                'webfont',
                <% } %>
                <% if(includeAutoprefixer) { %>
                'autoprefixer:server',
                <% } %>
                'copy:styles'
            ],
            'build': [
                'sass',
                <% if(includeWebfonts) { %>
                'webfont',
                <% } %>
                'copy:styles',
                'imagemin',
                'htmlmin'
            ]
        },
        bower: {
            options: {
                exclude: ['modernizr']
            }
        }
    });
    grunt.loadNpmTasks('assemble');
    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
        if (grunt.option('allow-remote')) {
          grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'clean:server',
          'concurrent:server',
          'connect:livereload',
          'watch'
        ]);
    });
    grunt.registerTask('build', [
        'clean:build',
        'assemble',
        'useminPrepare',
        'concurrent:build',
        'autoprefixer',
        'concat',
        'uglify',
        'copy:build',
        'usemin'
    ]);
};