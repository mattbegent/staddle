/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
          all: {
            options: {
              paths: ['<%= pkg.staddle.less %>/'],
              cleancss: true
            },
            files: {
              '<%= pkg.staddle.site %>/<%= pkg.staddle.css %>/main.css': '<%= pkg.staddle.less %>/main.less'
            }
          }
        },

        jshint: {
          files: ['gruntfile.js','<%= pkg.staddle.js %>/main.js','<%= pkg.staddle.js %>/modules/*.js','!<%= pkg.staddle.js %>/modules/flickr.js'],
          options: {
            globals: {
              jQuery: true,
              console: true
            }
          }
        },

        uglify: {
          options: {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          my_target: {
            files: {
              '<%= pkg.staddle.site %>/<%= pkg.staddle.js %>/main.min.js': ['<%= pkg.staddle.js %>/main.js','<%= pkg.staddle.js %>/modules/*.js','!<%= pkg.staddle.js %>/modules/_template.js']
            } 
          }
        },

        clean: {
          jslibs: [
            '<%= pkg.staddle.js %>/libs/jquery/**/*',
            '!<%= pkg.staddle.js %>/libs/jquery/jquery.min.js',
            '<%= pkg.staddle.js %>/libs/jquery/.gitignore',
            '<%= pkg.staddle.js %>/libs/requirejs/**/*', 
            '!<%= pkg.staddle.js %>/libs/requirejs/require.js', 
            '<%= pkg.staddle.js %>/libs/requirejs/.gitignore',  
            '<%= pkg.staddle.js %>/libs/respond/**/*', 
            '!<%= pkg.staddle.js %>/libs/respond/respond.min.js', 
            '<%= pkg.staddle.js %>/libs/selectivizr/**/*',
            '!<%= pkg.staddle.js %>/libs/selectivizr/selectivizr.js'
          ],
          html: ['<%= pkg.staddle.site %>/**/*.html','!<%= pkg.staddle.site %>/<%= pkg.staddle.assets %>/**/*.html']
        },

        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dynamic_mappings: {
              files: [
                {
                  expand: true, 
                  cwd: '<%= pkg.staddle.img %>/',
                  src: ['**/*.jpg','**/*.png'],
                  dest: '<%= pkg.staddle.site %>/<%= pkg.staddle.img %>' 
                }
              ]
            }
        },

        assemble: {
          pages: {
            options: {
              dev: '<%= pkg.staddle.dev %>',
              flatten: false,
              assets: '<%= pkg.staddle.site %>/<%= pkg.staddle.assets %>',
              year: '<%= grunt.template.today("yyyy") %>',
              layout: '<%= pkg.staddle.content %>/<%= pkg.staddle.layouts %>/default.hbs',
              partials: '<%= pkg.staddle.content %>/<%= pkg.staddle.partials %>/**/*.hbs'
            },
            files: [
              {
                expand: true,
                cwd: '<%= pkg.staddle.content %>/',
                src: ['**/*.hbs', '!<%= pkg.staddle.layouts %>/**/*.hbs','!<%= pkg.staddle.partials %>/**/*.hbs'],
                dest: '<%= pkg.staddle.site %>/'
              }
            ]
          }               
        },

        copy: {
          assets: { // Not less, js or img
            files: [ 
              { 
                expand: true,
                src: ['<%= pkg.staddle.assets %>/**/*', '!<%= pkg.staddle.less %>/**/*', '!<%= pkg.staddle.js %>/**/*', '!<%= pkg.staddle.img %>/**/*'], 
                dest: '<%= pkg.staddle.site %>/',
                filter: 'isFile' 
              }
            ]
          },
          jslibs: { 
            files: [
              { 
                src: '<%= pkg.staddle.js %>/libs/respond/respond.min.js', 
                dest: '<%= pkg.staddle.site %>/<%= pkg.staddle.js %>/libs/respond/respond.min.js' 
              },
              { 
                src: '<%= pkg.staddle.js %>/libs/selectivizr/selectivizr.js', 
                dest: '<%= pkg.staddle.site %>/<%= pkg.staddle.js %>/libs/selectivizr/selectivizr.js' 
              },
              { 
                src: '<%= pkg.staddle.js %>/libs/jquery/jquery.min.js', 
                dest: '<%= pkg.staddle.site %>/<%= pkg.staddle.js %>/libs/jquery/jquery.min.js' 
              } 
            ]
          }
        },

        connect: {
          server: {
            options: {
              port: '<%= pkg.staddle.port %>',
              base: '<%= pkg.staddle.site %>'
            }
          }
        },

        watch: {
          options: {
            livereload: true
          },
          watchless: {
            files: ['<%= pkg.staddle.less %>/**/*.less' ], 
            tasks: ['less']
          },
          watchjs: {
            files: ['<%= pkg.staddle.js %>/main.js','<%= pkg.staddle.js %>/modules/*.js'], 
            tasks: ['jshint','uglify']
          },
          watchimages: {
            files: [
              '<%= pkg.staddle.img %>/**/*.jpg',
              '<%= pkg.staddle.img %>/**/*.png'
            ], 
            tasks: ['imagemin']
          },
          watchassets: {
            files: [
              '<%= pkg.staddle.assets %>/**/*', 
              '!<%= pkg.staddle.less %>/**/*', 
              '!<%= pkg.staddle.js %>/**/*', 
              '!<%= pkg.staddle.img %>/**/*'
            ], 
            tasks: ['copy:assets']
          },
          watchcontent: {
            files: [
              '<%= pkg.staddle.content %>/**/*.hbs'
            ], 
            tasks: ['clean:html','assemble']
          }
        }    

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default Tasks
    grunt.registerTask('default', ['less','jshint','uglify','imagemin','clean','assemble','copy','connect','watch']);

};