import Card from "../components/Card/Card";
import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Store } from "../store";
import Title from "../components/shared/Title";

const Container = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: #ffffff;
`;

function HomePage({ categories }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [movies, setMovies] = useState([]);

  const getData = useCallback(async () => {
    ctxDispatch({ type: "GET_REQUEST" });
    try {
      const { data } = await axios.get("Movie");
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);

      ctxDispatch({ type: "MOVIES", payload: sortedMovies });
    } catch (error) {
      console.log(error);
      ctxDispatch({ type: "GET_FAIL", payload: error.message });
    }
  }, [ctxDispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Title title="Home Page"></Title>
      {movies.map((movie, index) => {
        return (
          <Card
            item={movie}
            key={index}
            categories={categories}
            refreshData={getData}
          ></Card>
        );
      })}
    </Container>
  );
}
HomePage.propTypes = {
  categories: PropTypes.array,
};

export default HomePage;
