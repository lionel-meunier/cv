/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('RootCtrl', ['$scope', 'info', 'motivation', function ($scope, info, motivation) {

        $scope.info = info;

        $scope.motivation = motivation;

        $scope.addSection = function(){
            $scope.motivation.sections.push({text:''});
        }
    }]);

    mod.filter('classBoot', [function () {
        return function (a, b, c) {
            var classReturn = '';
            if (c === 1) {
                a += (12 / b);
                classReturn += a + ' ';
            }
            classReturn += 'niv-' + c;
            return classReturn;
        }
    }]);

    mod.filter('age', ['$window', function ($window) {
        return function (birthday) {
            var moment = $window.moment;
            var years = moment(new Date()).diff(moment(birthday), 'years');
            var strReturn = years;
            if (years > 1) {
                strReturn += ' ans';
            } else {
                strReturn += ' an';
            }
            return strReturn;
        }
    }]);

})();