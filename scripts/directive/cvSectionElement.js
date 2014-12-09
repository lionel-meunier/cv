/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('cvSectionElementCtrl', ['$scope', '$element', '$window', function ($scope, $element, $window) {
        var sectionCtrl, display = true, displayRatio = 0, self = this;
        this.offset = {
            top: 0,
            left: 0
        };
        this.setTop = function (top) {
            if (!_.isUndefined(top)) {
                this.offset.top = top;
            }
        };

        this.setLeft = function (left) {
            if (!_.isUndefined(left)) {
                this.offset.left = left;
            }
        };

        this.setSectionCtrl = function (ctrl) {
            sectionCtrl = ctrl;
        };

        this.init = function () {

            //this.setTop($scope.top);
            //this.setLeft($scope.left);
            //this.setDisplay($scope.display);
            scrollActif();
        };


        function scrollActif() {


            $element.css('position', 'absolute');
            //$element.css('top', self.offset.top + 'px');
            //$element.css('left', self.offset.left + 'px');
            if (sectionCtrl.getSectionFixed()) {
                $element.css('position', 'fixed');
                $element.css('transform', '');
            } else {
                var windowVisibility = sectionCtrl.getWindowVisibility();
                var sectionPosition = sectionCtrl.getSectionPosition();
                if (windowVisibility.end > sectionPosition.end) {
                    //transform
                    var translateY = windowVisibility.deb - sectionPosition.deb;
                    $element.css('transform', 'translateY(' + translateY + 'px)');
                } else {
                    $element.css('transform', '');
                }
            }
        }

        angular.element($window).bind("scroll", scrollActif);
        angular.element($window).bind("touchmove", scrollActif);
    }]);

    mod.directive('cvSectionElement', ['$window', '$animate', '$timeout', function ($window, $animate, $timeout) {
        return {
            restrict: 'A',
            scope: {
                id: '@cvSectionElement',
                top: '@cvSectionTop',
                left: '@cvSectionLeft'
            },
            controller: 'cvSectionElementCtrl',
            require: ['^cvSection', 'cvSectionElement'],
            link: function (scope, element, attrs, ctrl) {
                ctrl[1].setSectionCtrl(ctrl[0]);
                $timeout(function () {
                    ctrl[1].init();
                }, 500);

            }
        }
    }]);

})();