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

    angular.module('CvLme',depth)

})();