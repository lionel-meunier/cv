/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('cvSectionCtrl', ['$element', '$window', '$animate', '$timeout', '$scope','windowVisibility','$attrs','$parse', function ($element, $window, $animate, $timeout, $scope, windowVisibility,$attrs,$parse) {
        var nullSectionCtrl = {};
        var parentCtrl = $element.parent().controller('cvSection') || nullSectionCtrl;
        this.name = $scope.$eval($attrs.cvSection);


        this.visible = false;
        this.fixed = false;
        this.sectionPosition = {
            deb: 0,
            end: 0
        };
        this.windowVisibility = windowVisibility;
        this.sectionVisibility = {
            deb: 0,
            middle: 0,
            end: 0
        };

        this.getSectionVisible = function () {
            return this.visible;
        };
        this.getSectionFixed = function () {
            return this.fixed;
        };
        this.getSectionPosition = function () {
            return this.sectionPosition;
        };
        this.getWindowVisibility = function () {
            return this.windowVisibility;
        };
        this.getSectionVisibility = function () {
            return this.sectionVisibility;
        };
        var self = this;



        function calculSectionPosition() {

            var top = $element.offset().top;
            var height = $element.height();
            self.sectionPosition.deb = top;
            self.sectionPosition.end = top + height;
        }


        function calculVisibility() {
            calculSectionPosition();
            //console.log('section visibility',$scope.id);

            //Cas 1 au dessus debut et fin avant
            if (self.windowVisibility.deb < self.sectionPosition.deb && self.windowVisibility.end < self.sectionPosition.deb) {
                self.sectionVisibility.deb = self.sectionVisibility.end = self.sectionPosition.deb;
                self.fixed = false;
            }
            //Cas 2 en desous debut et fin après
            if (self.windowVisibility.deb > self.sectionPosition.end && self.windowVisibility.end > self.sectionPosition.end) {
                self.sectionVisibility.deb = self.sectionVisibility.end = self.sectionPosition.end;
                self.fixed = false;
            }

            //Cas 3 dedant debut et fin dedans
            if (self.windowVisibility.deb > self.sectionPosition.deb && self.windowVisibility.end < self.sectionPosition.end) {
                //console.log('cas3');
                self.sectionVisibility.deb = self.windowVisibility.deb;
                self.sectionVisibility.end = self.windowVisibility.end;
                self.fixed = true;
            }

            //Cas 4 debut avant et fin dedans
            if (self.windowVisibility.deb < self.sectionPosition.deb && self.windowVisibility.end > self.sectionPosition.deb && self.windowVisibility.end < self.sectionPosition.end) {
                //console.log('cas4');
                self.sectionVisibility.deb = self.sectionPosition.deb;
                self.sectionVisibility.end = self.windowVisibility.end;
                self.fixed = false;
            }

            //Cas 5 debut dedans et fin après
            if (self.windowVisibility.deb < self.sectionPosition.end && self.windowVisibility.deb > self.sectionPosition.deb && self.windowVisibility.end > self.sectionPosition.end) {
                //console.log('cas5');
                self.sectionVisibility.deb = self.windowVisibility.deb;
                self.sectionVisibility.end = self.sectionPosition.end;
                self.fixed = false;
            }
            self.sectionVisibility.middle = (self.sectionVisibility.deb + (self.sectionVisibility.end - self.sectionVisibility.deb) / 2);

            if (self.sectionPosition.end >= self.windowVisibility.middle && self.sectionPosition.deb <= self.windowVisibility.middle) {
                self.visible = true;


            } else {
                self.visible = false;
            }
        }


        function scrollActif() {
            $timeout(function () {
                calculVisibility();
            });
        };

        angular.element($window).bind("scroll", scrollActif);
        angular.element($window).bind("touchmove", scrollActif);
        angular.element($window).bind("resize", scrollActif);
        scrollActif();

        $scope.$section = self;
    }]);
    mod.directive('cvSection', ['$window', '$animate', '$timeout', function ($window, $animate, $timeout) {
        return {
            restrict: 'A',
            controller: 'cvSectionCtrl'
        }
    }]);

})();