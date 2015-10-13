

var config = require('./config.json');

module.exports = function(grunt) {

    var options = {
        port: 8080
    };

    grunt.initConfig({
          options: options,
          pkg: grunt.file.readJSON('package.json'),
          connect: {
              server: {
                  options: {
                      port: options.port,
                      base: '.'
                  }
              }
          },
          open: {
              server: {
                  path: 'http://localhost:<%= options.port %>/'
              }
          },
          react: {
              combined_file_output: {
                files: {
                  'js/combined.js': [
                    'js/actions.js',
                    'js/store.js',
                    'js/components.jsx.js'
                  ]
                }
              }
            },
          uglify: {
              options: {
                mangle: false
              },
              my_target: {
                files: {  
                  'build/app.js': [
                  'app/bower_components/jquery/dist/jquery.min.js',
                  'app/bower_components/react/react-with-addons.js',
                  'app/bower_components/lodash/lodash.js',
                  'app/bower_components/reflux/dist/reflux.js',
                  'app/bower_components/numeral/numeral.js',
                  'js/combined.js'
                  ] 
                }
              }
          },
          cssmin: {
            // need to set folder paths 
            target: {
              files: [{
                expand: true,
                cwd: 'css/',
                src: ['*.css', ' *.css'],
                dest: 'build/',
                ext: '.min.css'
              }]
            }
          },
          exec: {
            copy_assets: 'cp -R assets build/',
            setcors1: 'curl -i -XPOST -H "x-auth-token: AAAjsa_xjRngWXD-0R3mwXcK7AKbN94xPw_tGQk2LVIf_RnCR9KZPmY13xp-OrxRgcRjQj56JfP9xp4sLSzv-DMCOpoVZ5B-FDSTJTSM_U21owoAH8i6xdL9jyvhQ-7t7yJlaj9U7X29cw" -H "Access-Control-Expose-Headers: Access-Control-Allow-Origin" -H "Access-Control-Allow-Origin: *" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_714ef022-5f5d-4424-ac61-daad9163eaec/rentCalc/rentcalc/build/assets/icons/flaticon.ttf', 
            setcors2: 'curl -i -XPOST -H "x-auth-token: AAAjsa_xjRngWXD-0R3mwXcK7AKbN94xPw_tGQk2LVIf_RnCR9KZPmY13xp-OrxRgcRjQj56JfP9xp4sLSzv-DMCOpoVZ5B-FDSTJTSM_U21owoAH8i6xdL9jyvhQ-7t7yJlaj9U7X29cw" -H "Access-Control-Expose-Headers: Access-Control-Allow-Origin" -H "Access-Control-Allow-Origin: *" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_714ef022-5f5d-4424-ac61-daad9163eaec/rentCalc/rentcalc/build/assets/icons/flaticon.svg',
            setcors3: 'curl -i -XPOST -H "x-auth-token: AAAjsa_xjRngWXD-0R3mwXcK7AKbN94xPw_tGQk2LVIf_RnCR9KZPmY13xp-OrxRgcRjQj56JfP9xp4sLSzv-DMCOpoVZ5B-FDSTJTSM_U21owoAH8i6xdL9jyvhQ-7t7yJlaj9U7X29cw" -H "Access-Control-Expose-Headers: Access-Control-Allow-Origin" -H "Access-Control-Allow-Origin: *" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_714ef022-5f5d-4424-ac61-daad9163eaec/rentCalc/rentcalc/build/assets/icons/flaticon.eot',
            setcors4: 'curl -i -XPOST -H "x-auth-token: AAAjsa_xjRngWXD-0R3mwXcK7AKbN94xPw_tGQk2LVIf_RnCR9KZPmY13xp-OrxRgcRjQj56JfP9xp4sLSzv-DMCOpoVZ5B-FDSTJTSM_U21owoAH8i6xdL9jyvhQ-7t7yJlaj9U7X29cw" -H "Access-Control-Expose-Headers: Access-Control-Allow-Origin" -H "Access-Control-Allow-Origin: *" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_714ef022-5f5d-4424-ac61-daad9163eaec/rentCalc/rentcalc/build/assets/icons/flaticon.woff',
            setcors5: 'curl -i -XPOST -H "x-auth-token: AAAjsa_xjRngWXD-0R3mwXcK7AKbN94xPw_tGQk2LVIf_RnCR9KZPmY13xp-OrxRgcRjQj56JfP9xp4sLSzv-DMCOpoVZ5B-FDSTJTSM_U21owoAH8i6xdL9jyvhQ-7t7yJlaj9U7X29cw" -H "Access-Control-Expose-Headers: Access-Control-Allow-Origin" -H "Access-Control-Allow-Origin: *" https://storage101.ord1.clouddrive.com/v1/MossoCloudFS_714ef022-5f5d-4424-ac61-daad9163eaec/rentCalc/rentcalc/build/assets/icons/flaticon.css'
          },

          watch: {

          },
          cloudfiles: {
            prod: {
              'user': config.cloudfiles.user,
              'key': config.cloudfiles.key,
              'region': config.cloudfiles.region,
              'upload': [{
                'container': config.cloudfiles.container,
                'src': config.cloudfiles.source, 
                'dest': config.cloudfiles.destination
              }]
            }
          }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

     grunt.loadNpmTasks('grunt-cloudfiles'); 
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-react');
     grunt.loadNpmTasks('grunt-exec');
      grunt.registerTask('default', ['connect', 'open', 'watch']);    
      grunt.registerTask('build', ['react', 'uglify', 'cssmin']);    
};