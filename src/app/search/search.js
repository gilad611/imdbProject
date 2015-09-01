/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.search', [])
    .controller('searchController', ['$scope', '$stateParams', 'moviesService', 'alertService',
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
            moviesService.getMovieByName($scope.movieName).then(function (d) {
                $scope.movieData = d.data;
                $scope.movieReady = true;
                if ($scope.movieData.Response === 'False'){
                    getMovieByNameFail($scope.movieData.Error);
                    $scope.movieReady = false;
                }
            }).catch(getMovieByNameFail);
            return $scope.movieData;
        };

        //alert if weather $http failed to find city
        function getMovieByNameFail(reason) {
            alertService.add('warning', 'Ooops! No movie was found. ' + reason);
        }

        $scope.init();
    }]);