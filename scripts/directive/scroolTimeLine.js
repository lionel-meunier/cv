/**
 * Created by lmeunier on 02/12/14.
 */
(function(){
    'use strict';

    var mod = angular.module('CvLme');

    /**
     * Permet de créer dans le body en bas une time line correspondant au scrool
     */
    mod.directive('scroolTimeLine',['$window','$document','$timeout',function($window,$document,$timeout){
        return {
            restrict : 'A',
            template : '<div class="timeline-cursor"></div><div class="timeline-bar"></div>',
            link : function(scope,element,attrs){

                element.addClass('timeline');
                function setPosition(){
                    var ratio = $window.pageYOffset/($document.height()-$window.innerHeight);
                    var left = ratio*element.width();
                    element.find('.timeline-cursor').css('left',left+'px');
                    element.find('.timeline-bar').css('width',left+'px');
                }


                angular.element($window).bind("scroll", setPosition);
                angular.element($window).bind("touchmove", setPosition);
            }
        }
    }]);

})();