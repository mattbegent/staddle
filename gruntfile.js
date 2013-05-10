module.exports = function(grunt) {

    // Grunt Config
    grunt.initConfig({

        less: {
          all: {
            options: {
              paths: ["less/"],
              compress: true
            },
            files: {
              "css/main.css": "less/main.less"
            }
          }
        },

        jshint: {
          files: ['gruntfile.js','js/main.js','js/modules/*.js'],
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
              name: "main",
              baseUrl: "./js",
              mainConfigFile: "js/main.js",
              out: "js/main.min.js",
              include: "libs/requirejs/require"
            }
          }
        },

        clean: {
          jslibclean: [
              'js/libs/requirejs/dist', 
              'js/libs/requirejs/docs', 
              'js/libs/requirejs/tests', 
              'js/libs/requirejs-plugins/examples',  
              'js/libs/requirejs-plugins/lib', 
              'js/libs/respond/test', 
              'js/libs/respond/cross-domain', 
              'js/libs/selectivizr/tests',
              'js/libs/jquery/.gitignore',
              'js/libs/requirejs/.gitignore'
          ]
          // htmlclean: ['*.html', 'templates/*.html'] If using assemble
        },

        imagemin: {
            options: {
              optimizationLevel: 3
            },
            dynamic_mappings: {
              files: [
                {
                  expand: true, 
                  cwd: 'images/',
                  src: ['**/*.jpg','**/*.png'],
                  dest: 'images/' 
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
              assets: '',
              year: "<%= grunt.template.today('yyyy') %>",
              layout: 'generator/layouts/default.hbs',
              partials: 'generator/partials/*.hbs'
            },
            files: {
              './': ['generator/pages/*.hbs']
            }
          },
          templates: { // Example templates
            options: {
              flatten: true,
              dev: true,
              prod: false,
              year: "<%= grunt.template.today('yyyy') %>",
              layout: 'generator/layouts/templates.hbs',
              partials: 'generator/partials/*.hbs'
            },
            files: {
              'templates/': ['generator/templates/*.hbs']
            }
          }
                  
        },

        watch: {
          watchless: {
            files: [ '**/*.less' ], 
            tasks: ['less']
          },
          watchjs: {
            files: ['<%= jshint.files %>'], 
            tasks: ['jshint', 'requirejs']
          },
          watchpages: {
            files: ['generator/pages/*.hbs', 'generator/templates/*.hbs', 'generator/layouts/*.hbs', 'generator/partials/*.hbs' ], 
            tasks: ['assemble'] // add 'clean:htmlclean' if using assemble
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
    grunt.loadNpmTasks('grunt-contrib-watch', ['watch:watchless','watch:watchjs','watch:watchpages']);

    // Default Tasks
    grunt.registerTask('default', ['less','requirejs','jshint','imagemin','clean','assemble','watch']);

};