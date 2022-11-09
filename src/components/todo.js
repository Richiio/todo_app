import React, {useContext} from "react";
import {TodoContext} from "../contexts/TodoContexts";
import {getDate} from "./dateFunc";

const Todo = props => {
  const todoStyle = () => {
    return {
      textDecoration: props.data.completed ? "line-through" : "none",
      opacity: props.data.completed ? "0.5" : "1",
    };
  };
  const {checkTodo, delTodo} = useContext(TodoContext);

  const {data} = props;
  const {task, dueDate, id, completed} = data;
  return (
    <>
      <div className="todo-item">
        <div className="text right">
          <label className="checkbox">
            <input
              type="checkbox"
              id={id}
              checked={completed}
              onChange={() => checkTodo(id)}
            />
          </label>
          <label htmlFor={id} className="check-label" style={todoStyle()}>
            {task}
            {/* <span>{time}</span> */}
          </label>
        </div>
        <div className="text left">
          <p
            className="dueTag"
            style={{
              color:
                dueDate <= getDate().replaceAll("-", "/")
                  ? "#f15959"
                  : "#1cc71c",
            }}
          >
            {dueDate}
          </p>{" "}
          &nbsp; &nbsp;
          <button className="closeBtn" onClick={() => delTodo(id)}>
            X
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Todo;
