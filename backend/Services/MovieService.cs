using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repository;

namespace backend.Services
{
    public class MovieService
    {
        private readonly DataRepository _dataRepository;
        private static int _counter = 12;
        public MovieService(DataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }
        public IEnumerable<Movie> GetMovies()
        {
            var movies = _dataRepository.readFromJson();
            return movies;
        }

        public Movie AddMovie(Movie movie)
        {
            List<Movie> movies = _dataRepository.readFromJson();
            if (movies.Any(m => m.Title == movie.Title))
            {
                //if movie is already existing
                return null;
            }

            movie.Id = _counter++;
            movies.Add(movie);

            _dataRepository.WriteToJson(movies);

            return movie;
        }


        //check here the enum
        public Movie UpdateMovie(Movie updateMovie)
        {
            var movies = _dataRepository.readFromJson();
            var currentMovieIndex = movies.FindIndex((m) => m.Id == updateMovie.Id);
            if (currentMovieIndex < 0) return null;

            movies[currentMovieIndex].Title = updateMovie.Title;
            // movies[currentMovieIndex].Category = updateMovie.Category;
            movies[currentMovieIndex].Category = ConvertToEnumCategory(updateMovie.Category.ToString());
            movies[currentMovieIndex].Rating = updateMovie.Rating;

            _dataRepository.WriteToJson(movies);
            return movies[currentMovieIndex];
        }


        public Movie DeleteMovie(int id)
        {
            var movies = _dataRepository.readFromJson();
            var currentMovie = movies.Find((m) => m.Id == id);

            if (currentMovie == null) return null;

            movies.Remove(currentMovie);
            _dataRepository.WriteToJson(movies);
            return currentMovie;
        }

        private Category ConvertToEnumCategory(string category)
        {
            
            // Category c = (Category)Enum.Parse(typeof(Category), category);
            // return c;
            if (Enum.TryParse(category, true, out Category movieCategory))
            {
                return movieCategory;
            }
            throw new ArgumentException("Invalid category");

        }

    }
}