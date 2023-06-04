import "./App.css";
import React,{useState} from "react";
import light_bg from "./images/bg-desktop-light.jpg";
import dark_bg from "./images/bg-desktop-dark.jpg";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from 'axios';



function App() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');


  const handleSubmit = async (todoItem,todoDesc,dueDate)=>{
      // let newToDoObj = {
      //   title: todoItem,
      //   description: todoDesc,
      // };
      // // console.log (newToDoObj);

      // let updatedTodoArr = [...list];
      // updatedTodoArr.push (newToDoObj);
      // // console.log (updatedTodoArr);
      // setList (updatedTodoArr);
      // localStorage.setItem ('todo_list', JSON.stringify (updatedTodoArr));
      try {
        const res = await axios.post('http://localhost:5000/api/item', {
          title: todoItem,
          description: todoDesc,
          date: dueDate,
        });
        fetchItems();
        // setList([...list,{status:"active",todo:todoItem,tododesc :todoDesc,date:dueDate}]); 
        // localStorage.setItem("todo_list",JSON.stringify([...list,{status:"active", title: todoItem, description: todoDesc,date: dueDate}]));
        // setList([...list,{status:"active", title: todoItem, description: todoDesc,date: dueDate}]);
    // console.log(list);
      // setCount(count+1);
        // console.log(res.data);
        // setList(list => [...list, res.data]);
      } catch (error) {
        console.error('Error adding todo item:', error);
      }

    
  }
  // console.log(list);

  const toogleTheme = () =>{
    if(theme === 'light'){
      setTheme('dark');
    }else{
      setTheme('light');
    }
  }

  useEffect(() => {
    document.body.className = theme ; 
  }, [theme])

  const fetchItems = async () =>{
    const data = await axios.get('http://localhost:5000/api/getitems')
    // console.log(data);
    setList(data?.data);
    // const newList = JSON.parse(localStorage.getItem("todo_list"));
    if(data?.data){
      let temp = [...data?.data]
      temp = temp.filter((item)=>item.status==="active")
      // setList(newList);
      setCount(temp.length);
    }
  }

  useEffect(() => {
    fetchItems();    
  }, [])
  

//Delete Item 
// const deleteItem = async(id) => {
//   try{
//     const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
//     console.log(res.data);
//     // const newListItems = listItems.filter(item=> item._id !== id);
//     // setListItems(newListItems);
//   }catch(err){
//     console.log(err);
//   }
// }



  return (
    <div className="main">
    <div>
    {theme==='light'? <img src={light_bg} alt="light-bg" /> : <img src={dark_bg} alt="dark-bg" />}
    </div>
      
      <div className="App">
        <div className="to_do">
          <div className="heading">
            <h1>TO DO!</h1>
            <div onClick={toogleTheme}>
            {theme==='light' ? <BsFillMoonFill fontSize="26px" /> : <BsFillSunFill fontSize="26px"/>}
            </div>
          </div>
         {/* <TodoForm list={list} setList={setList}/> */}
         <TodoForm handleSubmit={handleSubmit} theme={theme} setTheme = {setTheme}/>
          <TodoList list={list} setList={setList} count={count} setCount={setCount} theme={theme} setTheme = {setTheme} fetchItems={fetchItems}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
