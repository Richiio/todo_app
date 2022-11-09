import React from "react";

import CategoryContextWrapper from "./contexts/CategoryContext";
import TodoContextWrapper from "./contexts/TodoContexts";
import AppWrap from "./AppWrap";

const App = () => {
  return (
    <TodoContextWrapper>
      <CategoryContextWrapper>
        <AppWrap />
      </CategoryContextWrapper>
    </TodoContextWrapper>
  );
};
export default App;
