import React, { useState, useEffect } from "react";
import List from "./components/list";
import Alert from "./components/alert";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return [];
  }
}


function App() {
  const [goal, setGoal] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" })


  const clearFunction = () => {
    setList([]);
    showAlert(true, "Your list has been cleared", "danger")
    setIsEdit(false)
  }
  const markDone = (id) => {
    const myItem = list.find((item) => item.id == id)
    console.log(myItem.id)
   document.getElementById(myItem.id).classList.toggle("done")
  }
  const removeFuction = (id) => {
    setList(list.filter((item) => item.id !== id))
    showAlert(true, "An item has been deleted", "danger")
  }
  const editFunction = (id) => {
    const myItem = list.find((item) => item.id == id);
    setIsEdit(true);
    setEditId(id);
    setGoal(myItem.title);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal) {
      showAlert(true, "Please type a goal", "danger")
    } else if (goal && isEdit) {
      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: goal }
        }
        return item
      }))
      showAlert(true, "Your goal has been edited", "success")
      setGoal("");
      setIsEdit(false)
    } else {
      setIsEdit(false)
      let idNumber = 1;
      const newItem = { id: new Date().getTime().toString(), title: goal };
      setList([...list, newItem]);
      setGoal("");
      showAlert(true, "An item has been added to your list", "success")
    }
  }

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type })
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000)
    return () => clearTimeout(timeout)
    
  }, [list])

  return <section className="app-section">
    <h1>To Do List</h1>
    <Alert {...alert} />
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setGoal(e.target.value)} value={goal} className="my-input" placeholder="Enter your goal" type="text" />
      <button className="add-button" type="submit">
        {isEdit ? "Edit" : "Add"}
      </button>

    </form>
    <List  markDone={markDone} items={list} edit={editFunction} remove={removeFuction} />
    {(list.length > 0) ? <button onClick={clearFunction} className="clear-list">Clear list</button> : ""}
  </section>
}

export default App;
