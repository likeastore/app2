function config(app) {
	app.config(function ($locationProvider) {
		$locationProvider.html5Mode(true);
	});
}

module.exports = config;
