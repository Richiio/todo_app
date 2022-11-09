import {createContext, useState} from "react";
// import {getDate, getTime} from "../components/dateFunc";
export const TodoContext = createContext();

const TodoContextWrapper = props => {
  // state
  const [todos, setTodo] = useState(
    localStorage.getItem("tomTodo")
      ? JSON.parse(localStorage.getItem("tomTodo"))
      : []
  );

  //   event listeners
  // func to del an item
  const delTodo = id => {
    let newTodo = todos.filter(todos => id !== todos.id);
    setTodo(newTodo);
    localStorage.setItem("tomTodo", JSON.stringify(newTodo));
  };

  //   check todo
  const checkTodo = id => {
    console.log(todos);
    let newTodo = todos.map(todo => {
      if (id === todo.id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodo(newTodo);
    localStorage.setItem("tomTodo", JSON.stringify(newTodo));
  };

  // add todo
  const addTodo = data => {
    setTodo(oldTodos => {
      let newTodos = [...oldTodos, data];
      localStorage.setItem("tomTodo", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  //   clear completed
  const clearCompleted = () => {
    let newTodos = todos.filter(todo => todo.completed === false);
    setTodo(newTodos);
    localStorage.setItem("tomTodo", JSON.stringify(newTodos));
  };
  return (
    <TodoContext.Provider
      value={{todos, checkTodo, clearCompleted, addTodo, delTodo, setTodo}}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
