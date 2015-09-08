/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.trailer',[])
    .controller('TrailerCtrl', ['$scope', '$stateParams', 'alertService', 'dataService',
        function ($scope, $stateParams, alertService, dataService) {

        /***
         * get movie trailer key by movie id
         * @param movieId
         */
        var getMovieTrailerKeyByMovieId = function (movieId) {
            dataService.getMovieTrailerByMovieId(movieId, function(err, movie){
                if (err){
                    alertService.add('warning', 'Oops! No movie trailer was found. ' + err);
                    console.log(err);
                }
                if (movie){
                    $scope.movieTrailerKey = movie.key;
                    $scope.movieReady = true;
                }else {
                    alertService.add('warning', 'Oops! No movie trailer was found. ');
                }
            });
        };

        /***
         * init
         */
        var init = function () {
            //check if movie id in ui-sref is valid and call search function
            if ($stateParams.movieId) {
                getMovieTrailerKeyByMovieId($stateParams.movieId);
            }
            $scope.movieReady = false;
        };

        init();

    }]);

