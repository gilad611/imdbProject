/**
 * Created by Gilad on 07/09/2015.
 */

angular.module('App.common')
    .controller('NavbarCtrl', ['$scope', '$state', '$timeout', 'dataService',
        function ($scope, $state, $timeout, dataService) {

        //enable search on enter keypress
        $scope.searchOnEnterKeyPress = function (movieName) {
            $state.go('search', {movieName: movieName});
        };

        //listen to change language event and call init
        $scope.$on('notifyLangChanged', function(){
            init();

            //reload state
            $timeout(function () {
                $state.go('.', {}, { reload: true });
            }, 100);
        });

        /***
         * init
         */
        var init = function(){
            //get all genres for navbar genres drop-down menu
            dataService.getGenresNames(function (err,genres) {
                $scope.genres = _.toArray(genres);
            });
            $scope.navCollapsed = true;
        };

        init();
    }]);