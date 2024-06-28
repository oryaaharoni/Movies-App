import PropTypes from "prop-types";
// import "./EditForm.css";
import { useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  /* background-color: #ffffff; */
  border-radius: 5px;
  font-family: cursive;
  flex: 0 1 24%;
  border: 2px solid lightgray;
  align-items: center;
  width: 20rem;
  
  /* height:50%; */
`;

const EditBtn = styled.div`
  background-color: #ff7878;
  border-radius: 5px;
  width: 28%;
  padding: 2px;
  
`;

// const EditBtn = styled.div`
//   background-color: #ff7878;
//   border-radius: 5px;
//   width: 28%;
//   padding: 2px;
  
// `;
// const findIndexCategory = () => {
//   console.log("categories : ", categories);
//   const index = categories.findIndex((c) => c === movie.Category);
//   console.log("i: ", index);
//   movie.Category = index;
// };


function EditForm({ item }) {
  const titleRef = useRef(item.title);
  const categoryRef = useRef(item.category);
  const ratingRef = useRef(item.rating);

  const editHandler = async (e) => {
    e.preventDefault();

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

  var categories = ["wwe", "sas", "fffg"];

  return (
    <>
      <Container>
        <form onSubmit={editHandler}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              ref={titleRef}
              defaultValue={item.title}
            />
          </label>
          <br />
          <label>
            Category:
            <select
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
            </select>
            <br />
          </label>
          <br />
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              ref={ratingRef}
              defaultValue={item.rating}
              min="1"
              max="10"
            />
          </label>
          <br />
          <EditBtn type="submit">Submit</EditBtn>
        </form>
      </Container>
    </>
  );
}
EditForm.propTypes = { item: PropTypes.object.isRequired };
export default EditForm;
