/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.constant('info', {
        lastName : 'Meunier',
        firstName : 'Lionel',
        email : 'crypted',
        web : 'urlcv',
        picture : 'images/picture.png',
        title : 'Développeur FrontEnd',
        links : [
            {
                name : 'github',
                icon : 'fa-github',
                url : 'urlGithub'
            },
            {
                name : 'google',
                icon : 'fa-google-plus',
                url : 'urlGoogle'
            }
        ]
        });

})();