/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.genre', [])
    .controller('GenreCtrl', ['$scope', 'alertService', 'moviesService', '$stateParams',
        function ($scope, alertService, moviesService, $stateParams) {

        $scope.init = function () {
            if ($stateParams.genre) {
                $scope.movieGenreId = $stateParams.genre;
                $scope.getMoviesByGenre($scope.movieGenre);
            }
            $scope.movieReady = false;
        };

        $scope.getMoviesByGenre = function () {
             moviesService.getAllMoviesByGenreId($scope.movieGenreId, function(movies){
                 if (movies){
                     $scope.movies = moviesService.renderGenre(movies);
                     $scope.movieReady = true;
                 }
                 else{
                     getMoviesByGenreFail();
                 }
            });
            return $scope.movies;
        };

        function getMoviesByGenreFail(reason) {
            alertService.add('warning', 'Oops! No genre was found. ' + reason);
        }

        $scope.init();

    }]);
