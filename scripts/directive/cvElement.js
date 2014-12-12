/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');


    mod.directive('cvElement', ['$parse',function ($parse) {
        return {
            restrict: 'A',
            scope : true,
            link : function(scope,element,attr){
                scope.$element = {
                    offset : element.offset(),
                    height : element.height(),
                    width : element.width()
                };

                scope.$watch(function(){
                    return element.height();
                },function(n){
                    scope.$element.height = n;
                });

                scope.$watch(function(){
                    return element.width();
                },function(n){
                    scope.$element.width = n;
                });

                scope.$watch(function(){
                    return element.offset();
                },function(n){
                    scope.$element.offset = n;
                },true);

                attr.$observe('cvElement',function(n){
                    if (!_(n).isBlank()) {
                        var exp = n +' = $element';
                        $parse(exp)(scope);
                    }
                });
            }
        }
    }]);

})();