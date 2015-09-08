/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.search', [])
    .controller('SearchCtrl', ['$scope', '$log', '$stateParams', 'dataService', 'alertService',
        function ($scope, $log, $stateParams, dataService, alertService) {

        /***
         * search movies by name
         * @param movieName
         */
        var searchByName = function (movieName) {

            async.waterfall([
                function (callback) {
                    dataService.getMovieByName(movieName, callback);
                },
                function (movies, callback) {
                    dataService.fillGenresInMovies(movies, callback);
                }
            ], function (err, movies) {
                if (err) {
                    alertService.add('warning', 'Oops! No movie was found. ' + err);
                    console.log(err);
                }

                $scope.movies = movies;
                paginationSettingsInit(movies);
            });
        };

        /**
         * slice movies for pagination
         */
        var sliceMovieByPagination = function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
            $scope.filteredMovies = $scope.movies && $scope.movies.slice(begin, end);
        };

        /**
         * on page change event from paginatino directive
         */
        $scope.pageChanged = function () {
            //$log.log('Page changed to: ' + $scope.currentPage);
            sliceMovieByPagination();
        };

        /***
         * ui pagination init
         */
        var paginationSettingsInit = function(movies){
            $scope.totalItems = _.size(movies);
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            sliceMovieByPagination();
            $scope.movieReady = true;
        };

        /***
         * init
         */
        var init = function () {
            //check if movie name in ui-sref is valid and call search function
            if ($stateParams.movieName) {
                searchByName($stateParams.movieName);
            }
            $scope.movieReady = false;
        };

        init();
    }]);