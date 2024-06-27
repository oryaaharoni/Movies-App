using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Movie
    {
        // [JsonIgnore]
        // [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string Title { get; set; }

        [Required]
        [EnumDataType(typeof(Category), ErrorMessage = "Invalid category.")]
        public Category Category { get; set; }

        // [Range(1, 10)]
        public int Rating { get; set; }
    }
}