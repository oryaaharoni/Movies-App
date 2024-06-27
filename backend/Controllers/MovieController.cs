using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly DataRepository _dataRepository;
        private static int _counter = 12;
        public MovieController(DataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet("")]
        public IEnumerable<Movie> GetMovies()
        {
            var movies = _dataRepository.readFromJson();
            return movies;
            // return movies == null ? NotFound() : Ok(movies);
            // return _dataRepository.readFromJson();
        }

        [HttpPost("")]
        public IActionResult AddMovie([FromBody] Movie movie)
        {

            //not work - מקבל נל
            if (movie.Title == null)
            {
                // StatusCode(400); 
                return BadRequest("Movie cannot be null");
            }
            List<Movie> movies = _dataRepository.readFromJson();
            if (movies.Any(m => m.Title == movie.Title))
            {
                return Conflict("Movie already exists");
            }
            movie.Id = _counter++;
            movies.Add(movie);

            _dataRepository.WriteToJson(movies);

            return Ok(movie);
        }

        [HttpPut("")]
        public IActionResult UpdateMovie([FromBody] Movie updateMovie)
        {
            //check if update movie is null
            //maybe remove
            if (updateMovie == null) return BadRequest("movie cannot be null");

            var movies = _dataRepository.readFromJson();
            var currentMovieIndex = movies.FindIndex((m) => m.Id == updateMovie.Id);
            if (currentMovieIndex < 0) return NotFound();

            movies[currentMovieIndex].Title = updateMovie.Title;
            movies[currentMovieIndex].Category = updateMovie.Category;
            movies[currentMovieIndex].Rating = updateMovie.Rating;

            _dataRepository.WriteToJson(movies);
            return Ok(movies[currentMovieIndex]);

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movies = _dataRepository.readFromJson();
            var currentMovie = movies.Find((m) => m.Id == id);

            if (currentMovie == null) return NotFound();

            movies.Remove(currentMovie);
            _dataRepository.WriteToJson(movies);
            return Ok(currentMovie);

        }


        [HttpGet("categories")]
        public ActionResult<IEnumerable<string>> GetCategories()
        {
            var categories = Enum.GetNames(typeof(Category)).ToList();
            return Ok(categories);
        }
    }
}