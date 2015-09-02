/**
 * Created by Gilad on 27/08/2015.
 */
var App = angular.module("App", [
    'templates-app',
    'templates-common',
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'anim-in-out',
    'youtube-embed',
    'App.routes',
    'App.services',
    'App.common'
])

    .controller('AppController', ['$scope','$rootScope', 'alertService', 'moviesService',
        function ($scope, $rootScope, alertService, moviesService) {
            $scope.init = function () {
                $scope.alerts = alertService.get();
                moviesService.getGenresNames(function(genres){
                    $scope.genres = genres;
                });
                $rootScope.isMocked = true;
                $scope.navCollapsed = true;
            };

            $scope.closeAlert = function (index) {
                alertService.closeAlert(index);
            };

            $scope.init();
    }])

    .directive('navbarToggle', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                element.on('click', function () {
                    if (scope.navCollapsed == false){
                        scope.$apply(function(){
                            scope.navCollapsed = true;
                        });
                    }
                });
            }
        };
    })
    .directive('myLoading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'E',
            template:  '<div class="loading">'+
            '<img class="img-responsive img-circle" src="assets/images/loading.gif">'+
            '</div>',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    }]);

