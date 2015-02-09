/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('RootCtrl', ['$scope', 'info', function ($scope, info) {

        $scope.info = info;
    }]);

    mod.filter('classBoot',[function(){
        return function(a,b,c){
            var classReturn = '';
            if(c === 1){
                a += (12/b);
                classReturn += a+' ';
            }
            classReturn += 'niv-'+c;
            return classReturn;
        }
    }]);

})();