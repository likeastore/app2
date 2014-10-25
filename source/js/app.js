require('./dependencies');
require('./controllers');

var angular = require('angular');
var app = angular.module('app', ['ui.router', 'controllers']);

require('./config')(app);
require('./router')(app);

module.exports = app;
