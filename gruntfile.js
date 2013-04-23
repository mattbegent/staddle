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
          files: ['grunt.js','js/modules/*.js'],
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
              out: "js/main-min.js"
            }
          }
        },

        watch: {
          scripts: {
            files: ['**/*.less','<%= jshint.files %>'],
            tasks: ['less', 'jshint']
          }
        }      

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default Tasks
    grunt.registerTask('default', ['less','requirejs','jshint']);

};