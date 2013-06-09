/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    grunt.initConfig({

        // Configurable paths
        project: {
          dev: true, // Adds livereload script
          layouts: 'content/layouts',
          includes: 'content/includes',
          pages: 'content/pages',
          site: '/',
          assets: 'assets',
          css: 'assets/css',
          img: 'assets/img',
          js: 'assets/js',
          less: 'assets/less',
          port: 8080 
        },

        less: {
          all: {
            options: {
              paths: ['<%= project.less %>/'],
              yuicompress: true
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
          jslibs: [
            '<%= project.js %>/libs/jquery/**/*',
            '!<%= project.js %>/libs/jquery/jquery.min.js',
            '<%= project.js %>/libs/jquery/.gitignore',
            '<%= project.js %>/libs/requirejs/**/*', 
            '!<%= project.js %>/libs/requirejs/require.js', 
            '<%= project.js %>/libs/requirejs/.gitignore',  
            '<%= project.js %>/libs/respond/**/*', 
            '!<%= project.js %>/libs/respond/respond.min.js', 
            '<%= project.js %>/libs/selectivizr/**/*',
            '!<%= project.js %>/libs/selectivizr/selectivizr.js'
          ],
          html: ['**/*.html','!<%= project.assets %>/**/*.html','!node_modules/**/*.html']
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
                  dest: '<%= project.img %>' 
                }
              ]
            }
        },

        assemble: {
          pages: {
            options: {
              dev: '<%= project.dev %>',
              flatten: false,
              assets: '<%= project.assets %>',
              year: '<%= grunt.template.today("yyyy") %>',
              layout: '<%= project.layouts %>/default.hbs',
              partials: '<%= project.includes %>/**/*.hbs'
            },
            files: [
              {
                expand: true,
                cwd: '<%= project.pages %>/',
                src: ['**/*.hbs'],
                dest: '.'
              }
            ]
          }               
        },

        connect: {
          server: {
            options: {
              port: '<%= project.port %>',
              base: '.'
            }
          }
        },

        watch: {
          options: {
            livereload: true
          },
          watchless: {
            files: ['<%= project.less %>/**/*.less' ], 
            tasks: ['less']
          },
          watchjs: {
            files: ['<%= jshint.files %>'], 
            tasks: ['jshint','requirejs']
          },
          watchimages: {
            files: [
              '<%= project.img %>/**/*.jpg',
              '<%= project.img %>/**/*.png'
            ], 
            tasks: ['imagemin']
          },
          watchcontent: {
            files: [
              '<%= project.pages %>/**/*.hbs',
              '<%= project.layouts %>/**/*.hbs',
              '<%= project.includes %>/**/*.hbs'
            ], 
            tasks: ['clean:html','assemble']
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default Tasks
    grunt.registerTask('default', ['less','jshint','requirejs','imagemin','clean','assemble','connect','watch']);

};