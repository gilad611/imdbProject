/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.movies', [])
    .controller('MoviesCtrl', ['$scope', '$stateParams', '$log', 'alertService', 'dataService',
        function ($scope, $stateParams, $log, alertService, dataService) {

    /***
     * get all popular movies
     */
    var getPopularMovies = function () {
        async.waterfall([
            function (callback) {
                dataService.getAllPopularMovies(callback);
            },
            function (movies, callback) {
                dataService.fillGenresInMovies(movies, callback);
            }
        ], function (err, movies) {
            if (err) {
                alertService.add('warning', 'Oops! No movies were found. ' + err);
            }
            $scope.movies = movies;
            //bootstrap-ui pagination settings
            paginationSettingsInit(movies);
        });
    };

    /***
     * get all now playing movies
     */
    var getNowPlayingMovies = function () {
        async.waterfall([
            function (callback) {
                dataService.getNowPlayingMovies(callback);
            },
            function (movies, callback) {
                dataService.fillGenresInMovies(movies, callback);
            }
        ], function (err, movies) {
            if (err) {
                alertService.add('warning', 'Oops! No movies were found. ' + err);
            }
            $scope.movies = movies;
            //bootstrap-ui pagination settings
            paginationSettingsInit(movies);
        });
    };

    /***
     * get top rated movies
     */
    var getTopRatedMovies = function () {
        async.waterfall([
            function (callback) {
                dataService.getTopRatedMovies(callback);
            },
            function (movies, callback) {
                dataService.fillGenresInMovies(movies, callback);
            }
        ], function (err, movies) {
            if (err) {
                alertService.add('warning', 'Oops! No movies were found. ' + err);
                console.log(err);
                return;
            }

            $scope.movies = movies;
            //bootstrap-ui pagination settings
            paginationSettingsInit(movies);
        });
    };

    /***
     * get upcoming movies
     */
    var getUpcomingMovies = function () {

        async.waterfall([
            function (callback) {
                dataService.getUpcomingMovies(callback);
            },
            function (movies, callback) {
                dataService.fillGenresInMovies(movies, callback);
            }
        ], function (err, movies) {
            if (err) {
                alertService.add('warning', 'Oops! No movies were found. ' + err);
                console.log(err);
                return;
            }

            $scope.movies = movies;
            //bootstrap-ui pagination settings
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
        $scope.movieReady = false;

        switch ($stateParams.movies) {
            case 'Popular':
                getPopularMovies();
                break;
            case 'NowPlaying':
                getNowPlayingMovies();
                break;
            case 'TopRated':
                getTopRatedMovies();
                break;
            case 'Upcoming':
                getUpcomingMovies();
                break;

            default:
        }
    };

    init();

}]);