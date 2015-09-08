/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.movie',[])
    .controller('MovieCtrl', ['$scope', '$stateParams', 'alertService', 'dataService',
        function ($scope, $stateParams, alertService, dataService) {


        /***
         * get movie data by movie id
         * @param movieId
         */
        var getMovieById = function (movieId) {
            dataService.getMovieByMovieId(movieId, function(err, movie){

                if (err){
                    alertService.add('warning', 'Oops! No movie was found. ' + err);
                    console.log(err);
                    return;
                }
                if (movie){
                    $scope.movieData = _.first(movie);
                    $scope.movieReady = true;
                }
            });
        };

        /***
         * get movie cast data by movie id
         * @param movieId
         */
        var getMovieCastByMovieId = function (movieId) {
            dataService.getMovieCastByMovieId(movieId, function(err, movie){
                if (err){
                    alertService.add('warning', 'Oops! No movie was found. ' + err);
                    console.log(err);
                    return;
                }
                if (movie){
                    $scope.cast = movie;
                    $scope.movieReady = true;
                }
            });
        };

        /***
         * init
         */
        var init = function () {
            $scope.movieReady = false;
            //check if movie id in ui-sref is valid and call search function
            if ($stateParams.movieId) {
                getMovieById($stateParams.movieId);
                getMovieCastByMovieId($stateParams.movieId);
            }
        };

        init();

    }]);

