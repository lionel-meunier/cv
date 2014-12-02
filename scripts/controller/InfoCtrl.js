/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('InfoCtrl',['$scope','info',function($scope,info){
        $scope.info = info;
    }]);

})();