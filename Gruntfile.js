module.exports = function (grunt) {
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dev: {
				files: {
					'source/build/app.js': ['source/js/app.js']
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
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */',
				mangle: false
			},
			main: {
				files: {
					'public/build/app.js': ['source/build/app.js']
				}
			}
		},
		jshint: {
			files: ['source/**/*.js']
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */'
			},
			minify:{
				files: {
					'public/css/main.css': ['source/css/main.css']
				}
			}
		},
		watch: {
			src: {
				files: ['source/**/*.js', '!source/build/app.js'],
				tasks: ['jshint', 'browserify'],
				// options: {
				// 	livereload: true
				// }
			},
			sass: {
				files: 'source/sass/*.scss',
				tasks: ['compass'],
				// options: {
				// 	livereload: true
				// }
			},
			html: {
				files: ['source/**/*.html', 'source/**/*.css'],
				// options: {
				// 	livereload: true
				// }
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
			},
			bootstrap: {
				cwd: 'source/css/bootstrap',
				src: '**/*',
				dest: 'public/css/bootstrap',
				expand: true
			},
			fontello: {
				cwd: 'source/css/fontello',
				src: '**/*',
				dest: 'public/css/fontello',
				expand: true
			},
			views: {
				cwd: 'source/views',
				src: '**/*',
				dest: 'public/views',
				expand: true
			}
		},
		shell: {
			deploy: {
				command: 'git subtree push --prefix public production master'
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
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('dev', ['jshint', 'browserify', 'compass']);
	grunt.registerTask('start:dev', ['dev', 'connect:dev', 'watch']);

	grunt.registerTask('dist', ['dev', 'uglify', 'cssmin', 'htmlbuild', 'copy']);
	grunt.registerTask('start:dist', ['dist', 'connect:dist', 'watch']);

	grunt.registerTask('deploy', ['dist', 'shell']);

	grunt.registerTask('default', 'dev');
};
