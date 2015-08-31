angular.module('App.services')
    .service('moviesService', ['$http', 'moviesServiceMock', '$rootScope',
        function ($http, moviesServiceMock, $rootScope) {
            var self = this;

            self.moviesGenres = [];

            self.getMovies = function(){
                if($rootScope.isMocked) {
                    return moviesServiceMock.getMovies();
                }
                else {
                    console.log("moviesService: get movies failed");
                }
            };

            self.getMovieByName = function (movieName) {
                return $http.get('http://www.omdbapi.com/?apikey=b896699f&t='+ movieName +'&y=&plot=short&r=json');
            };

            self.getAllGenres = function () {
                _.forEach(moviesServiceMock.getMovies(), function(movie){
                    self.moviesGenres.push(movie.Genre);
                });
                self.moviesGenres = _.uniq(self.moviesGenres);
                return self.moviesGenres;
            };

            return self;
        }]);