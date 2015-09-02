angular.module('App.services')
    .service('moviesService', ['$http', '$rootScope',
        function ($http, $rootScope) {
            var self = this;

            self.moviesGenres = [];

            //get all popular movie data (parsed)
            self.getAllMovies = function(callback) {
                self.allMoviesParsed = [];
                $http.get('http://api.themoviedb.org/3/movie/popular?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function (data) {
                        _.forEach(data.data.results, function(object){
                            self.movieKeysParsed = _.mapKeys(object, function (value, key) {
                                        switch (key) {
                                            case "poster_path":
                                                key = "Poster";
                                                break;
                                            case "original_title":
                                                key = "Title";
                                                break;
                                            case "genre_ids":
                                                key = "Genre";
                                                break;
                                            case "vote_average":
                                                key = "imdbRating";
                                                break;
                                            case "release_date":
                                                key = "Year";
                                                break;
                                            case "overview":
                                                key = "Plot";
                                                break;
                                        }
                                        return key;
                                });
                            self.allMoviesParsed.push(self.movieKeysParsed);
                        });
                        return callback(self.allMoviesParsed);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get all genres names
            self.getGenresNames = function(callback){
                $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                        self.genresName = _.mapKeys(data.data.genres, 'name');
                        return callback(self.genresName);
                }).catch(function(error){
                        console.log(error);
                    });
            };
            //get all movies by genre id (parsed)
            self.getAllMoviesByGenreId = function(genreId, callback){
                self.getAllMoviesByGenreIdParsed = [];
                $http.get('http://api.themoviedb.org/3/genre/'+genreId+'/movies?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                        _.forEach(data.data.results, function(object){
                            self.movieKeysParsed = _.mapKeys(object, function (value, key) {
                                switch (key) {
                                    case "poster_path":
                                        key = "Poster";
                                        break;
                                    case "original_title":
                                        key = "Title";
                                        break;
                                    case "genre_ids":
                                        key = "Genre";
                                        break;
                                    case "vote_average":
                                        key = "imdbRating";
                                        break;
                                    case "release_date":
                                        key = "Year";
                                        break;
                                    case "overview":
                                        key = "Plot";
                                        break;
                                }
                                return key;
                            });
                            self.getAllMoviesByGenreIdParsed.push(self.movieKeysParsed);
                        });
                        return callback(self.getAllMoviesByGenreIdParsed);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get all cast by movie id
            self.getMovieCastByMovieId = function(genreId, callback){
                $http.get('http://api.themoviedb.org/3/movie/'+genreId+'/credits?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                        return callback(data.data);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get movie by movie id
            self.getMovieByMovieId = function(genreId, callback){
                self.getMovieByMovieIdParsed = [];
                $http.get('http://api.themoviedb.org/3/movie/'+genreId+'?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                            self.movieKeysParsed = _.mapKeys(data.data, function (value, key) {
                                switch (key) {
                                    case "poster_path":
                                        key = "Poster";
                                        break;
                                    case "original_title":
                                        key = "Title";
                                        break;
                                    case "genres":
                                        key = "Genre";
                                        break;
                                    case "vote_average":
                                        key = "imdbRating";
                                        break;
                                    case "release_date":
                                        key = "Year";
                                        break;
                                    case "overview":
                                        key = "Plot";
                                        break;
                                }
                                return key;
                            });
                            self.getMovieByMovieIdParsed.push(self.movieKeysParsed);
                            return callback(self.getMovieByMovieIdParsed);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get movie trailer key by movie id
            self.getMovieTrailerByMovieId = function(genreId, callback){
                self.getMovieByMovieIdParsed = [];
                $http.get('http://api.themoviedb.org/3/movie/'+genreId+'/videos?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                        return callback(data.data.results[0]);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get movies by name
            self.getMovieByName = function(movieName, callback) {
                self.allMoviesParsed = [];
                $http.get('http://api.themoviedb.org/3/search/movie?api_key=b917ffedecb75c3dc65040805bc41b69&query="' + movieName + '"')
                    .then(function (data) {
                        _.forEach(data.data.results, function(object) {
                            self.movieKeysParsed = _.mapKeys(object, function (value, key) {
                                switch (key) {
                                    case "poster_path":
                                        key = "Poster";
                                        break;
                                    case "original_title":
                                        key = "Title";
                                        break;
                                    case "genre_ids":
                                        key = "Genre";
                                        break;
                                    case "vote_average":
                                        key = "imdbRating";
                                        break;
                                    case "release_date":
                                        key = "Year";
                                        break;
                                    case "overview":
                                        key = "Plot";
                                        break;
                                }
                                return key;
                            });
                            self.allMoviesParsed.push(self.movieKeysParsed);
                        });
                        return callback(self.allMoviesParsed);
                    }).catch(function(error){
                        console.log(error);
                    });
            };
            //get movies object and add GenreNames (by id)
            self.renderGenre = function(movies){
                    self.movies = movies;
                    self.movieGenreParsed = [];
                    self.getGenresNames(function(callback){
                        if (callback){
                            self.genres = callback;
                            _.forEach(self.movies, function(object) {
                                object.GenreNames = [];
                                    _.forEach(self.genres, function(genre) {
                                        for (var i = 0; i < object.Genre.length; i++) {
                                            if (genre.id === object.Genre[i]) {
                                                object.GenreNames.push(genre.name);
                                            }
                                        }
                                        self.movies.push(object);
                                    });
                                });
                            }
                        });
                        return self.movies;
            };

            self.getPersonById = function(genreId, callback){
                self.getMovieByMovieIdParsed = [];
                $http.get('http://api.themoviedb.org/3/person/'+genreId+'?api_key=b917ffedecb75c3dc65040805bc41b69')
                    .then(function(data){
                        return callback(data.data);
                    }).catch(function(error){
                        console.log(error);
                    });
            };

            return self;
        }]);