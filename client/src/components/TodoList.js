import React, { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const TodoList = ({ list, setList, count, setCount, theme, setTheme ,fetchItems}) => {
  // const [variant, setVariant] = useState("all");
  const [open, setOpen] = useState(false);

  const [todoItem, setTodoItem] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todoId, setTodoId] = useState('');

  const clrCompleted = async() => {
    const res = await axios.delete("http://localhost:5000/api/delete-completed")
    const newList = list.filter((ele) => ele.status === "active");
    setList(newList);
    // localStorage.setItem("todo_list", JSON.stringify(newList));
  };

  const handleCompletion = async(item) => {
    // console.log(id);
    const res = await axios.put(`http://localhost:5000/api/item`, {
        id:item._id,
        title: item.title,
        description: item.description,
        date: item.date,
        status:item.status==="active" ? "inactive" :"active"
      });
      fetchItems();
    // let newList = [...list];
    // newList.forEach((item) => {
    //   if (item._id === id) {
    //     // item.status=item.status==="inactive"?"active":"inactive";
    //     if (item.status === "inactive") {
    //       item.status = "active";
    //       setCount(count + 1);
    //     } else {
    //       item.status = "inactive";
    //       setCount(count - 1);
    //     }
    //   }
    // });

  };
  const handleDelete = async (id) => {
   
    try {
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`);
      // console.log(res);
      const newListItems = list.filter((item) => {
        if (item._id === id && item.status === "active") {
          setCount(count - 1);
        }
        return item._id !== id;
      });
      setList(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async ()=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/item`, {
        id:todoId,
        title: todoItem,
        description: todoDesc,
        date: dueDate,
      });
      // setList([...list,{status:"active", title: todoItem, description: todoDesc,date: dueDate}]);
    console.log(res);
    fetchItems();
    setOpen(false);
  // localStorage.setItem("todo_list",JSON.stringify([...list,{status:"active",todo:todoItem,tododesc :todoDesc,dueDate:dueDate}]));
    } catch (error) {
      console.error('Error adding todo item:', error);
    }  
}
const handleEdit = (item) =>{
  // console.log(item);
  setTodoItem(item.title);
  setTodoDesc(item.description);
  setDueDate(item.date);
  setTodoId(item._id);
}

const handleActive = () =>{
  let temp =[...list];
  console.log(temp);
  temp = temp.filter((item)=>{
    console.log(item.status);
    return item.status==="active"
  })
  // console.log(temp);
  setList(temp)
}
const handleCompleted =()=>{
  let temp =[...list];
  temp = temp.filter((item)=>{
    return item.status==="inactive"
  })
  console.log(temp);
  setList(temp)
}

  return (
    <div className="main_list">
      <div className={`todo_list ${theme === "light" ? "light" : "dark"}`}>
        {
          list?.map((item) => (
            <div className="para_icon" key={item._id}>
            <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle>Update Todo Item</DialogTitle>
            <div>
            {/*controlled input*/}
            <form
              className="todo_form"
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
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
                // onClick={() => {
                //   handleSubmit(todoItem);
                //   setTodoItem("");
                // }}
              >
                Update!
              </button>
            </form>
          </div>
          </Dialog>
              <div
                className={
                  `todo_item ${item.status}`
                  // item.status === "inactive" ? "inactive todo_item" : "todo_item"
                }
              >
                <p onClick={() => handleCompletion(item)}>
                  {item.title}{" "}
                  <span style={{ color: "red", fontSize: "16px" }}>
                    ({item.date})
                  </span>
                </p>
                <FaEdit className="edit_icon" onClick={() => {setOpen(true);handleEdit(item)}} />
                <GiCrossMark
                  className="cross_icon"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                />
              </div>
              <div
                style={{
                  color: "rgb(77, 178, 144)",
                  paddingLeft: "10px",
                  borderBottom: "1px solid hsl(233, 11%, 84%)",
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        {/*variant === "active" &&
          list
            .filter((ele) => ele.status === "active")
            .map((item) => (
              <div className="para_icon" key={item._id}>
                <div
                  className={
                    `todo_item ${item.status}`
                    // item.status === "inactive" ? "inactive todo_item" : "todo_item"
                  }
                >
                  <p onClick={() => handleCompletion(item._id)}>
                    {item.title}{" "}
                    <span style={{ color: "red", fontSize: "16px" }}>
                      ({item.date})
                    </span>
                  </p>
                  <FaEdit className="edit_icon" />
                  <GiCrossMark
                    className="cross_icon"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  />
                </div>
                <div
                  style={{
                    color: "rgb(77, 178, 144)",
                    paddingLeft: "10px",
                    borderBottom: "1px solid hsl(233, 11%, 84%)",
                  }}
                >
                  {item.description}
                </div>
              </div>
                ))*/}
        {/*variant === "completed" &&
          list
            .filter((ele) => ele.status !== "active")
            .map((item) => (
              <div className="para_icon" key={item._id}>
                <div
                  className={
                    `todo_item ${item.status}`
                    // item.status === "inactive" ? "inactive todo_item" : "todo_item"
                  }
                >
                  <p onClick={() => handleCompletion(item._id)}>
                    {item.title}{" "}
                    <span style={{ color: "red", fontSize: "16px" }}>
                      ({item.date})
                    </span>
                  </p>
                  <FaEdit className="edit_icon" />
                  <GiCrossMark
                    className="cross_icon"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  />
                </div>
                <div
                  style={{
                    color: "rgb(77, 178, 144)",
                    paddingLeft: "10px",
                    borderBottom: "1px solid hsl(233, 11%, 84%)",
                  }}
                >
                  {item.description}
                </div>
              </div>
                ))*/}
      </div>
      <div className={`footer ${theme === "light" ? "light" : "dark"}`}>
        <p>{count} items left</p>
        <div>
          <p style={{ color: "blue" }} onClick={fetchItems}>
            All
          </p>
          <p onClick={handleActive}>Active</p>
          <p onClick={handleCompleted}>Completed</p>
        </div>
        <p onClick={clrCompleted}>Clear completed</p>
      </div>
    </div>
  );
};

export default TodoList;
