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

        clean: [
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
        ],

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

        // Used for example templates
        template: {
          index: {
            src: "templates/src/index.ejs",
            dest: 'templates/index.html',
            variables: {
              title : "Boilerplate Presents",
              currentPage: "Home"
            }
          },  
          col2: {
            src: "templates/src/2column.ejs",
            dest: 'templates/2column.html',
            variables: {
              title : "2 Column",
              currentPage: "2 Column"
            }
          },
          col3: {
            src: "templates/src/3column.ejs",
            dest: 'templates/3column.html',
            variables: {
              title : "3 Column",
              currentPage: "3 Column"
            }
          },
          grid: {
            src: "templates/src/grid.ejs",
            dest: 'templates/grid.html',
            variables: {
              title : "Grid",
              currentPage: "Grid"
            }
          },
          news: {
            src: "templates/src/news.ejs",
            dest: 'templates/news.html',
            variables: {
              title : "News",
              currentPage: "News"
            }
          },
          contact: {
            src: "templates/src/contact.ejs",
            dest: 'templates/contact.html',
            variables: {
              title : "Contact",
              currentPage: "Contact"
            }
          },
          pagenotfound: {
            src: "templates/src/404.ejs",
            dest: 'templates/404.html',
            variables: {
              title : "Page Not Found",
              currentPage: "404"
            }
          },
          gallery: {
            src: "templates/src/gallery.ejs",
            dest: 'templates/gallery.html',
            variables: {
              title : "Gallery",
              currentPage: "Gallery"
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
          watchejs: {
            files: ['templates/src/**/*.ejs'], 
            tasks: ['template']
          }
        }    

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-templater');
    grunt.loadNpmTasks('grunt-contrib-watch', ['watch:watchless','watch:watchjs','watch:watchejs']);

    // Default Tasks
    grunt.registerTask('default', ['less','requirejs','jshint','clean','imagemin','template','watch']);

};