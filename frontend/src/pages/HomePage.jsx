import Card from "../components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("Movie");

      const sortedMovies = data.sort((a, b) => b.rating - a.rating);

      setMovies(sortedMovies);
      // setMovies(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {movies.map((movie, index) => (
          <Card item={movie} key={index}></Card>
        ))}
      </div>
    </>
  );
}
export default HomePage;
