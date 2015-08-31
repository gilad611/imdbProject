/**
 * Created by Gilad on 27/08/2015.
 */
var App = angular.module("App", [
    'templates-app',
    'templates-common',
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'anim-in-out',
    'App.routes',
    'App.services',
    'App.common'
])

    .controller('AppController', ['$scope','$rootScope', 'alertService', 'moviesService',
        function ($scope, $rootScope, alertService, moviesService) {
            $scope.init = function () {
                $scope.alerts = alertService.get();
                $scope.genres = moviesService.getAllGenres();
                $rootScope.isMocked = true;
            };

            $scope.closeAlert = function (index) {
                alertService.closeAlert(index);
            };

            $scope.init();
    }]);
