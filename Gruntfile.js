

var config = require('config.json');


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
        watch: {

        },
        cloudfiles: {
          prod: {
            // need to input cloudfiles data 
            'user': 'your Rackspace username',
            'key': 'your Rackspace API key',
            'region': 'DFW',
            'upload': [{
              'container': 'name of your Cloud Files container',
              'src': 'source/static/**/*',
              'dest': 'some/folder/',
              'stripcomponents': 1,
              'purge': {
                'emails': ['your@email.com'],
                'files': ['index.html']
              }
            }]
          }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

     grunt.loadNpmTasks('grunt-cloudfiles'); 

    grunt.registerTask('default', ['connect', 'open', 'watch']);    
};