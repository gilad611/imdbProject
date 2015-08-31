/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.movies', [])
    .controller('moviesController', ['$scope', '$log', 'alertService', 'moviesService', function ($scope, $log, alertService, moviesService) {

        $scope.init = function () {
            $scope.movieReady = false;
            $scope.getMovies();

            //bootstrap-ui pagination settings
            $scope.totalItems = _.size($scope.movies);
            $scope.currentPage = 1;
            $scope.itemsPerPage = 12;

        };

        $scope.getMovies = function () {
            $scope.movies = moviesService.getMovies();
            if($scope.movies){
                $scope.movieReady = true;
            }
            else {
                getMoviesFail('no movies found');
            }
        };

        function getMoviesFail(reason) {
            alertService.add('warning', 'Ooops! No movies were found. ' + reason);
        }

        //bootstrap-ui pagination
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        //bootstrap-ui pagination
        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        //bootstrap-ui pagination
        $scope.pageCount = function () {
            return Math.ceil($scope.totalItems / $scope.itemsPerPage);
        };

        //bootstrap-ui pagination
        $scope.$watch('currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;

            $scope.filteredMovies = $scope.movies.slice(begin, end);
        });

        $scope.init();

    }]);