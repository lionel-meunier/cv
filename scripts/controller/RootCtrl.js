/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    mod.controller('RootCtrl', ['$scope', 'parts', '$location', '$anchorScroll','$timeout','windowVisibility', function ($scope, parts, $location, $anchorScroll,$timeout,windowVisibility) {


        $scope.data = {
            loading : true
        };


        $scope.styleSection = function(){
            return {
                'min-height' : windowVisibility.height
            };
        };

        $scope.bodyStyle = function(){

        };

        $timeout(function(){
          $scope.data.loading = false;
        },1000);


        $scope.parts = parts;


        $scope.scrollTo = function (hash) {
            $location.hash(hash);
            $anchorScroll();
        };

        $scope.styleForPicture = function (section) {

            if (_.isUndefined(section)) {
                return;
            }
            var position = section.fixed ? 'fixed' : 'absolute';

            //Calculer la transformation

            return {
                position: position
            }
        };

        $scope.displayPicture = function (section) {
            if (_.isUndefined(section)) {
                return;
            }
            var conf = {
                deb: 0.2,
                end: 0.75,
                position: 'top'
            };
            var isDisplay = $scope.isDisplay(section, conf);
            return isDisplay;
        };

        $scope.addClassPicture = function (section) {
            var display1 = $scope.calculRatioDisplay(section,0.2);
            var display2 = $scope.calculRatioDisplay(section,0.5);
            var display3 = $scope.calculRatioDisplay(section,0.75,'bottom');

            var displayEnd = display1 && display2 && display3;
            var displayMiddle = display1 && display2 && !display3;
            var displayDeb = display1 && !display2 && !display3;

            var classCss = '';
            if(displayDeb){
                classCss = 'deb-bg';
            } else if(displayMiddle){
                classCss = 'middle-bg';
            } else if(displayEnd){
                classCss = 'end-bg';
            }

            return classCss;
        };

        $scope.calculRatioDisplay = function(section,ratio,position){
            if (_.isUndefined(position)) {
                position = 'top';
            }
            var sectionPosition = section.sectionPosition;
            var windowVisibility = section.windowVisibility;
            var heightSection = sectionPosition.end - sectionPosition.deb;
            var heightDisplay = ratio * heightSection;
            switch (position) {
                case 'middle':
                    return heightDisplay + sectionPosition.deb <= windowVisibility.middle;
                    break;
                case 'bottom':
                    return  heightDisplay + sectionPosition.deb <= windowVisibility.end;
                    break;
                case 'top':
                default:
                    return  heightDisplay + sectionPosition.deb <= windowVisibility.deb;
                    break;
            }
        };


        $scope.isDisplay = function (section, display) {

            var sectionPosition = section.sectionPosition;
            var windowVisibility = section.windowVisibility;
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
        $scope.classPlayer = '';
        $scope.addClassRun = function(section){
            $scope.classPlayer = 'run';
            $timeout(function(){
                $scope.classPlayer = '';
            },1000);
            return $scope.classPlayer;

        }


    }]);

})();