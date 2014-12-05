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

            this.setTop($scope.top);
            this.setLeft($scope.left);
            //this.setDisplay($scope.display);
            scrollActif();
        };

        function isDisplay() {
            //var windowVisibility = sectionCtrl.getWindowVisibility();
            //var sectionVisibility = sectionCtrl.getSectionVisibility();
            //var sectionPosition = sectionCtrl.getSectionPosition();
            //var height = sectionPosition.end - sectionPosition.deb;
            //var heightDisplay = height * displayRatio;
            //console.log(heightDisplay + sectionPosition.deb,displayRatio,$scope.id);
            //if (heightDisplay + sectionPosition.deb <= windowVisibility.middle) {
            //    display = true;
            //} else {
            //    display = false;
            //}

            //var windowVisibility = sectionCtrl.getWindowVisibility();
            //var sectionPosition = sectionCtrl.getSectionPosition();
            //console.log(displayRatio,'displayRatio');
            //console.log(windowVisibility,'windowVisibility');
            //console.log(sectionPosition,'sectionPosition');
            return true;
            //return display;
        }

        function scrollActif() {

            isDisplay();
            if (display) {
                $element.css('display', 'block');
                $element.css('position', 'absolute');
                $element.css('top', self.offset.top + 'px');
                $element.css('left', self.offset.left + 'px');
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
            } else {
                $element.css('display', 'none');
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

    mod.directive('cvSectionDisplay', ['$window', '$animate', '$timeout', function ($window, $animate, $timeout) {

        var displayDefault = {
            deb: 0,
            end: 1,
            position: 'top'
        };

        function getBlockNodes(nodes) {
            // TODO(perf): just check if all items in `nodes` are siblings and if they are return the original
            //             collection, otherwise update the original collection.
            var node = nodes[0];
            var endNode = nodes[nodes.length - 1];
            var blockNodes = [node];

            do {
                node = node.nextSibling;
                if (!node) break;
                blockNodes.push(node);
            } while (node !== endNode);

            return angular.element(blockNodes);
        }

        return {
            multiElement: true,
            transclude: 'element',
            priority: 601,
            terminal: true,
            restrict: 'A',
            $$tlb: true,
            require: '^cvSection',
            link: function ($scope, $element, $attr, sectionCtrl, $transclude) {
                var block, childScope, previousElements, animateState = false;

                function isDisplay(value) {
                    if (!_.isNumber(value) && !_.isObject(value)) {
                        return false;
                    }
                    var display;
                    if (_.isNumber(value)) {
                        display = _.clone(displayDefault);
                        display.deb = value;
                    } else if (_.isObject(value)) {
                        display = _.defaults(value, displayDefault);
                    }
                    var sectionPosition = sectionCtrl.getSectionPosition();
                    var windowVisibility = sectionCtrl.getWindowVisibility();
                    var heightSection = sectionPosition.end - sectionPosition.deb;
                    var heightDebDisplay = display.deb * heightSection;
                    var heightEndDisplay = display.end * heightSection;
                    var debDisplay = false, endDisplay = false;
                    switch (display.position) {
                        case 'middle':
                            debDisplay = heightDebDisplay + sectionPosition.deb <= windowVisibility.middle;
                            endDisplay = heightEndDisplay + sectionPosition.deb >= windowVisibility.middle;
                            break;
                        case 'bottom':
                            debDisplay = heightDebDisplay + sectionPosition.deb <= windowVisibility.end;
                            endDisplay = heightEndDisplay + sectionPosition.deb >= windowVisibility.end;
                            break;
                        case 'top':
                        default:
                            debDisplay = heightDebDisplay + sectionPosition.deb <= windowVisibility.deb;
                            endDisplay = heightEndDisplay + sectionPosition.deb >= windowVisibility.deb;
                            break;
                    }
                    if (debDisplay && endDisplay) {
                        return true;
                    }
                    return false;
                }

                function watchDisplay(value) {
                    if (animateState === false) {
                        if (isDisplay(value)) {
                            if (!childScope) {
                                $transclude(function (clone, newScope) {
                                    childScope = newScope;
                                    clone[clone.length++] = document.createComment(' end cvSectionDisplay: ' + $attr.cvSectionDisplay + ' ');
                                    // Note: We only need the first/last node of the cloned nodes.
                                    // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                                    // by a directive with templateUrl when its template arrives.
                                    block = {
                                        clone: clone
                                    };
                                    animateState = true;
                                    $animate.enter(clone, $element.parent(), $element).then(function () {
                                        animateState = false;
                                    });
                                });
                            }
                        } else {
                            if (previousElements) {
                                previousElements.remove();
                                previousElements = null;
                            }
                            if (childScope) {
                                childScope.$destroy();
                                childScope = null;
                            }
                            if (block) {
                                previousElements = getBlockNodes(block.clone);
                                animateState = true;
                                $animate.leave(previousElements).then(function () {
                                    previousElements = null;
                                    animateState = false;
                                });
                                block = null;
                            }
                        }
                    }
                }

                function scrollActif() {
                    $timeout(function () {
                        watchDisplay($scope.$eval($attr.cvSectionDisplay));
                    });

                }


                $scope.$watch($attr.cvSectionDisplay, watchDisplay);
                angular.element($window).bind("scroll", scrollActif);
                angular.element($window).bind("touchmove", scrollActif);
            }
        };
    }]);


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