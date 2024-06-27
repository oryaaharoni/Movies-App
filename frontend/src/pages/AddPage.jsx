import "./AddPage.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AddPage() {
  // var categories = ["2", "3", "5"];
  const [categories, setCategories] = useState([]);

  const [movie, setMovie] = useState({
    Title: "",
    Category: "",
    Rating: "",
  });

  // temp -check
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("Movie/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(movie.Title);
    console.log(movie.Category);
    console.log(movie.Rating);

    try {
      const { data } = await axios
        .post("Movie", {
          Title: movie.Title,
          Category: parseInt(movie.Category, 10),
          Rating: parseInt(movie.Rating, 10),
        })
        .then(alert("Movie added successfully"))
        .catch("failed to add movie");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Add New Movie Details:</h1>
        <form onSubmit={submitHandler}>
          <label className="form-label">
            Title:
            <input className="form-input"
              type="text"
              name="Title"
              value={movie.Title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="form-label">
            Category:
            <select className="form-input"
              name="Category"
              value={movie.Category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
            <br />
          </label>
          <br />
          <label className="form-label">
            Rating:
            <input className="form-input"
              type="number"
              name="Rating"
              value={movie.Rating}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </label>
          <br />
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </>
  );
}
export default AddPage;
