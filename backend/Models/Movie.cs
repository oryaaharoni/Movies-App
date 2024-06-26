using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public Category Category { get; set; }
        public int Rating { get; set; }
    }
}