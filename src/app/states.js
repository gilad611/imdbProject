/**
 * Created by Gilad on 27/08/2015.
 */

angular.module('App.routes', [
    'App.search',
    'App.genre',
    'App.movies',
    'App.movie'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
        url: '/',
        abstract: true
    })
    .state('movies', {
        parent: 'root',
        url: 'movies',
        views: {
            'mainContent@': {
                templateUrl: 'movies/movies.tpl.html',
                controller: 'moviesController'
            }
        }
    })
    .state('movie', {
        url: 'movies/movie:movieName',
        parent: 'root',
        views: {
            'mainContent@': {
                templateUrl: 'movie/movie.tpl.html',
                controller: 'movieController'
            }
        }
    })

    .state('search', {
        url: 'search:movieName',
        parent: 'root',
        views: {
            'mainContent@': {
                templateUrl: 'search/search.tpl.html',
                controller: 'searchController'
            }
        }
    })
    .state('genre', {
        url: 'genre:genre',
        parent: 'root',
        views: {
            'mainContent@': {
                templateUrl: 'genre/genre.tpl.html',
                controller: 'genreController'
            }
        }
    });

    $urlRouterProvider.otherwise('/movies');

})
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        //back button function called from back button's ng-click="back()"
        $rootScope.back = function() {
            $state.go($rootScope.previousState_name,$rootScope.previousState_params);
        };
    }]);