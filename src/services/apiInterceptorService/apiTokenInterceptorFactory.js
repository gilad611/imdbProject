angular.module('App.services').factory('apiTokenInjector', ['$translate', function($translate) {
    var apiTokenInjector = {
        request: function(config) {
            if (config.url.indexOf('http://api.themoviedb.org/3/') != -1) {
                config.url += '?api_key=b917ffedecb75c3dc65040805bc41b69';
                //set language
                if (config.url.indexOf('videos') == -1){
                    var currentLang = $translate.proposedLanguage() || $translate.use();
                    config.url += '&language='+currentLang;
                }
            }
            return config;
        }
    };
    return apiTokenInjector;
}]);

angular.module('App.services').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('apiTokenInjector');
}]);