/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core')
    //toggle element when clicked outside
    .directive('outsideClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                function outsideClick(e) {
                    if (!element.is(e.target) && element.has(e.target).length === 0) {
                        scope.$apply(attr.outsideClick);
                    }
                }

                // register to event
                $(document).on('click', outsideClick);

                // un bind on destroy
                scope.$on('$destroy', function() {
                    $(document).unbind('click',outsideClick);
                });
            }
        };
    });




