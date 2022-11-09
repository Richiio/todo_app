import {useContext} from "react";
import {Droppable} from "react-beautiful-dnd";
import TodoWrap from "../components/TodoWrap";
import {CategoryContext} from "../contexts/CategoryContext";
import {TodoContext} from "../contexts/TodoContexts";
import {Draggable} from "react-beautiful-dnd";

const Completed = () => {
  const {todos} = useContext(TodoContext);
  const {categories} = useContext(CategoryContext);

  const completedTodos = todos.filter(data => data.completed !== false);
  const categoryList = categories.filter(ct => ct.archived === false);

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
                      <TodoWrap todos={completedTodos} category={category} />
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
// const Completed = ({todos, checkTodo, delTodo}) => {
//   return (
//     <Droppable droppableId="todo-wrap">
//       {provided => (
//         <div
//           className="todo-wrap"
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//         >
//           {todos
//             .filter(data => data.completed === true)
//             .map((data, index) => {
//               return (
//                 <Draggable key={data.id} draggableId={data.id} index={index}>
//                   {provided => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <Todo
//                         checkTodo={() => checkTodo(data.id)}
//                         delTodo={() => delTodo(data.id)}
//                         data={data}
//                       />
//                     </div>
//                   )}
//                 </Draggable>
//               );
//             })}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// };

export default Completed;
