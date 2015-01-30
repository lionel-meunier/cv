/**
 * Created by lmeunier on 28/01/15.
 */
/**
 * Created by lmeunier on 02/12/14.
 */
(function () {
    'use strict';

    var mod = angular.module('CvLme');

    /**
     * Permet de créer dans le body en bas une time line correspondant au scrool
     */
    mod.factory('reveal', ['$window', '$timeout', function ($window, $timeout) {

        function RevealService() {
        }
        RevealService.prototype.getReveal = function(){
            return $window.Reveal;
        };
        RevealService.prototype.init = function(){
            var Reveal = this.getReveal();
            Reveal.initialize({
                controls: true,
                progress: true,
                history: true,
                center: true,

                theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
                transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

                // Optional libraries used to extend on reveal.js
                dependencies: [
                    { src: 'classList.js', condition: function() { return !document.body.classList; } },
                    // { src: 'plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
                    // { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
                ]
            });
        };
        return new RevealService();

    }]);

})();