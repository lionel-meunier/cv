/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('IntroCtrl',['$scope', 'windowVisibility',function($scope, windowVisibility){
        $scope.heightWindowVisibility = windowVisibility.height;
        $scope.data = {
        };

        $scope.stylePage = function(section,element){
            if (_.isUndefined(section)) {
                return;
            }
            console.log(element);
            var style = {
                'background-color' : '#fff',
                'min-height' : windowVisibility.height,
                'min-width' : element.width,
                'max-width' : '100%'
            };
            if(section.fixed){
                var styleFixed = {
                    top : 0,
                    left : element.offset.left,
                    position: 'fixed',
                    'min-width' : element.width
                };
                _.extend(style,styleFixed);
            } else if(section.sectionPosition.deb < windowVisibility.deb){
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