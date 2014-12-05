/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('cvSectionCtrl', ['$element', '$window', '$animate', '$timeout', '$scope', function ($element, $window, $animate, $timeout, $scope) {
        var visible = false;
        var fixed = false;
        var sectionPosition = {
            deb: 0,
            end: 0
        };
        var windowVisibility = {
            deb: 0,
            middle: 0,
            end: 0
        };
        var sectionVisibility = {
            deb: 0,
            middle: 0,
            end: 0
        };

        this.getSectionVisible = function () {
            return visible;
        };
        this.getSectionFixed = function () {
            return fixed;
        };
        this.getSectionPosition = function () {
            return sectionPosition;
        };
        this.getWindowVisibility = function () {
            return windowVisibility;
        };
        this.getSectionVisibility = function () {
            return sectionVisibility;
        };
        function calculWindowVisibility() {
            windowVisibility.deb = $window.pageYOffset;
            windowVisibility.middle = $window.pageYOffset + ($window.innerHeight / 2);
            windowVisibility.end = $window.pageYOffset + $window.innerHeight;
        }

        function calculSectionPosition() {

            var top = $element.offset().top;
            var height = $element.height();
            sectionPosition.deb = top;
            sectionPosition.end = top + height;
            console.log($scope.id,sectionPosition);
        }


        function calculVisibility() {
            calculSectionPosition();
            calculWindowVisibility();
            //console.log('section visibility',$scope.id);

            //Cas 1 au dessus debut et fin avant
            if (windowVisibility.deb < sectionPosition.deb && windowVisibility.end < sectionPosition.deb) {
                sectionVisibility.deb = sectionVisibility.end = sectionPosition.deb;
                fixed = false;
            }
            //Cas 2 en desous debut et fin après
            if (windowVisibility.deb > sectionPosition.end && windowVisibility.end > sectionPosition.end) {
                sectionVisibility.deb = sectionVisibility.end = sectionPosition.end;
                fixed = false;
            }

            //Cas 3 dedant debut et fin dedans
            if (windowVisibility.deb > sectionPosition.deb && windowVisibility.end < sectionPosition.end) {
                //console.log('cas3');
                sectionVisibility.deb = windowVisibility.deb;
                sectionVisibility.end = windowVisibility.end;
                fixed = true;
            }

            //Cas 4 debut avant et fin dedans
            if (windowVisibility.deb < sectionPosition.deb && windowVisibility.end > sectionPosition.deb && windowVisibility.end < sectionPosition.end) {
                //console.log('cas4');
                sectionVisibility.deb = sectionPosition.deb;
                sectionVisibility.end = windowVisibility.end;
                fixed = false;
            }

            //Cas 5 debut dedans et fin après
            if (windowVisibility.deb < sectionPosition.end && windowVisibility.deb > sectionPosition.deb && windowVisibility.end > sectionPosition.end) {
                //console.log('cas5');
                sectionVisibility.deb = windowVisibility.deb;
                sectionVisibility.end = sectionPosition.end;
                fixed = false;
            }
            sectionVisibility.middle = (sectionVisibility.deb + (sectionVisibility.end - sectionVisibility.deb) / 2);

            if (sectionPosition.end >= windowVisibility.middle && sectionPosition.deb <= windowVisibility.middle) {
                visible = true;


            } else {
                visible = false;
            }
        }


        function scrollActif() {
            calculVisibility();
        };

        angular.element($window).bind("scroll", scrollActif);
        angular.element($window).bind("touchmove", scrollActif);
        angular.element($window).bind("resize", scrollActif);
        scrollActif();
    }]);
    mod.directive('cvSection', ['$window', '$animate', '$timeout', function ($window, $animate, $timeout) {
        return {
            restrict: 'A',
            scope: {
                id: '@cvSection'
            },
            controller: 'cvSectionCtrl'
        }
    }]);

})();