require('./dependencies');
require('./controllers');

var angular = require('angular');
var app = angular.module('app', ['ui.router', 'controllers']);

module.exports = app;
