using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repository
{
    public class DataRepository
    {
        private readonly string _filePath;

        public DataRepository(string filePath)
        {
            _filePath = filePath;
        }

        public List<Movie> readFromJson()
        {
            try
            {
                string json = File.ReadAllText(_filePath);
                var movies = JsonSerializer.Deserialize<List<Movie>>(json);
                return movies;
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine("file not found");
                return null;
                // return new List<Movie>();
            }
        }

        public void WriteToJson(List<Movie> movies)
        {
            string json = JsonSerializer.Serialize(movies, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            File.WriteAllText(_filePath, json);
        }
    }
}