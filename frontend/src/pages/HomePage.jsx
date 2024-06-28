import Card from "../components/Card/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { indexToCategory } from "../utils/utils";

const Container = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
`;

function HomePage({ categories }) {
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("Movie");
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {movies.map((movie, index) => {
        return <Card item={movie} key={index} categories={categories}></Card>;
      })}
    </Container>
  );
}
HomePage.propTypes = {
  categories: PropTypes.array,
};

export default HomePage;
