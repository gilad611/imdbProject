
angular.module('App.services', [])
    .run(['$rootScope','allowAccessService','alertService','$state',function($rootScope,allowAccessService, alertService,$state) {

        var allowNextChange = false;
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams) {

                // adult can see anything
                if ($rootScope.amIAdult || allowNextChange) {
                    console.log('allowed access');
                    allowNextChange = false;
                    return;
                }
                if (toState.name === 'movie') {
                    console.log('traying to access adult movie');
                    // hold on with that moving
                    event.preventDefault();

                    allowAccessService.isAdult(toState, toParams).then(function (allowAccessData) {
                        //if allowAccessData retrieved
                        if (allowAccessData) {
                            allowNextChange = allowAccessData.allowAccess;
                            //go to movie
                            if (allowNextChange){
                                $state.go(toState.name, toParams);
                            }
                            if (allowAccessData.amIAdult) {
                                $rootScope.amIAdult = allowAccessData.amIAdult;
                            }
                        }
                    }).catch(function (error) {
                        alertService.add('warning', 'Oops! something went wrong. ' + error);
                        console.log(error);
                    });
                }
            });
    }]);
