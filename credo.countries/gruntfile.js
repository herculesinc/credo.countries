module.exports = function (grunt) {
    
    grunt.initConfig({
        copy: {
            packagejson: {
                src: 'package.json',
                dest: 'bin/package.json',
            },
            data: {
                src: 'data/*',
                dest: 'bin/',
            },
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['copy']);
};