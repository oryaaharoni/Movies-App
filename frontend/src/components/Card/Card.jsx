import { useState } from "react";
import "./Card.css";
import PropTypes from "prop-types";
import EditForm from "../EditForm/EditForm";
import axios from "axios";

function Card({ item }) {
  const [edit, setEdit] = useState(false);

  const deleteHandler = async () => {
    console.log(item.id)
    try {
        const { data } = await axios.delete(`Movie/${item.id}`);
        // .then(alert('Movie deleted successfully'))
        // .catch('failed to delete movie');
        console.log(data);
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <div className="card">
      <div className="card-inner">
        {edit ? (
          <button className="backBtn" onClick={() => setEdit(!edit)}>
            Back
          </button>
        ) : null}

        {!edit ? (
          <div>
            <h2>{item.title}</h2>
            <h3>{item.category}</h3>
            <p>
              Rating:{" "}
              <strong style={{ color: "green" }}>{item.rating}</strong>
            </p>
            <button className="editBtn" onClick={() => setEdit(!edit)}>
              Edit
            </button>
            <button className="deleteBtn" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        ) : null}

        {edit ? <EditForm item={item} /> : null}
      </div>
    </div>
  );
}
Card.propTypes = { item: PropTypes.object };
export default Card;
