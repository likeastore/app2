function router(app) {
	app.config(function ($stateProvider, $locationProvider) {
		$stateProvider
			.state('feed', {
				url: 'feed',
				templateUrl: 'views/feed.html'
			})
			.state('topics', {
				url: 'topics',
				templateUrl: 'views/topics.html'
			})
			.state('favorites', {
				url: 'favorites',
				templateUrl: 'views/favorites.html'
			})
			.state('search', {
				url: 'search',
				templateUrl: 'views/search.html'
			})
			.state('connections', {
				url: 'connections',
				templateUrl: 'views/connections.html'
			});

		$locationProvider.html5Mode(true);
	});
}

module.exports = router;
