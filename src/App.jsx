import { useState } from 'react'
import './App.css'

const Todo = () => {
  const [data, setData] = useState("")
  const [datas, setDatas] = useState([])
  const [editInput, setEditInput] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [showCompleted, setShowCompleted] = useState(false)

  function Onhandlechange(e) {
    setData(e.target.value)
  }

  function onhandlesubmit() {
    if (!data) return
    let temp = [...datas, { text: data, done: false }]
    setDatas(temp)
    setData("")
  }

  function del(index) {
    let result = datas.filter((_, ind) => ind !== index)
    setDatas(result)
  }

  function onCompleted(index) {
    let complete = [...datas]
    complete[index].done = !complete[index].done
    setDatas(complete)
  }

  function editTask(index) {
    let key = datas[index]
    setEditInput(key.text)
    setEditIndex(index)
  }

  function updateTask() {
    if (editIndex === null) return
    let Update = [...datas]
    Update[editIndex].text = editInput
    setDatas(Update)
    setEditInput("")
    setEditIndex(null)
  }

  function toggleCompletedTasks() {
    setShowCompleted(!showCompleted)
  }

  const completedTasks = datas.filter((task) => task.done === true)

  return (
    <div className="app">
      <h2 className="heading">To-Do List</h2>

      <div className="input-section">
        <input
          onChange={Onhandlechange}
          value={data}
          type="text"
          placeholder="Enter a new task..."
          className="todo-input"
        />
        <button onClick={onhandlesubmit} className="add-btn">Add</button>
      </div>

      {editIndex !== null && (
        <div className="edit-section">
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            type="text"
            placeholder="Edit your task..."
          />
          <button onClick={updateTask}>Update</button>
        </div>
      )}

      <div className="filter-section">
        <button onClick={toggleCompletedTasks} className="filter-btn">
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </button>
      </div>

      <div className="task-list">
        {datas.map((val, index) => (
          <p style={{ color: "red" }} key={index}>
            <span>
              {val.done ? <del>{val.text}</del> : val.text}
            </span>
            <button onClick={() => del(index)} className="delete-btn">Delete</button>
            <button onClick={() => onCompleted(index)} className="complete-btn">
              {val.done ? "Undo" : "Complete"}
            </button>
            <button onClick={() => editTask(index)} className="edit-btn">Edit</button>
          </p>
        ))}
      </div>

      {showCompleted && (
        <div className="completed-section">
          <h3 style={{ color: "green" }}>✅ Completed Tasks</h3>
          {completedTasks.length === 0 ? (
            <p style={{ color: "gray" }}>No completed tasks yet.</p>
          ) : (
            completedTasks.map((task, i) => (
              <p key={i} style={{ color: "green" }}>
                <del>{task.text}</del>
              </p>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Todo

// import React, { useState } from "react";

// const Todo = () => {
//   const [data, setData] = useState("");
//   const [datas, setDatas] = useState([]);
//   const [editInput, setEditInput] = useState("");
//   const [editIndex, setEditIndex] = useState(null); // 👈 to know which item is editing

//   function Onhandlechange(e) {
//     setData(e.target.value);
//   }

//   function onhandlesubmit() {
//     if (!data.trim()) return;

//     let temp = [...datas, { text: data, done: false }];
//     setDatas(temp);
//     setData("");
//   }

//   function del(index) {
//     let result = datas.filter((_, ind) => ind !== index);
//     setDatas(result);
//   }

//   function onCompleted(index) {
//     let complete = [...datas];
//     complete[index].done = !complete[index].done;
//     setDatas(complete);
//   }

//   // 🟢 when clicking Edit
//   function editTask(index) {
//     setEditInput(datas[index].text);
//     setEditIndex(index);
//   }

//   // 🟢 when clicking Update
//   function updateTask() {
//     if (editIndex === null) return;
//     let updated = [...datas];
//     updated[editIndex].text = editInput;
//     setDatas(updated);
//     setEditInput("");
//     setEditIndex(null);
//   }

//   return (
//     <div>
//       <div className="app">
//         <h2 className="heading">To-Do List</h2>

//         <div className="input-section">
//           <input
//             onChange={Onhandlechange}
//             value={data}
//             type="text"
//             placeholder="Enter a new task..."
//             className="todo-input"
//           />
//           <button onClick={onhandlesubmit} className="add-btn">
//             Add
//           </button>
//         </div>

//         {/* 🟣 Edit input + update button */}
//         {editIndex !== null && (
//           <div className="edit-section">
//             <input
//               type="text"
//               onChange={(e) => setEditInput(e.target.value)}
//               value={editInput}
//               placeholder="Edit your task..."
//               className="todo-input"
//             />
//             <button onClick={updateTask} className="update-btn">
//               Update
//             </button>
//           </div>
//         )}

//         <div className="task-list">
//           {datas.map((val, index) => (
//             <div className="task-item" key={index}>
//               <span style={{ color: "red" }}>
//                 {val.done ? <del>{val.text}</del> : val.text}
//               </span>
//               <button onClick={() => del(index)} className="delete-btn">
//                 Delete
//               </button>
//               <button onClick={() => onCompleted(index)} className="complete-btn">
//                 {val.done ? "Undo" : "Complete"}
//               </button>
//               <button onClick={() => editTask(index)} className="edit-btn">
//                 Edit
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Todo;
