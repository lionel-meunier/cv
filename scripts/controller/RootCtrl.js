/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('RootCtrl', ['$scope', 'parts', 'reveal', 'info', function ($scope, parts, reveal, info) {

        $scope.sections = parts;
        $scope.info = info;

        reveal.init();

        $scope.left = function () {
            console.log('left');
        };
        $scope.right = function () {
            console.log('right');
        };
        $scope.up = function () {
            console.log('up');
        };
        $scope.down = function () {
            console.log('down');
        };
    }]);

})();