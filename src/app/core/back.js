/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core')
    .run(['$rootScope', '$window', function($rootScope, $window) {
        $rootScope.back = function () {
            $window.history.back();
        };
    }]);