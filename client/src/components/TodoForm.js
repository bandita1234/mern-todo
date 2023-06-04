import React, { useState } from "react";

const TodoForm = ({ handleSubmit, theme, setTheme }) => {
  const [todoItem, setTodoItem] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  
  //We can use the above funcn in App.js
  return (
    <div>
    
      <form
        className="todo_form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(todoItem, todoDesc, dueDate);
          setTodoItem("");
          setTodoDesc("");
          setDueDate("");
        }}
      >
        <div>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            placeholder="Create a new todo..."
            style={{ marginBottom: "4px" }}
          />
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
            placeholder="Add Description..."
            style={{ marginBottom: "4px" }}
          />
          <input
            className={theme === "light" ? "light" : "dark"}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Add Due Date..."
            style={{ marginBottom: "4px" }}
          />
        </div>
        <button
          type="submit"
        >
          ADD ITEM!
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
