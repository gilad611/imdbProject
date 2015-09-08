/**
 * Created by Gilad on 06/09/2015.
 */

angular.module('App.common', [])
    .controller('AdultValidatorCtrl', ['$scope', '$modalInstance',
        function ($scope, $modalInstance) {

    var init = function(){
        $scope.adultData = {
            IsAdult: false,
            rememberMe: false
        };
    };

    $scope.isAdultCheck = function () {
        $scope.adultData.isAdult = true;
        $modalInstance.close($scope.adultData);
    };

    $scope.dismiss = function () {
        $modalInstance.dismiss($scope.adultData);
    };

    init();
}]);