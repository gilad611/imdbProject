/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.cast',[])
    .controller('PersonCtrl', ['$scope', '$stateParams', 'alertService', 'dataService',
        function ($scope, $stateParams, alertService, dataService) {

        /***
         * get person data by person id
         * @param personId
         */
        var getPersonById = function (personId) {
            dataService.getPersonById(personId, function(err, person){
                if (err){
                    alertService.add('warning', 'Oops! No person was found. ' + reason);
                    console.log(err);
                }
                if (person){
                    $scope.person = person;
                    $scope.personReady = true;
                }
            });
        };

        /***
         * get movie credits data by person id
         * @param personId
         */
        var getMovieCreditsByPersonId = function (personId) {
                dataService.getMovieCreditsByPersonId(personId, function(err, credits){
                    if (err){
                        alertService.add('warning', 'Oops! No movie credits were found. ' + err);
                        console.log(err);
                    }
                    if (credits){
                        $scope.movieCredits = credits.cast;
                        $scope.creditsReady = true;
                    }
                });
            };

        /***
         * init
         */
        var init = function () {
            //check if movie id in ui-sref is valid and call search function
            if ($stateParams.personId) {
                getPersonById($stateParams.personId);
                getMovieCreditsByPersonId($stateParams.personId);
            }
            $scope.personReady = false;
        };

        init();

    }]);

