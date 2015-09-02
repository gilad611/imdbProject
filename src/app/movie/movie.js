/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.movie',[])
    .controller('MovieCtrl', ['$scope', '$stateParams', 'alertService', 'moviesService',
        function ($scope, $stateParams, alertService, moviesService) {

        $scope.init = function () {
        //check if movie id in ui-sref is valid and call search function
            if ($stateParams.movieId) {
                $scope.movieId = $stateParams.movieId;
                $scope.getMovieById();
                $scope.getMovieCastByMovieId();
            }
            $scope.movieReady = false;
        };

        $scope.getMovieById = function () {
            moviesService.getMovieByMovieId($scope.movieId, function(movie){
                if (movie){
                    $scope.movieData = movie[0];
                    $scope.movieReady = true;
                }
                else{
                    getMovieByMovieIdFail();
                }
            });
            return $scope.movieData;
        };

        $scope.getMovieCastByMovieId = function () {
            moviesService.getMovieCastByMovieId($scope.movieId, function(movie){
                if (movie){
                    $scope.cast = movie.cast;
                    $scope.movieReady = true;
                }
                else{
                    getMovieCastByMovieId();
                }
            });
            return $scope.cast;
        };

        //alert if getMovieByMovieIdFail failed to find movie
        function getMovieByMovieIdFail(reason) {
            alertService.add('warning', 'Oops! No movie was found. ' + reason);
        }
        //alert if getMovieByMovieIdFail failed to find movie
        function getMovieCastByMovieId(reason) {
            alertService.add('warning', 'Oops! No movie cast was found. ' + reason);
        }

        $scope.init();

    }]);

