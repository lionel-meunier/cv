/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('IntroCtrl',['$scope', 'windowVisibility',function($scope, windowVisibility){
        $scope.heightWindowVisibility = windowVisibility.height;

        $scope.stylePage = function(section,element){
            if (_.isUndefined(section)) {
                return;
            }
            var style = {
                'background-color' : '#fff',
                'min-height' : windowVisibility.height,
                'min-width' : element.width
            };
            if(section.fixed){
                var styleFixed = {
                    top : 0,
                    left : element.offset.left,
                    position: 'fixed'
                };
                _.extend(style,styleFixed);
            } else if(section.sectionPosition.deb < windowVisibility.deb){
                var top = windowVisibility.deb - section.sectionPosition.deb;
                console.log(windowVisibility.deb,section.sectionPosition.deb,windowVisibility.height);
                var styleFixed = {
                    bottom : 0,
                    left : 15,
                    position: 'absolute'
                };
                _.extend(style,styleFixed);
            }
            return style



        }
    }]);

})();