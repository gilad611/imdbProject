/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core')
    //loader - displayed while $http has pending requests
    .directive('myLoading', ['$http', function ($http) {
        return {
            restrict: 'E',
            template: '<div class="loading">' +
            '<img class="img-responsive img-circle" src="assets/images/loading.gif">' +
            '</div>',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
    }]);