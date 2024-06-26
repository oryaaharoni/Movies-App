import { useContext, useState } from "react";
import PropTypes from "prop-types";
import EditForm from "../EditForm/EditForm";
import axios from "axios";
import styled from "styled-components";
import { indexToCategory } from "../../utils/utils";
import { Store } from "../../store";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 5px;
  font-family: cursive;
  flex: 0 1 24%;
  border: 2px solid lightgray;
  align-items: center;
  width: 20rem;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

const EditBtn = styled.button`
  background-color: #8ca3ff;
  border-radius: 5px;
  padding: 10px;
`;

const DeleteBtn = styled.button`
  background-color: #ff7878;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const BackBtn = styled.button`
  background-color: #ababab;
  border-radius: 5px;
`;

function Card({ item, categories , refreshData }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate(); 

  const [edit, setEdit] = useState(false);

  const deleteHandler = async () => {
    try {
      const { data } = await axios
        .delete(`Movie/${item.id}`);
      console.log(data);

      ctxDispatch({ type: 'REMOVE_ITEM', payload: item });
      refreshData();
      navigate("/");
    } 
    catch (error) {
      console.log(error);
    }
  };

  const renderCard = () => {
    return (
      <Container>
        <Image src="https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-reel-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg" />
        <h2>{item.title}</h2>
        <h3>Category: {indexToCategory(categories, item.category)}</h3>
        <p>
          Rating: <strong style={{ color: "green" }}>{item.rating}</strong>
        </p>
        {renderButtons()}
      </Container>
    );
  };

  const renderButtons = () => {
    return (
      <Buttons>
        <EditBtn onClick={() => setEdit(!edit)}>Edit</EditBtn>
        <DeleteBtn onClick={deleteHandler}>Delete</DeleteBtn>
      </Buttons>
    );
  };

  return (
    <div>
      {edit && <BackBtn onClick={() => setEdit(!edit)}>Back</BackBtn>}
      {!edit && renderCard()}
      {edit && <EditForm item={item} categories={categories} refreshData={refreshData}/>}
    </div>
  );
}
Card.propTypes = {
  item: PropTypes.object,
  categories: PropTypes.array,
  refreshData: PropTypes.func.isRequired,
};
export default Card;
