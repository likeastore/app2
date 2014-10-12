var angular = require('angular');

var controllers = angular.module('controllers', []);

controllers.controller('homeController', require('./homeController.js'));

module.exports = controllers;
