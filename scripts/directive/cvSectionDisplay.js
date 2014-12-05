/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

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

})();