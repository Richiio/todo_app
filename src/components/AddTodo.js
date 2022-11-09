import React, {useContext, useState} from "react";
import "../assets/modal.css";
import {CategoryContext} from "../contexts/CategoryContext";
import {TodoContext} from "../contexts/TodoContexts";
import {getDate, getTime} from "./dateFunc";
import displayMsg from "./Message";
// import displayMsg from "./Message";

const AddTodo = () => {
  const {addTodo} = useContext(TodoContext);
  const {categories, submitCategory} = useContext(CategoryContext);
  const [btnText, setBtnText] = useState("Submit");
  const [showModal, setShowModal] = useState(false);
  const [isValid, setisValid] = useState(false);
  const [formData, setformData] = useState({
    task: "",
    dueDate: getDate(),
    category: categories.length > 0 ? categories[0].name : "",
  });

  const [newCt, setNewCt] = useState("");
  let pattern = new RegExp(/^[a-z]/i);
  const addCategory = () => {
    if (newCt && pattern.test(newCt)) {
      setNewCt("");
      let categoryObject = {
        id: new Date().getTime().toString(),
        name: newCt,
        archived: false,
      };
      submitCategory(categoryObject);
      setformData(data => {
        return {...data, category: newCt};
      });
    }
  };

  // update UI on form submission
  const formHandler = e => {
    e.preventDefault();
    if (pattern.test(formData.task) && formData.category) {
      const newTodo = {
        id: new Date().getTime().toString(),
        ...formData,
        dueDate: formData.dueDate.replaceAll("-", "/"),
        completed: false,
        time: getTime(),
      };
      console.log(newTodo, formData);
      addTodo(newTodo);
      setBtnText(`\u2714 Task Added`);
      setformData({
        task: "",
        dueDate: getDate(),
        category: categories[0].name,
      });
      setTimeout(() => {
        setBtnText(`Submit`);
        setShowModal(false);
      }, 1000);
    } else {
      setisValid(true);
      setTimeout(() => setisValid(false), 2000);
      displayMsg("error", "Invalid Task Input");
    }
  };

  const handleFormChange = e => {
    const {name, value} = e.target;
    if (formData.dueDate < getDate()) {
      displayMsg("error", "Inavlid Due Date");
    } else {
      e.target.setCustomValidity("");
      setformData(data => {
        return {...data, [name]: value};
      });
    }
    console.log(formData);
  };
  return (
    <>
      <div className="form-control">
        <button onClick={() => setShowModal(true)} className="add-todo">
          + Add Task
        </button>
        <div
          onClick={() => setShowModal(false)}
          className="overlay"
          style={{display: showModal ? "block" : "none"}}
        ></div>
        <div style={{display: showModal ? "block" : "none"}} className="modal">
          <form className="form" onSubmit={e => formHandler(e)}>
            <span onClick={() => setShowModal(false)} className="closeModal">
              x
            </span>
            {categories.length > 0 && (
              <>
                <div className="form-group">
                  <label htmlFor="task">Enter Task:</label>
                  <input
                    style={{borderColor: isValid ? "red" : "var(--item-hover)"}}
                    required
                    name="task"
                    type="text"
                    className="input"
                    id="task"
                    value={formData.task}
                    onChange={e => handleFormChange(e)}
                    placeholder="Enter task"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Enter Due Date:</label>
                  <input
                    required
                    className="input"
                    name="dueDate"
                    type="date"
                    id="date"
                    min={getDate()}
                    value={formData.dueDate}
                    onChange={e => handleFormChange(e)}
                    placeholder="Enter Date"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Select Category: </label>
                  <select
                    className="input"
                    value={formData.category}
                    name="category"
                    onChange={e => handleFormChange(e)}
                  >
                    {categories.map(({name, id}) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <h3 style={{textAlign: "center"}}>OR...</h3>
              </>
            )}

            <div className="form-group">
              <label htmlFor="newCt">Add New Category:</label>
              <div className="pwd-wrap">
                <input
                  type="text"
                  className="input"
                  id="newCt"
                  value={newCt}
                  onChange={e => setNewCt(e.target.value)}
                  placeholder="Enter task"
                />
                <button
                  onClick={addCategory}
                  type="button"
                  className="view-pwd"
                >
                  + Add
                </button>
              </div>
            </div>
            {categories.length > 0 && (
              <button type="submit" className="btn">
                {btnText}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
