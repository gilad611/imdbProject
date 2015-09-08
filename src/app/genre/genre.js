/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.genre', [])
    .controller('GenreCtrl', ['$scope', '$log', 'alertService', 'dataService', '$stateParams',
        function ($scope, $log, alertService, dataService, $stateParams) {


    /**
     * load all movies data by genre id
     * @param genreId
     */
    var loadMoviesByGenreId = function (genreId) {

        async.waterfall([
            function(callback){
                dataService.getAllMoviesByGenreId(genreId, callback);
            },
            function(movies, callback){
                dataService.fillGenresInMovies(movies, callback);
            }
        ], function(err, movies){
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
     * on page change event from pagination directive
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
     * scope init function
     */
    var init = function () {
        $scope.movieReady = false;
        if ($stateParams.genre) {
            loadMoviesByGenreId($stateParams.genre);
        }
    };

    init();

}]);
