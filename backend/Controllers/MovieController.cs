using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        
        private static int _counter = 12;

        private readonly MovieService _movieService;
        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }
        

        [HttpGet("")]
        public IEnumerable<Movie> GetMovies()
        {

            return _movieService.GetMovies();
        }

        [HttpPost("")]
        public IActionResult AddMovie([FromBody] Movie movie)
        {

            // //not work - מקבל נל
            if (movie == null)
            {
                
                return BadRequest("Movie cannot be null");
            }
            var m = _movieService.AddMovie(movie);
            if (m == null) return Conflict("Movie already exists");
            else return Ok(m);
        }

        [HttpPut("")]
        public IActionResult UpdateMovie([FromBody] Movie movie)
        {
            //check if update movie is null
            //maybe remove
            if (movie == null) return BadRequest("movie cannot be null");

            var updateMovie = _movieService.UpdateMovie(movie);
            if (updateMovie == null) return NotFound();
            else return Ok(updateMovie);

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = _movieService.DeleteMovie(id);
            if (movie == null) return NotFound();
            else return Ok(movie);
        }


        [HttpGet("categories")]
        public ActionResult<IEnumerable<string>> GetCategories()
        {
            var categories = Enum.GetNames(typeof(Category)).ToList();
            return Ok(categories);
        }


        [HttpGet("{category}")]
        public ActionResult<string> ConvertToEnumCategory(string category)
        {
            var categories = Enum.GetNames(typeof(Category)).ToList();
            if (categories.Any(c => c == category)){
                
                return Ok(category);
            }
            else return NotFound("jjjjjjjjjjjjj");
           
            
        }
    }
}