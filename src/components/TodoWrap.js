import Todo from "../components/todo";
import {useContext, useState} from "react";
import {CategoryContext} from "../contexts/CategoryContext";

const TodoWrap = ({todos, category}) => {
  const [showTasks, setShowTasks] = useState(true);
  const {delCategory} = useContext(CategoryContext);
  const showClass = showTasks ? `show` : "hide";
  return (
    <>
      <div className="category">
        <div
          onClick={() => setShowTasks(prev => !prev)}
          className="accordion-btn"
        >
          <p className="">{category.name}</p>
          <div className="text">
            <p style={{cursor: "pointer", fontSize: "1.5rem"}}>
              {showTasks ? "-" : "+"}
            </p>{" "}
            &nbsp;
            <button
              onClick={() => delCategory(category.id)}
              className="trash"
              type="button"
            >
              {category.archived ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="inherit"
                >
                  <path
                    fill="inherit"
                    d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`panel ${showClass}`}>
          {todos
            .filter(el => el.category === category.name)
            .map(data => {
              return <Todo key={data.id} data={data} />;
            })}
        </div>
      </div>
    </>
  );
};

export default TodoWrap;
