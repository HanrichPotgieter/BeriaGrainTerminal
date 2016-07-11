angular
    .module('app')
    .factory('socket', function($http) {
    var socket = io();

    return socket;
    });
