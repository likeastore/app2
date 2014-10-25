function router(app) {
	app.config(function ($stateProvider, $locationProvider) {
		$stateProvider
			.state('feed', {
				url: '/feed',
				templateUrl: 'views/feed.html'
			})
			.state('topics', {
				url: '/topics',
				templateUrl: 'views/topics.html'
			})
			.state('favorites', {
				url: '/favorites',
				templateUrl: 'views/favorites.html'
			});

		$locationProvider.html5Mode(true);
	});
}

module.exports = router;
