function router(app) {
	app.config(function ($stateProvider, $locationProvider) {
		$stateProvider
			.state('feed', {
				url: '/feed',
				templateUrl: 'views/feed.html'
			});

		$locationProvider.html5Mode(true);
	});
}

module.exports = router;
