import {useContext} from "react";
import {Droppable} from "react-beautiful-dnd";
import TodoWrap from "../components/TodoWrap";
import {CategoryContext} from "../contexts/CategoryContext";
import {TodoContext} from "../contexts/TodoContexts";
import {Draggable} from "react-beautiful-dnd";

const Pending = () => {
  const {todos} = useContext(TodoContext);
  const {categories} = useContext(CategoryContext);
  const categoryList = categories.filter(ct => ct.archived === false);
  const pendingTodos = todos.filter(data => data.completed === false);

  return (
    <Droppable droppableId="todo-wrap">
      {provided => (
        <div
          className="todo-wrap"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {categoryList &&
            categoryList.map((category, index) => {
              let {name, id} = category;
              return (
                <Draggable key={id} draggableId={name + id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoWrap todos={pendingTodos} category={category} />
                    </div>
                  )}
                </Draggable>
              );
            })}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Pending;
