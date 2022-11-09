import React, {useContext} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DragDropContext} from "react-beautiful-dnd";
import AddTodo from "./components/AddTodo";
import Header from "./components/header";
import Home from "./pages/Home";
import Pending from "./pages/pending";
import Completed from "./pages/completed";
import Links from "./components/links";
import "./App.css";
import {TodoContext} from "./contexts/TodoContexts";
import {CategoryContext} from "./contexts/CategoryContext";
import Archived from "./pages/Archived";

const AppWrap = () => {
  const {todos, clearCompleted} = useContext(TodoContext);
  const {reorderCategories} = useContext(CategoryContext);

  return (
    <Router>
      <main>
        <Header />
        <AddTodo />
        {todos && (
          <>
            <DragDropContext onDragEnd={reorderCategories}>
              <Switch>
                <Route exact path="/">
                  {<Home />}
                </Route>
                <Route exact path="/pending">
                  <Pending />
                </Route>
                <Route exact path="/completed">
                  <Completed />
                </Route>
                <Route exact path="/archive">
                  <Archived />
                </Route>
              </Switch>
            </DragDropContext>
            <Links
              num={todos.filter(todo => todo.completed === true).length}
              clear={clearCompleted}
            />
            <p className="info">
              Drag And Drop Each Category To Reorder List 😋
            </p>
          </>
        )}
      </main>
    </Router>
  );
};
export default AppWrap;
