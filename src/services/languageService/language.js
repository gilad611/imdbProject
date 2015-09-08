/**
 * Created by Gilad on 06/09/2015.
 */
angular.module('App.language', [])
    .run(['$rootScope', '$translate',
        function ($rootScope, $translate) {

            $rootScope.changeLanguage = function (langKey) {
                console.log('change language to: ' + langKey);
                $translate.use(langKey);

                if (langKey === 'he') {
                    $rootScope.rtl = true;
                } else {
                    $rootScope.rtl = false;
                }

                //broadcast event to navbar to update genre list
                $rootScope.$broadcast('notifyLangChanged');
            };

        }])
    .config(['$translateProvider', function ($translateProvider) {

        //$translateProvider.useSanitizeValueStrategy('sanitize');

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }]);
