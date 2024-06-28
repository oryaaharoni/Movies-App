import Card from "../components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  flex-wrap: wrap;
  background-color:#ffffff;
`;

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
    <Container>
      {movies.map((movie, index) => (
        <Card item={movie} key={index}></Card>
      ))}
    </Container>
  );
}
export default HomePage;
