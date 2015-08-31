/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.genre', [])
    .controller('genreController', ['$scope', 'alertService', 'moviesService', '$stateParams', function ($scope, alertService, moviesService, $stateParams) {

        $scope.init = function () {
            if ($stateParams.genre) {
                $scope.movieGenre = $stateParams.genre;
                $scope.getMoviesByGenre();
            }
            $scope.movieReady = false;
        };

        $scope.getMoviesByGenre = function () {
                $scope.movieData = _.findWhere(moviesService.getMovies(), {Genre: $scope.movieGenre});
                if($scope.movieData){
                    $scope.movieReady = true;
                }else {
                    getMoviesByGenreFail();
                }

            return $scope.movieData;
        };

        function getMoviesByGenreFail(reason) {
            alertService.add('warning', 'Ooops! No genre was found. ' + reason);
        }

        $scope.init();

    }]);
