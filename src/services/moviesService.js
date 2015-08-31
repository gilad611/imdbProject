angular.module('App.services')
.service('moviesService', ['$http', 'moviesServiceMock', '$rootScope',
    function ($http, moviesServiceMock, $rootScope) {
        var self = this;

        self.moviesGenres = [];
        self.movies = [
            {
                "Title": "Kill Bill: Vol. 1",
                "Year": "2003",
                "Rated": "R",
                "Released": "10 Oct 2003",
                "Runtime": "111 min",
                "Genre": "Action",
                "Director": "Quentin Tarantino",
                "Writer": "Quentin Tarantino, Quentin Tarantino (character The Bride), Uma Thurman (character The Bride)",
                "Actors": "Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah",
                "Plot": "The Bride wakens from a four-year coma. The child she carried in her womb is gone. Now she must wreak vengeance on the team of assassins who betrayed her - a team she was once part of.",
                "Language": "English, Japanese, French",
                "Country": "USA",
                "Awards": "Nominated for 1 Golden Globe. Another 23 wins & 64 nominations.",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU1NDg1Mzg4M15BMl5BanBnXkFtZTYwMDExOTc3._V1_SX300.jpg",
                "Metascore": "69",
                "imdbRating": "8.1",
                "imdbVotes": "641307",
                "imdbID": "tt0266697",
                "Type": "movie",
                "Response": "True"
            },
            {
                "Title": "House",
                "Year": "1986",
                "Rated": "R",
                "Released": "28 Feb 1986",
                "Runtime": "93 min",
                "Genre": "Comedy, Fantasy, Horror",
                "Director": "Steve Miner",
                "Writer": "Fred Dekker (story), Ethan Wiley (screenplay)",
                "Actors": "William Katt, George Wendt, Richard Moll, Kay Lenz",
                "Plot": "A troubled writer moves into a haunted house after inheriting it from his aunt.",
                "Language": "English",
                "Country": "USA",
                "Awards": "1 win & 3 nominations.",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTIwNzA2NzIxOF5BMl5BanBnXkFtZTcwNDMxNTUyMQ@@._V1_SX300.jpg",
                "Metascore": "N/A",
                "imdbRating": "6.2",
                "imdbVotes": "15832",
                "imdbID": "tt0091223",
                "Type": "movie",
                "Response": "True"
            },
            {
                "Title": "Tom and Jerry",
                "Year": "1965",
                "Rated": "TV-G",
                "Released": "25 Sep 1965",
                "Runtime": "30 min",
                "Genre": "Animation, Comedy, Family",
                "Director": "N/A",
                "Writer": "Joseph Barbera, William Hanna",
                "Actors": "N/A",
                "Plot": "A weekly Saturday (later Sunday) Morning repackaged compilation with new wraparounds featuring two Tom and Jerry cartoons sandwiching other MGM animated theatrical shorts.",
                "Language": "N/A",
                "Country": "N/A",
                "Awards": "N/A",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA3NzUwNjQwOF5BMl5BanBnXkFtZTcwMTcwNTYyMQ@@._V1_SX300.jpg",
                "Metascore": "N/A",
                "imdbRating": "8.7",
                "imdbVotes": "28298",
                "imdbID": "tt0274294",
                "Type": "series",
                "Response": "True"
            },
            {
                "Title": "Yellow",
                "Year": "2006",
                "Rated": "R",
                "Released": "7 Jun 2007",
                "Runtime": "90 min",
                "Genre": "Drama, Music, Romance",
                "Director": "Alfredo Rodriguez de Villa",
                "Writer": "Nacoma Whobrey (screenplay), Nacoma Whobrey (story), Roselyn Sanchez (story)",
                "Actors": "Roselyn Sanchez, Bill Duke, D.B. Sweeney, Jaime Tirelli",
                "Plot": "Family: a necessary burden. Amaryllis Campos is young and beautiful, a classically trained dancer delivering pizzas in Puerto Rico, living with her parents and her drug-selling chump of a ...",
                "Language": "English, Spanish",
                "Country": "Puerto Rico, USA",
                "Awards": "N/A",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTIxOTQ5NTI4M15BMl5BanBnXkFtZTcwMTk1Mzk0MQ@@._V1_SX300.jpg",
                "Metascore": "N/A",
                "imdbRating": "5.1",
                "imdbVotes": "830",
                "imdbID": "tt0488349",
                "Type": "movie",
                "Response": "True"
            },
            {
                "Title": "Snow",
                "Year": "2004",
                "Rated": "N/A",
                "Released": "13 Dec 2004",
                "Runtime": "120 min",
                "Genre": "Comedy, Family, Fantasy",
                "Director": "Alex Zamm",
                "Writer": "Rich Burns",
                "Actors": "Tom Cavanagh, Ashley Williams, Patrick Fabian, Bobb'e J. Thompson",
                "Plot": "Set in San Ernesto, California with only three days before Christmas, Nick Snowden needs to rescue a young reindeer from a zoo.",
                "Language": "English",
                "Country": "Canada, USA",
                "Awards": "N/A",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTY1OTgzMjk3MF5BMl5BanBnXkFtZTcwNjg0MDY5MQ@@._V1_SX300.jpg",
                "Metascore": "N/A",
                "imdbRating": "6.4",
                "imdbVotes": "792",
                "imdbID": "tt0425468",
                "Type": "movie",
                "Response": "True"
            },
            {
                "Title": "Strong",
                "Year": "2011",
                "Rated": "N/A",
                "Released": "6 Oct 2011",
                "Runtime": "88 min",
                "Genre": "Documentary, Adventure, Drama",
                "Director": "Andr?s Kollmann",
                "Writer": "N/A",
                "Actors": "Zsolt Er?ss",
                "Plot": "Zsolt Eross, a famous Hungarian mountain climber fights with the elements in an extraordinary environment- a hospital. After great climbs in the Himalaya he lost his right leg in an ...",
                "Language": "Hungarian",
                "Country": "Hungary, Nepal, China, Austria",
                "Awards": "N/A",
                "Poster": "N/A",
                "Metascore": "N/A",
                "imdbRating": "8.2",
                "imdbVotes": "20",
                "imdbID": "tt2025672",
                "Type": "movie",
                "Response": "True"
            }];

        self.getMovies = function(){
                    if($rootScope.isMocked) {
                        return self.movies;
                    }
                    else {
                        console.log("moviesService: get movies failed");
                    }
                };

        self.getMovieByName = function (movieName) {
            return $http.get('http://www.omdbapi.com/?apikey=b896699f&t='+ movieName +'&y=&plot=short&r=json');
        };

        self.getAllGenres = function () {
            _.forEach(self.movies, function(movie){
                    self.moviesGenres.push(movie.Genre);
            });
            self.moviesGenres = _.uniq(self.moviesGenres);
            return self.moviesGenres;
        };

        return self;
    }]);