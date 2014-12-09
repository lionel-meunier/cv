/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';
    //for use underscore.string
    _.mixin(_.string.exports());
    _.mixin({
        deepClone: function (object) {
            return jQuery.extend(true, {}, object);
        }
    });
    var depth = new Array();

    depth.push('ngAnimate');
    //depth.push('duScroll');
    angular.module('CvLme',depth);


    /**
     * Config
     */
    angular.module('CvLme').config(function($locationProvider) {
        //$locationProvider.html5Mode(true);
    });

    /**
     * Scroll config
     */
    angular.module('CvLme').value('duScrollDuration',2000);
    angular.module('CvLme').value('duScrollOffset',30);

})();