/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core')
    .directive('fallbackSrc', function () {
        //set default fallback image
        var missingDefault = "assets/images/fallback.jpg";
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                // Listen for errors on the element and if there are any replace the source with the fallback source
                var errorHanlder = function () {

                    element.off('error', errorHanlder);

                    var newSrc = attr.fallbackSrc || missingDefault;
                    if (element[0].src !== newSrc) {
                        element[0].src = newSrc;
                    }
                };
                element.on('error', errorHanlder);
            }
        };
    });