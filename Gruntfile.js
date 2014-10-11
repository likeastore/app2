module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dev: {
				files: {
					'source/js/bundle.js': ['source/js/app.js']
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'source/sass',
					cssDir: 'source/css',
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n',
				mangle: false
			},
			main: {
				files: {
					'public/js/bundle.js': ['source/js/bundle.js']
				}
			}
		},
		jshint: {
			files: ['source/**/*.js']
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n'
			},
			minify:{
				files: {
					'public/css/main.css': ['source/css/main.css']
				}
			}
		},
		watch: {
			src: {
				files: 'source/**/*.js',
				tasks: ['browserify'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: 'source/sass/*.scss',
				tasks: ['compass'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['source/**/*.html', 'source/**/*.css'],
				options: {
					livereload: true
				}
			}
		},
		htmlbuild: {
			main: {
				src: 'source/index.html',
				dest: 'public/index.html'
			}
		},
		connect: {
			dev: {
				options: {
					base: 'source',
					hostname: 'localhost',
					port: 5000,
					open: true
				}
			},
			dist: {
				options: {
					base: 'public',
					hostname: 'localhost',
					port: 5001,
					open: true
				}
			}
		},
		copy: {
			images: {
				cwd: 'source/images',
				src: '**/*',
				dest: 'public/images',
				expand: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html-build');

	grunt.registerTask('build', ['jshint', 'browserify', 'uglify', 'compass']);
	grunt.registerTask('start:dev', ['build', 'connect:dev', 'watch']);

	grunt.registerTask('dist', ['build', 'cssmin', 'htmlbuild', 'copy']);
	grunt.registerTask('start:prod', ['dist', 'connect:prod']);
};
