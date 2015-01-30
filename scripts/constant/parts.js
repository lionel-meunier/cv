/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    mod.constant('parts',[
        {
            name : 'presentation',
            templateUrl : 'views/presentation.html'
        },
        {
            name : 'careers',
            templateUrl : 'views/careers.html'
        },
        {
            name : 'education',
            templateUrl : 'views/education.html'
        },
        {
            name : 'training',
            templateUrl : 'views/training.html'
        },
        {
            children: [
                {
                    name: 'front',
                    templateUrl: 'views/competence/front.html'
                },
                {
                    name: 'back',
                    templateUrl: 'views/competence/back.html'
                },
                {
                    name: 'other',
                    templateUrl: 'views/competence/other.html'
                }
            ]
        }
    ]);

})();