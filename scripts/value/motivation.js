/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.value('motivation', {
        object : 'Offre de Développeur Frontend',
        company : {
            address : 'fezfe zef ez ez',
            name : 'IOcean',
            phone : '04 00 00 00 00',
            email : 'pp@test.fr'
        },
        sections : [
            {
                text : 'Bonjour,'
            },
            {
                text : 'Bonjour, \n\t\t\tttest'
            }
        ]
    });

})
();