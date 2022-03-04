// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; \n*/\n'
            },
            build: {
                files: {
                    'dist/js/main.min.js': './src/js/**/*.js',
                    'dist/js/libs.min.js': './lib/js/**/*.js'
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
          options: {
            banner: '/*\n &lt;%= pkg.name %> &lt;%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
            files: {
              'dist/css/style.min.css' : './src/css/style.css',
              'dist/css/libs.min.css'  : './lib/css/**/*.css'
            }
          }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['uglify', 'cssmin']);

};
