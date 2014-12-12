/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');


    mod.directive('cvElement', [function () {
        return {
            restrict: 'A',
            link : function(scope,element,attr){

                scope.$element = {
                    offset : element.offset(),
                    height : element.height(),
                    width : element.width()
                };
            }
        }
    }]);

})();