

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

    grunt.registerTask('default', ['connect', 'open', 'watch']);    
};