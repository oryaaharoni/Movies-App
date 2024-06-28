import PropTypes from "prop-types";
import { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  border-radius: 5px;
  font-family: cursive;
  flex: 0 1 24%;
  border: 2px solid lightgray;
  align-items: center;
  width: 20rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const EditBtn = styled.button`
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

function EditForm({ item }) {
  const [categories, setCategories] = useState([]);

  const titleRef = useRef(item.title);
  const categoryRef = useRef(item.category);
  const ratingRef = useRef(item.rating);

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

  const findIndexCategory = (categoryName) => {
    const index = categories.findIndex((c) => c === categoryName);
    return index;
  };

  const editHandler = async (e) => {
    e.preventDefault();

    findIndexCategory(categoryRef.current.value);
    console.log(categoryRef.current.value);
    try {
      const { data } = await axios
        .put("Movie", {
          Id: item.id,
          Title: titleRef.current.value,
          Category: parseInt(categoryRef.current.value, 10),
          Rating: parseInt(ratingRef.current.value, 10),
        })
        .then(alert("Movie edited successfully"))
        .catch("failed to change movie");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={editHandler}>
          <Label>
            Title:
            <Input
              type="text"
              name="title"
              ref={titleRef}
              defaultValue={item.title}
            />
          </Label>
          <br />
          <Label>
            Category:
            <Select
              name="subject"
              id="subject"
              ref={categoryRef}
              defaultValue={item.category}
            >
              <option selected="selected">{item.category}</option>
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
              name="rating"
              ref={ratingRef}
              defaultValue={item.rating}
              min="1"
              max="10"
            />
          </Label>
          <br />
          <EditBtn type="submit">Submit</EditBtn>
        </form>
      </Container>
    </>
  );
}
EditForm.propTypes = { item: PropTypes.object.isRequired };
export default EditForm;
