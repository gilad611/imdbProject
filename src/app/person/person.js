/**
 * Created by Gilad on 27/08/2015.
 */
angular.module('App.cast',[])
    .controller('PersonCtrl', ['$scope', '$stateParams', 'alertService', 'moviesService',
        function ($scope, $stateParams, alertService, moviesService) {

        $scope.init = function () {
        //check if movie id in ui-sref is valid and call search function
            if ($stateParams.personId) {
                $scope.personId = $stateParams.personId;
                $scope.getPersonById();
            }
            $scope.personReady = false;
        };

        $scope.getPersonById = function () {
            moviesService.getPersonById($scope.personId, function(person){
                if (person){
                    $scope.person = person;
                    $scope.personReady = true;
                }
                else{
                    getPersonByIdFail();
                }
            });
            return $scope.person;
        };

        //alert if getPersonByIdFail failed to find person
        function getPersonByIdFail(reason) {
            alertService.add('warning', 'Oops! No person was found. ' + reason);
        }

        $scope.init();

    }]);

