/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    // Configurable paths
    var boilerplateConfig = {
        app: "app",
        assets: "",
        dist: "dist"
    };

    grunt.initConfig({

        bp: boilerplateConfig,

        less: {
          all: {
            options: {
                paths: ["less/"]
                //compress: true
            },
            files: {
                "<%= bp.assets %>css/main.css": "<%= bp.assets %>less/main.less"
            }
          }
        },

        jshint: {
          files: ['gruntfile.js','<%= bp.assets %>js/main.js','<%= bp.assets %>js/modules/*.js'],
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
                mainConfigFile: "<%= bp.assets %>js/main.js",
                out: "<%= bp.assets %>js/main.min.js",
                include: "<%= bp.assets %>libs/requirejs/require"
            }
          }
        },

        clean: {
          jslibclean: [
              '<%= bp.assets %>js/libs/requirejs/dist', 
              '<%= bp.assets %>js/libs/requirejs/docs', 
              '<%= bp.assets %>js/libs/requirejs/tests', 
              '<%= bp.assets %>js/libs/requirejs-plugins/examples',  
              '<%= bp.assets %>js/libs/requirejs-plugins/lib', 
              '<%= bp.assets %>js/libs/respond/test', 
              '<%= bp.assets %>js/libs/respond/cross-domain', 
              '<%= bp.assets %>js/libs/selectivizr/tests',
              '<%= bp.assets %>js/libs/jquery/.gitignore',
              '<%= bp.assets %>js/libs/requirejs/.gitignore'
          ],
          htmlclean: ['*.html', '<%= bp.assets %>examples/*.html']
        },

        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dynamic_mappings: {
              files: [
                {
                expand: true, 
                cwd: '<%= bp.assets %>images/',
                src: ['**/*.jpg','**/*.png'],
                dest: '<%= bp.assets %>images/' 
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
                year: "<%= grunt.template.today('yyyy') %>",
                layout: '_templates/layouts/default.hbs',
                partials: '_templates/partials/*.hbs'
            },
            files: {
                './': ['_templates/pages/*.hbs']
            }
          },
          examples: { // Example templates
            options: {
                flatten: true,
                dev: true,
                prod: false,
                year: "<%= grunt.template.today('yyyy') %>",
                layout: '_templates/layouts/examples.hbs'
            },
            files: {
                '<%= bp.assets %>examples/': ['_templates/examples/*.hbs']
            }
          }
                  
        },

        connect: {
          server: {
            options: {
                port: 8080,
                base: ''
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
            files: ['_templates/pages/*.hbs', '_templates/templates/*.hbs', '_templates/layouts/*.hbs', '_templates/partials/*.hbs' ], 
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