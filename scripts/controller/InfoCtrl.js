/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('InfoCtrl',['$scope','info','$window',function($scope,info,$window){
        $scope.info = info;

        $scope.styleImg = function(section){
            if(section.visible){

            //Dans une directive
            var top = section.deb+100;
            console.log(section,top);
            return {
                position:'absolute',
                top : top
            };
            }
            return {};
        }
    }]);

})();