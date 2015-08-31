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

        $urlRouterProvider.otherwise('/movies');
        $urlRouterProvider.when('/', '/movies');

        $stateProvider

            .state('root', {
                url: '/',
                abstract: true
            })


            .state('movies', {
                url: 'movies',
                parent: 'root',
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

    });