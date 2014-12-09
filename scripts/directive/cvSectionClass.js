/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');
    function shallowCopy(src, dst) {
        if (_.isArray(src)) {
            dst = dst || [];

            for (var i = 0, ii = src.length; i < ii; i++) {
                dst[i] = src[i];
            }
        } else if (_.isObject(src)) {
            dst = dst || {};

            for (var key in src) {
                if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                    dst[key] = src[key];
                }
            }
        }

        return dst || src;
    }
    function classDirective(name, selector) {
        //console.log('name',name);
        name = 'cvSectionClass' + name;
        return ['$animate', function($animate) {
            return {
                restrict: 'AC',
                link: function(scope, element, attr) {
                    var oldVal;
                    //console.log(scope);
                    scope.$watch(attr[name], ngClassWatchAction, true);



                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses);
                    }

                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses);
                    }

                    function digestClassCounts(classes, count) {
                        var classCounts = element.data('$classCounts') || {};
                        var classesToUpdate = [];
                        _.each(classes, function(className) {
                            if (count > 0 || classCounts[className]) {
                                classCounts[className] = (classCounts[className] || 0) + count;
                                if (classCounts[className] === +(count > 0)) {
                                    classesToUpdate.push(className);
                                }
                            }
                        });
                        element.data('$classCounts', classCounts);
                        return classesToUpdate.join(' ');
                    }

                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses);
                        var toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1);
                        toRemove = digestClassCounts(toRemove, -1);
                        if (toAdd && toAdd.length) {
                            $animate.addClass(element, toAdd);
                        }
                        if (toRemove && toRemove.length) {
                            $animate.removeClass(element, toRemove);
                        }
                    }

                    function ngClassWatchAction(newVal) {
                        if (selector === true || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (!oldVal) {
                                addClasses(newClasses);
                            } else if (!equals(newVal,oldVal)) {
                                var oldClasses = arrayClasses(oldVal);
                                updateClasses(oldClasses, newClasses);
                            }
                        }
                        oldVal = shallowCopy(newVal);
                    }
                }
            };

            function arrayDifference(tokens1, tokens2) {
                var values = [];

                outer:
                    for (var i = 0; i < tokens1.length; i++) {
                        var token = tokens1[i];
                        for (var j = 0; j < tokens2.length; j++) {
                            if (token == tokens2[j]) continue outer;
                        }
                        values.push(token);
                    }
                return values;
            }
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

            function arrayClasses(classVal) {
                if (_.isArray(classVal)) {
                    return classVal;
                } else if (_.isString(classVal)) {
                    return classVal.split(' ');
                } else if (_.isObject(classVal)) {
                    var classes = [];
                    _.each(classVal, function(v, k) {
                        if (v) {
                            classes = classes.concat(k.split(' '));
                        }
                    });

                    return classes;
                }
                return classVal;
            }
        }];
    }
    mod.directive('cvSectionClass',classDirective('',true));
    mod.directive('cvSectionClass2', ['$window', '$animate', '$timeout', function ($window, $animate, $timeout) {

        var displayDefault = {
            deb: 0,
            end: 1,
            position: 'top',
            class : 'cv-section-class'
        };
        console.log('test');


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
                            $animate.addClass($element);
                        } else {
                            $animate.removeClass($element);
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