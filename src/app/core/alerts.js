/**
 * Created by Gilad on 03/09/2015.
 */
angular.module('App.core', [])
    .run(['$rootScope','alertService', function ($rootScope,alertService) {
        $rootScope.alerts = alertService.get();
        $rootScope.closeAlert = function (index) {
            alertService.closeAlert(index);
        };
    }]);

