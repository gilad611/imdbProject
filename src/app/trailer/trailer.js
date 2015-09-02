/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.trailer',[])
    .controller('TrailerCtrl', ['$scope', '$stateParams', 'alertService', 'moviesService',
        function ($scope, $stateParams, alertService, moviesService) {

        $scope.init = function () {
        //check if movie id in ui-sref is valid and call search function
            if ($stateParams.movieId) {
                $scope.movieId = $stateParams.movieId;
                $scope.getMovieTrailerKeyByMovieId();
            }
            $scope.movieReady = false;
        };

        $scope.getMovieTrailerKeyByMovieId = function () {
            moviesService.getMovieTrailerByMovieId($scope.movieId, function(movie){
                if (movie){
                    $scope.movieTrailerKey = movie.key;
                    $scope.movieReady = true;
                }
                else{
                    getMovieTrailerKeyByMovieId();
                }
            });
            return $scope.movieTrailerKey;
        };

        //alert if getMovieTrailerKeyByMovieId failed to find movie
        function getMovieTrailerKeyByMovieId(reason) {
            alertService.add('warning', 'Oops! No movie trailer was found. ' + reason);
        }

        $scope.init();

    }]);

