/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.constant('info', {
        general: {
            lastName: 'Meunier',
            firstName: 'Lionel',
            email: 'lionel.meunier@outlook.fr',
            web: 'urlcv',
            phone: 'urlcv',
            picture: 'images/lme-clair.JPG',
            title: 'Développeur FrontEnd',
            links: [
                {
                    name: 'github',
                    icon: 'fa-github',
                    url: 'https://github.com/lionel-meunier'
                },
                {
                    name: 'google',
                    icon: 'fa-google-plus',
                    url: 'https://plus.google.com/u/0/102614516866057883864/about'
                }
            ]
        },
        careers: [
            {
                date: new Date('2009-06-01'),
                name: 'IOcean',
                title: 'Développeur Web',
                mission: 'Développeur Frontend, expert HTML/CSS et Javascript',
                type: 'CDI'
            },
            {
                date: new Date('2008-11-01'),
                name: 'IQuest',
                title: 'Développeur Web',
                mission: 'Développeur TYPO3',
                type: 'CDD'
            }
        ],
        education: [
            {
                dateBegin: new Date('2003-10-01'),
                dateEnd: new Date('2007-06-01'),
                title: 'Licence Professionel en Informatique',
                localisation: 'Université Montpellier 2'
            },
            {
                dateBegin: new Date('2003-10-01'),
                dateEnd: new Date('2007-06-01'),
                title: 'Formation CNAM en Informatique',
                localisation: 'CNAM-LR'
            }
        ],
        training: [
            {
                date: new Date('2008-10-1'),
                title: 'Formation expertise CSS',
                formateur: {
                    name: 'Raphaël Goetter',
                    url: 'http://www.goetter.fr/',
                    societe: {
                        name: 'Alsacréation',
                        url: 'http://www.alsacreations.com/'
                    }

                }
            },
            {
                date: new Date('2008-10-1'),
                title: 'Formation Expertise JQuery',
                formateur: {
                    name: 'Rodolphe Rimelé',
                    url: 'http://www.alsacreations.fr/a-propos.html#rodolphe',
                    societe: {
                        name: 'Alsacréation',
                        url: 'http://www.alsacreations.com/'
                    }
                }
            },
            {
                date: new Date('2008-10-1'),
                title: 'Formation AngularJS',
                formateur: {
                    name: 'Thierry Chatel',
                    url: 'http://www.methotic.com/formation-angularjs#formation-me',
                    societe: {
                        name: 'MethoTIC Conseil',
                        url: 'http://www.methotic.com/formation-angularjs'
                    }
                }
            }
        ],
        competence: [
            {
                name: 'Frontend',
                children: [
                    {
                        name: 'HTML',
                        children: [
                            {
                                name: 'html5',
                                logo: 'fa-html'
                            },
                            {
                                name: 'jade',
                                logo: 'fa-jade'
                            }
                        ]
                    },
                    {
                        name: 'CSS',
                        children: [
                            {
                                name: 'CSS3',
                                logo: 'fa-jade'
                            },
                            {
                                name: 'LESS',
                                logo: 'fa-jade'
                            },
                            {
                                name: 'SASS',
                                logo: 'fa-jade'
                            }
                        ]
                    },
                    {
                        name: 'JS',
                        children: [
                            {
                                name: 'Angular JS',
                                logo: 'fa-facebook'
                            },
                            {
                                name: 'jQuery',
                                logo: 'fa-facebook'
                            },
                            {
                                name: 'ExtJS',
                                logo: 'fa-facebook'
                            }
                            ,
                            {
                                name: 'Reveal',
                                logo: 'fa-facebook'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Frontend',
                children: [
                    {
                        name: 'Php',
                        children: [{
                            name: 'PHP5',
                            logo: 'fa-facebook'
                        },
                            {
                                name: 'TYPO3',
                                logo: 'fa-facebook'
                            }]
                    }, {
                        name: 'Java',
                        children: [
                            {
                                name: 'Spring',
                                logo: 'fa-facebook'
                            },
                            {
                                name: 'JSF',
                                logo: 'fa-facebook'
                            }
                        ]
                    }, {
                        name: 'NodeJs',
                        children: [{
                            name: 'express',
                            logo: 'fa-facebook'
                        },
                            {
                                name: 'io-socket',
                                logo: 'fa-facebook'
                            }]
                    }, {
                        name: 'Mobile',
                        children: [{
                            name: 'Titanium',
                            logo: 'fa-facebook'
                        },
                            {
                                name: 'Phonegap',
                                logo: 'fa-facebook'
                            }]
                    }
                ]
            },
            {
                name: 'Other',
                children: [{
                    name: 'Conception',
                    desc: 'MVC, ORM'
                },
                    {
                        name: 'Versioning',
                        desc: 'Git, SVN'
                    },
                    {
                        name: 'Outils',
                        desc: 'Grunt, Bower, Gulp, Yeoman'
                    },
                    {
                        name: 'Test',
                        desc: 'Karma/Jasmine, Mocha, Protractor'
                    },
                    {
                        name: 'Framework',
                        desc: 'Bootstrap 2 et 3, Angular Material Design'
                    },
                    {
                        name: 'API',
                        desc: 'Google Map, Twitter, Facebook'
                    }]
            }
        ]


    });

})
();