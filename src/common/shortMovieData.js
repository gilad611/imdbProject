/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.common', [])
    //display movie data panel
    .directive('shortMovieData', function () {
        return {
            restrict: 'E', replace: true,
            scope: {
                movieData: '=movieData'
            },
            templateUrl: 'shortMovieData.tpl.html'
        };
    });