import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { findIndexCategory } from "../utils/utils";
import PropTypes from "prop-types";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

function AddPage({ categories }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    Title: "",
    Category: "",
    Rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const cagtIndex = findIndexCategory(categories, movie.Category);

    try {
      const { data } = await axios.post("Movie", {
        Title: movie.Title,
        Category: cagtIndex,
        Rating: parseInt(movie.Rating, 10),
      });
      await ctxDispatch({ type: "ADD_ITEM", payload: data });
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Movie Is Already Exists");
    }
  };

  return (
    <>
    <Title title="Add Movie Page"></Title>
      <Container>
        <Title>Add New Movie Details:</Title>
        <form onSubmit={submitHandler}>
          <Label>
            Title:
            <Input
              type="text"
              name="Title"
              value={movie.Title}
              onChange={handleChange}
              minLength={2}
            />
          </Label>
          <br />
          <Label>
            Category:
            <Select
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
            </Select>
            <br />
          </Label>
          <br />
          <Label>
            Rating:
            <Input
              type="number"
              name="Rating"
              value={movie.Rating}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </Label>
          <br />
          <SubmitBtn type="submit">Submit</SubmitBtn>
        </form>
      </Container>
    </>
  );
}

AddPage.propTypes = { categories: PropTypes.array };

export default AddPage;
