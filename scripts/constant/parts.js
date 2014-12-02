/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.constant('parts',[

        {
            name : 'info',
            templateUrl : 'views/info.html'
        },
        {
            name : 'intro',
            templateUrl : 'views/intro.html'
        },
        {
            name : 'xp',
            templateUrl : 'views/xp.html'
        },
        {
            name : 'tech',
            templateUrl : 'views/tech.html'
        },
        {
            name : 'school',
            templateUrl : 'views/school.html'
        }
    ]);

})();