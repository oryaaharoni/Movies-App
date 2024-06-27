import PropTypes from "prop-types";
import "./EditForm.css";
import { useRef } from "react";
import axios from "axios";

function EditForm({item}) {
  const titleRef = useRef(item.title);
  const categoryRef = useRef(item.category);
  const ratingRef = useRef(item.rating);

  const editHandler = async (e) => {
      e.preventDefault();

      try {
        const { data } = await axios.put("Movie", {
          Id: item.id,
          Title: titleRef.current.value,
          Category: parseInt(categoryRef.current.value, 10),
          Rating: parseInt(ratingRef.current.value, 10)
        })
        .then(alert('Movie edited successfully'))
        .catch('failed to change movie');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      
  };

  var categories = ["wwe", "sas", "fffg"];

  return (
    <>
      <div>
        <form onSubmit={editHandler}>
          <label>
            Title:
            <input type="text" name="title"  ref={titleRef} defaultValue={item.title}/>
          </label>
          <br />
          <label>
            Category:
            <select name="subject" id="subject" ref={categoryRef}  defaultValue={item.category}>
            <option selected="selected">{item.category}</option>
            {categories.map((category, index) => (
                <option value={category} key={index}>{category}</option>  
              ))}
        </select>
        <br/>
          </label>
          <br />
          <label>
            Rating:
            <input type="number" name="rating" ref={ratingRef} defaultValue={item.rating} min="1" max="10"/>
          </label>
          <br />
          <button type="submit">Submit</button>
          </form>
        </div>
      
    </>
  );
}
EditForm.propTypes = { item: PropTypes.object.isRequired };
export default EditForm;
