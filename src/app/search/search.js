/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.search', [])
    .controller('SearchCtrl', ['$scope', '$stateParams', 'moviesService', 'alertService',
        function ($scope, $stateParams, moviesService, alertService) {

        $scope.init = function () {

            //check if movie name in ui-sref is valid and call search function
            if ($stateParams.movieName) {
                $scope.movieName = $stateParams.movieName;
                    $scope.searchByName();
            }
            $scope.movieReady = false;
        };

        $scope.searchByName = function () {
            moviesService.getMovieByName($scope.movieName, function(movies){
            if (movies) {
                $scope.movies = moviesService.renderGenre(movies);
                $scope.movieReady = true;
            }
            else{
                getMovieByNameFail();
            }
        });
            return $scope.movies;
        };

        //alert if weather $http failed to find city
        function getMovieByNameFail(reason) {
            alertService.add('warning', 'Oops! No movie was found. ' + reason);
        }

        $scope.init();
    }]);