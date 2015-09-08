/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core')
    .directive('ngEnter', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                element.on('keydown',function(e) {
                    // check if key is enter
                    if (e.keyCode == 13) {
                        scope.$apply(attr.ngEnter);
                    }
                });
            }
        };
    });



