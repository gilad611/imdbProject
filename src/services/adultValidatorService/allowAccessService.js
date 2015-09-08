/**
 * Created by Gilad on 08/09/2015.
 */
angular.module('App.services')
    .service('allowAccessService',['dataService','$modal','$q',
    function (dataService,$modal,$q) {

        var self = this;

        /***
         *
         * check if movie is 'adult only'
         * if 'adult only' open modal
         * return allowAccess(true/false) if user concented he is adult
         *
         * @param toState
         * @param toParams
         * @returns {deferred.promise|{then, catch, finally}|*|r.promise|Function|promise}
         */
        self.isAdult = function(toState, toParams){
            var deferred = $q.defer();
            var allowAccessData = {};
            //retrieve movie data to check if movie.adult is true/false
            dataService.getMovieByMovieId(toParams.movieId, function (err, movie) {
                //if error in retrieving data
                if (err) {
                    deferred.reject('no movie data retrieved' + err);
                    console.log(err);
                    return;
                }
                //if success in retrieving data
                if (movie) {
                    movie = _.first(movie);
                    movie.adult = true;
                }
                // if adult only move
                if (movie.adult) {
                    // open modal
                    deferred.notify('adult movie, modal is opening...');
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'adultValidator/adultCheck.tpl.html',
                        controller: 'AdultValidatorCtrl',
                        size: 'md'
                    });

                    //retrieve data from modal instance
                    modalInstance.result.then(function (adultData) {
                        //check if user concented he is adult
                        if (adultData.isAdult) {
                            //if remember me 'checked' save for future requests
                            if (adultData.rememberMe) {
                                allowAccessData.amIAdult = adultData.isAdult;
                                console.log('remember me checkeed ' + allowAccessData.amIAdult);
                            }
                            //return true to allow access to adult movie
                            allowAccessData.allowAccess = true;
                            deferred.resolve(allowAccessData);
                        }
                    }, function () {
                        //return false to disallow access to adult movie
                        allowAccessData.allowAccess = false;
                        allowAccessData.amIAdult = false;
                        deferred.resolve(allowAccessData);
                    });
                } else {
                    //not an adult movie, return true to allow access
                    allowAccessData.allowAccess = true;
                    deferred.resolve(allowAccessData);
                }
            });
            return deferred.promise;
        };

    }]);