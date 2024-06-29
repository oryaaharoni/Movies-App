import PropTypes from "prop-types";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { findIndexCategory, indexToCategory } from "../../utils/utils";
import { Store } from "../../store";

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

function EditForm({ item, categories ,refreshData}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
   

  useEffect(() =>{
    console.log(item.category)
    var itemCtgName = indexToCategory(categories, item.category);
    console.log(itemCtgName)
  },[]);

  const titleRef = useRef(item.title);
  const categoryRef = useRef(item.category);
  const ratingRef = useRef(item.rating);

  
  const editHandler = async (e) => {

    e.preventDefault();

    const ctgIndex = findIndexCategory(categories, categoryRef.current.value);
    
    try {
      console.log(titleRef.current.value)
      console.log(ctgIndex)
      console.log(ratingRef.current.value)

      const { data } = await axios
        .put("Movie", {
          Id: item.id,
          Title: titleRef.current.value,
          Category: ctgIndex,
          Rating: parseInt(ratingRef.current.value, 10),
        });
      console.log(data);
      ctxDispatch({ type: 'REFRESH_ITEM', payload: item });
      refreshData();
   
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
              minLength={2}
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

EditForm.propTypes = {
  item: PropTypes.object.isRequired,
  categories: PropTypes.array,
  refreshData: PropTypes.func.isRequired,
};

export default EditForm;
