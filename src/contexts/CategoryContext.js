import {createContext, useState} from "react";
import displayMsg from "../components/Message";
export const CategoryContext = createContext();

const CategoryContextWrapper = props => {
  const [categories, setCategories] = useState(
    localStorage.getItem("todoCategories")
      ? JSON.parse(localStorage.getItem("todoCategories"))
      : []
  );

  const delCategory = id => {
    let newCategories = categories.map(ct => {
      if (id === ct.id) {
        ct.archived = !ct.archived;
        displayMsg(
          "success",
          ct.archived
            ? `Category "${ct.name}" Archived`
            : `Category "${ct.name}" Unarchived`
        );
      }
      return ct;
    });
    setCategories(newCategories);
    localStorage.setItem("todoCategories", JSON.stringify(newCategories));
  };

  const submitCategory = item => {
    let newCategories = [...categories, item];
    setCategories([...newCategories]);
    localStorage.setItem("todoCategories", JSON.stringify(newCategories));
  };

  function reorderCategories(result) {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
    localStorage.setItem("todoCategories", JSON.stringify(categories));
  }
  return (
    <CategoryContext.Provider
      value={{submitCategory, categories, reorderCategories, delCategory}}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextWrapper;
