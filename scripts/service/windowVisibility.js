/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    /**
     * Permet de créer dans le body en bas une time line correspondant au scrool
     */
    mod.service('windowVisibility', ['$window', '$timeout', function ($window, $timeout) {

        function WindowVisibility() {
            this.updateVisibility();
            this.addEvent();
        }

        /***
         * Met à jour la taille de la window visible
         */
        WindowVisibility.prototype.updateVisibility = function () {
            this.deb = $window.pageYOffset;
            this.middle = $window.pageYOffset + ($window.innerHeight / 2);
            this.end = $window.pageYOffset + $window.innerHeight;
            this.height = $window.innerHeight;
        };
        /**
         * Ajoute les évènement permettant de définir la taille de la window visible
         */
        WindowVisibility.prototype.addEvent = function () {
            var self = this;
            angular.element($window).bind("scroll", function () {
                self.updateVisibility();
            });
            angular.element($window).bind("touchmove", function () {
                self.updateVisibility();
            });
            angular.element($window).bind("resize", function () {
                self.updateVisibility();
            });
        };

        return new WindowVisibility();

    }]);

})();