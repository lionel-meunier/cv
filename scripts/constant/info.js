/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.constant('info', {
        general : {
            lastName : 'Meunier',
            firstName : 'Lionel',
            email : 'crypted',
            web : 'urlcv',
            phone : 'urlcv',
            picture : 'images/picture.png',
            title : 'Développeur FrontEnd',
            links : [
                {
                    name : 'github',
                    icon : 'fa-github',
                    url : 'https://github.com/lionel-meunier'
                },
                {
                    name : 'google',
                    icon : 'fa-google-plus',
                    url : 'https://plus.google.com/u/0/102614516866057883864/about'
                }
            ]
        },
        careers : [
            {
                date : new Date('2009-06-01'),
                name : 'IOcean',
                title : 'Développeur Web',
                mission : 'Développeur Frontend, expert HTML/CSS et Javascript',
                type : 'CDI'
            },
            {
                date : new Date('2009-05-01'),
                name : 'IOcean',
                title : 'Développeur Web',
                mission : 'Expert TYPO3',
                type : 'CDD'
            },
            {
                date : new Date('2008-11-01'),
                name : 'IQuest',
                title : 'Développeur Web',
                mission : 'Développeur TYPO3',
                type : 'CDD'
            }
        ],
        education : [
            {
                dateBegin : new Date('2000-06-01'),
                dateEnd : new Date('2002-06-01'),
                title : 'Bac STI Électronique',
                localisation : 'Lycée Dhuoda Nîmes'
            },
            {
                dateBegin : new Date('2002-09-01'),
                dateEnd : new Date('2003-06-01'),
                title : 'Math Sup PTSI',
                localisation : 'Lycée Jean Baptiste Dumas Alès'
            },
            {
                dateBegin : new Date('2003-10-01'),
                dateEnd : new Date('2007-06-01'),
                title : 'Licence Professionel en Informatique',
                localisation : 'Université Montpellier 2'
            }
        ],
        training : [
            {
                date : new Date('2008-10-1'),
                title : 'Formation expertise CSS',
                formateur : {
                    name : 'Raphaël Goetter',
                    url : 'http://www.goetter.fr/',
                    societe : {
                        name : 'Alsacréation',
                        url : 'http://www.alsacreations.com/'
                    }

                }
            },
            {
                date : new Date('2008-10-1'),
                title : 'Formation Expertise JQuery',
                formateur : {
                    name : 'Rodolphe Rimelé',
                    url : 'http://www.alsacreations.fr/a-propos.html#rodolphe',
                    societe : {
                        name : 'Alsacréation',
                        url : 'http://www.alsacreations.com/'
                    }
                }
            },
            {
                date : new Date('2008-10-1'),
                title : 'Formation AngularJS',
                formateur : {
                    name : 'Thierry Chatel',
                    url : 'http://www.methotic.com/formation-angularjs#formation-me',
                    societe : {
                        name : 'MethoTIC Conseil',
                        url : 'http://www.methotic.com/formation-angularjs'
                    }
                }
            }
        ],
        competence : {
            front : {
                html : [
                    {
                        title : 'html5',
                        logo : 'fa-html'
                    },
                    {
                        title : 'jade',
                        logo : 'fa-jade'
                    }
                ],
                css : [
                    {
                        title : 'CSS3',
                        logo : 'fa-jade'
                    },
                    {
                        title : 'LESS',
                        logo : 'fa-jade'
                    },
                    {
                        title : 'SASS',
                        logo : 'fa-jade'
                    }
                ],
                javascript : [
                    {
                        title : 'Angular JS',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'jQuery',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'ExtJS',
                        logo : 'fa-facebook'
                    }
                    ,
                    {
                        title : 'Reveal',
                        logo : 'fa-facebook'
                    }
                ]
            },
            backend : {
                php : [
                    {
                        title : 'PHP5',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'TYPO3',
                        logo : 'fa-facebook'
                    }
                ],
                java : [
                    {
                        title : 'Spring',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'JSF',
                        logo : 'fa-facebook'
                    }
                ],
                nodejs : [
                    {
                        title : 'express',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'io-socket',
                        logo : 'fa-facebook'
                    }
                ],
                mobile : [
                    {
                        title : 'Titanium',
                        logo : 'fa-facebook'
                    },
                    {
                        title : 'Phonegap',
                        logo : 'fa-facebook'
                    }
                ]
            },
            other : [
                {
                 title : 'Conception',
                 desc : 'MVC, ORM'
                },
                {
                    title : 'Versioning',
                    desc : 'Git, SVN'
                },
                {
                    title : 'Outils',
                    desc : 'Grunt, Bower, Gulp, Yeoman'
                },
                {
                    title : 'Test',
                    desc : 'Karma/Jasmine, Mocha, Protractor'
                },
                {
                    title : 'Framework',
                    desc : 'Bootstrap 2 et 3, Angular Material Design'
                },
                {
                    title : 'API',
                    desc : 'Google Map, Twitter, Facebook'
                }
            ]
        }





        });

})();