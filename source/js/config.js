function config(app) {
	app.config(function ($stateProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
	});
}

module.exports = config;
