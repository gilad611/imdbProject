angular.module('App.services')
    .service('dataService', ['$http', 'alertService',
        function ($http) {
            var self = this;

            // private helper for parse object
            var parseObjectKeys = {
                poster_path: "Poster",
                title: "Title",
                genre_ids: 'Genre',
                genres: 'Genre',
                vote_average: 'imdbRating',
                release_date: 'Year',
                overview: 'Plot',
                id: 'id'
            };

            /**
             * parse object to new api style
             */
            var parseMovieResult = function (results) {
                return _.map(results, function (movie) {
                    var parsedKeys =  _.mapKeys(movie, function (value, key) {
                        return parseObjectKeys[key];
                    });
                    if (parsedKeys){
                        return parseImgPathResult(parsedKeys);
                    }
                });
            };

            /**
             * parse image path with imdb prefix: 'http://image.tmdb.org/t/p/w500/'
             */
            var parseImgPathResult = function (results) {
                return _.mapValues(results, function (value, key) {
                    if (key === 'Poster') {
                        return 'http://image.tmdb.org/t/p/w500' + value;
                    }
                    if (key === 'profile_path') {
                        return 'http://image.tmdb.org/t/p/w500' + value;
                    }
                    return value;
                });
            };

            //$http apiInterceptor prefix
            var httpPrefix = 'http://api.themoviedb.org/3/';

            /***
             * get all popular movie data (parsed)
             * @param callback
             */
            self.getAllPopularMovies = function (callback) {
                $http.get(httpPrefix + 'movie/popular',
                    {cache: true}
                )
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        callback(null, result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            //
            /***
             * get now playing movies (parsed)
             * @param callback
             */
            self.getNowPlayingMovies = function (callback) {
                $http.get(httpPrefix+'movie/now_playing')
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            //get top rated movies
            /***
             * get now playing movies (parsed)
             * @param callback
             */
            self.getTopRatedMovies = function (callback) {
                $http.get(httpPrefix+'movie/top_rated')
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /***
             * get upcoming movies (parsed)
             * @param callback
             */
            self.getUpcomingMovies = function (callback) {
                self.allMoviesParsed = [];
                $http.get(httpPrefix+'movie/upcoming')
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /***
             * get all genres names
             * @param callback
             */
            self.getGenresNames = function (callback) {
                $http.get(httpPrefix+'genre/movie/list')
                    .then(function (data) {
                        var genresNames = _.mapKeys(data.data.genres, 'name');
                        return callback(null, genresNames);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /**
             * get all movies by genre id (parsed)
             */
            self.getAllMoviesByGenreId = function (genreId, callback) {
                self.getAllMoviesByGenreIdParsed = [];
                $http.get(httpPrefix+'genre/' + genreId + '/movies')
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        callback(null, result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };


            /***
             * get all cast by movie id
             * @param callback
             */
            self.getMovieCastByMovieId = function (genreId, callback) {
                $http.get(httpPrefix+'movie/' + genreId + '/credits')
                    .then(function (data) {
                        var result = _.map(data.data.cast, function(MovieCastData){
                            return parseImgPathResult(MovieCastData);
                        });
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /***
             * get movie by movie id (parsed)
             * @param callback
             */
            self.getMovieByMovieId = function (movieId, callback) {
                $http.get(httpPrefix+'movie/' + movieId + '')
                    .then(function (data) {
                        var result = parseMovieResult(data);
                        callback(null,result);
                    }).catch(function (error) {
                        console.log(error);
                        callback(error);
                    });
            };

            /***
             * get movie trailer key by movie id
             * @param genreId
             * @param callback
             */
            self.getMovieTrailerByMovieId = function (genreId, callback) {
                $http.get(httpPrefix+'movie/' + genreId + '/videos')
                    .then(function (data) {
                        return callback(null,data.data.results[0]);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /***
             * get movies by name
             * @param movieName
             * @param callback
             */
            self.getMovieByName = function (movieName, callback) {
                $http.get(httpPrefix+'search/movie/?query="' + movieName + '"')
                    .then(function (data) {
                        var result = parseMovieResult(data.data.results);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /**
             * populate generes ids in movie into string names
             * @param movies
             * @param callback
             */
            self.fillGenresInMovies = function (movies,callback) {
                self.getGenresNames(function (err,genres) {
                    // in case of an erorr, throw it away
                    if (err) {
                        return callback(err);
                    }
                    _.each(movies, function (movie) {
                        movie.Genre = _.map(movie.Genre,function(genreId) {
                            return _.findWhere(genres,{id: genreId});
                        });
                    });
                    callback(null,movies);
                });
            };

            /***
             * get person data by person id
             * @param genreId
             * @param callback
             */
            self.getPersonById = function (genreId, callback) {
                $http.get(httpPrefix+'person/' + genreId + '')
                    .then(function (data) {
                        var result = parseImgPathResult(data.data);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };

            /***
             * get movie credits by person id (parsed)
             * @param personId
             * @param callback
             */
            self.getMovieCreditsByPersonId = function (personId, callback) {
                $http.get(httpPrefix+'person/' + personId + '/movie_credits')
                    .then(function (data) {
                        var result = parseImgPathResult(data.data);
                        return callback(null,result);
                    }).catch(function (error) {
                        callback(error);
                        console.log(error);
                    });
            };
            return self;
        }]);