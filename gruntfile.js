/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    grunt.initConfig({

        // Configurable paths
        project: {
          layouts: '_layouts',
          pages: '_pages',
          partials: '_partials',
          site: '_site',
          css: 'css',
          img: 'img',
          js: 'js',
          less: 'less',
          port: 8080 
        },

        less: {
          all: {
            options: {
                paths: ['<%= project.less %>/']
                //compress: true
            },
            files: {
                '<%= project.css %>/main.css': '<%= project.less %>/main.less'
            }
          }
        },

        jshint: {
          files: ['gruntfile.js','<%= project.js %>/main.js','<%= project.js %>/modules/*.js'],
          options: {
            globals: {
                jQuery: true,
                requirejs: true, 
                console: true,
                module: true
            }
          }
        },

        requirejs: {
          compile: {
            options: { 
                name: 'main',
                baseUrl: './<%= project.js %>',
                mainConfigFile: '<%= project.js %>/main.js',
                out: '<%= project.js %>/main.min.js',
                include: 'libs/requirejs/require'
            }
          }
        },

        clean: {
          jslibclean: [
              '<%= project.js %>/libs/requirejs/dist', 
              '<%= project.js %>/libs/requirejs/docs', 
              '<%= project.js %>/libs/requirejs/tests', 
              '<%= project.js %>/libs/requirejs-plugins/examples',  
              '<%= project.js %>/libs/requirejs-plugins/lib', 
              '<%= project.js %>/libs/respond/test', 
              '<%= project.js %>/libs/respond/cross-domain', 
              '<%= project.js %>/libs/selectivizr/tests',
              '<%= project.js %>/libs/jquery/.gitignore',
              '<%= project.js %>/libs/requirejs/.gitignore'
          ],
          htmlclean: ['*.html', 'examples/*.html']
        },

        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dynamic_mappings: {
              files: [
                {
                expand: true, 
                cwd: '<%= project.img %>/',
                src: ['**/*.jpg','**/*.png'],
                dest: '<%= project.img %>/' 
                }
              ]
            }
        },

        assemble: {
          pages: { // User pages
            options: {
                flatten: true,
                dev: true,
                prod: false,
                assets: '.',
                year: '<%= grunt.template.today("yyyy") %>',
                layout: '<%= project.layouts %>/default.hbs',
                partials: '<%= project.partials %>/*.hbs'
            },
            files: {
                './': ['<%= project.pages %>/*.hbs']
            }
          },
          examples: { // Example templates
            options: {
                flatten: true,
                dev: true,
                prod: false,
                year: '<%= grunt.template.today("yyyy") %>',
                layout: '<%= project.layouts %>/examples.hbs'
            },
            files: {
                'examples/': ['<%= project.pages %>/examples/*.hbs']
            }
          }
                  
        },

        connect: {
          server: {
            options: {
                port: '<%= project.port %>',
                base: ''
            }
          }
        },

        watch: {
          watchless: {
            files: [ '<%= project.less %>/**/*.less' ], 
            tasks: ['less']
          },
          watchjs: {
            files: ['<%= jshint.files %>'], 
            tasks: ['jshint', 'requirejs']
          },
          watchimages: {
            files: ['<%= project.img %>/**/*.jpg','<%= project.img %>/**/*.png'], 
            tasks: ['imagemin']
          },
          watchpages: {
            files: [
              '<%= project.pages %>/**/*.hbs', 
              '<%= project.layouts %>/*.hbs', 
              '<%= project.partials %>/*.hbs' 
            ], 
            tasks: ['clean:htmlclean', 'assemble']
          }
        }    

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch', ['watch:watchless','watch:watchjs','watch:watchpages']);

    // Default Tasks
    grunt.registerTask('default', ['less','requirejs','jshint','imagemin','clean','assemble','connect','watch']);

};