/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('RootCtrl',['$scope','parts','$timeout',function($scope,parts,$timeout){
        $scope.parts = parts;
        //$timeout(function(){
        //    _.each(parts,function(part){
        //        $scope.parts.push(part);
        //    });
        //},500);




    }]);

})();