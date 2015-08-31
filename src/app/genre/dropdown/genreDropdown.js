/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.genre',[])
    .directive('genreDropdown', function () {
        return {
            restrict: 'E', replace: true,
            scope: {
                genres: '=genres'
            },
            templateUrl: 'genreDropdown.tpl.html'
        };
    });