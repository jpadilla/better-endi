module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('chrome/manifest.json'),

    clean: {
      build: ['chrome/build']
    },

    copy: {
      chrome: {
        files: [
          {
            expand: true,
            src: ['chrome/icons/*'],
            dest: 'build/chrome/icons/',
            flatten: true
          },
          {
            expand: true,
            src: ['chrome/manifest.json'],
            dest: 'build/chrome/',
            filter: 'isFile',
            flatten: true
          }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/* <%= manifest.name %> <%= manifest.version %> */\n'
      },
      dist: {
        files: {
          'build/chrome/background.js': ['chrome/background.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['chrome/**/*'],
        tasks: ['default']
      }
    },

    compress: {
      main: {
        options: {
          archive: 'dist/chrome/<%= manifest.short_name %>-<%= manifest.version %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/chrome/',
            src: ['**/*'],
            dest: '<%= manifest.short_name %><%= manifest.version %>'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['clean', 'copy', 'uglify']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('build:dist', ['default', 'compress']);
};
