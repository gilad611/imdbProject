/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.common', [])
    .controller('movieDataController', function(){

        $scope.init = function(){
            $scope.filterBy = '';
        };

        init();
    })

    //display movie data panel
    .directive('movieData', function () {
        return {
            restrict: 'E', replace: true,
            scope: {
                movieData: '=movieData'
            },
            templateUrl: 'shortMovieData.tpl.html'
        };
    })

    //display all movie details data panel
    .directive('allMovieData', function () {
        return {
            restrict: 'E', replace: true,
            scope: {
                movieData: '=movieData'
            },
            templateUrl: 'allMovieData.tpl.html'
        };
    })

    .directive('itemsPerPageByClass', [function(){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                scope.$watch(function() {return element.attr('class'); }, function(newValue){
                    if (element.hasClass('col-lg-2')){
                        scope.itemsPerPage = 14;
                    }else if (element.hasClass('col-md-3')){
                        scope.itemsPerPage = 8;
                    }else if (element.hasClass('col-sm-4','col-xs-4')){
                        scope.itemsPerPage = 6;
                    }
                });
            }
        };
    }]);