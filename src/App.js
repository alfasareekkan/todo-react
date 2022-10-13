import "./App.css";
import { useState } from "react";

function App() {
  const [toDoText, setToDoText] = useState("");
  const [newTodo, setNewTodo] = useState([]);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const day = dayNames[date.getDay()];
  const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currDate = new Date();
  const hours = currDate.getHours();
  const AMorPM = hours >= 12 ? "PM" : "AM";
  var hour = hours % 12;
  const hour12 = () => {
    if (hour === 0) hour = 12;
    return hour;
  };
  const toDoDate =
    currDate.getDate() +
    "." +
    (currDate.getMonth() + 1) +
    "." +
    currDate.getFullYear();
  const toDoDay = dayNamesShort[currDate.getDay()];
  const toDoTime =
    hour12() +
    ":" +
    currDate.getMinutes() +
    ":" +
    currDate.getSeconds() +
    " " +
    AMorPM;
  const toDoTimeDateDay = toDoTime + " " + toDoDay + " " + toDoDate;

  return (
    <div className="App">
      <div className="main-heder">
        <h1>Good morning. Its {day}</h1>
      </div>
      <div className="todos">
        <div className="todo-portion">
          <h2>Completed Task</h2>

          {newTodo.map((obj) => {
            if (obj.statusDone && !obj.statusRemove) {
              return (
                <div className="todo-list-body todo-list-body1" key={obj.id} >
                  <div className="todo-list">
                    <div className="left">
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        <del>{obj.text}</del>
                        <span style={{ fontWeight: "normal" }}>
                          {obj.toDoTime}
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <i
                        onClick={(e) => {
                          let isDelete = window.confirm(
                            "Deleting ToDo permanently !"
                          );
                          if (isDelete) {
                            e.target.value = true;
                          }
                          setNewTodo(
                            newTodo.filter((obj2) => {
                              if (obj2.id === obj.id) {
                                obj2.statusRemove = e.target.value;
                              }
                              return obj2;
                            })
                          );
                        }}
                        value={obj.statusRemove}
                        className="fas fa-trash-alt"
                        title="Remove"
                      ></i>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="todo-portion">
          <h2>Todos</h2>
          <div className="input">
            <input
              type="text"
              placeholder="🖊️  Add item..."
              value={toDoText}
              onChange={(e) => setToDoText(e.target.value)}
            />
            <i
              onClick={() => setToDoText("")}
              className="fas fa-eraser"
              title="Clear"
            ></i>
            <i
              className="fas fa-plus"
              onClick={() => {
                if (toDoText === "") {
                  alert("please enter a text");
                  return false;
                }
                setNewTodo([
                  ...newTodo,
                  {
                    id: Date.now(),
                    text: toDoText,
                    toDoTime: toDoTimeDateDay,
                    statusErase: false,
                    statusDone: false,
                    statusDrop: false,
                    statusRetrieve: false,
                    statusRemove: false,
                  },
                ]);
                setToDoText("");
              }}
            ></i>
          </div>
          {newTodo.map((obj, index) => {
            if (!obj.statusDone && !obj.statusDrop) {
              return (
                <div className="todo-list-body todo-list-body2" key={obj.id}>
                  <div className="todo-list">
                    <div className="left">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={(e) => {
                          setNewTodo(
                            newTodo.filter((todo) => {
                              if (todo.id === obj.id) {
                                todo.statusDone = e.target.checked;
                              }
                              return todo;
                            })
                          );
                        }}
                      />
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        {obj.text}{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {obj.toDoTime}
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <i
                        className="fas fa-times"
                        onClick={(e) => {
                          e.target.value = true;
                          setNewTodo(
                            newTodo.filter((obj2) => {
                              if (obj.id === obj2.id) {
                                obj2.statusDrop = e.target.value;
                              }
                              return obj2;
                            })
                          );
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            } else if (
              !obj.statusDone &&
              obj.statusDrop &&
              obj.statusRetrieve
            ) {
              return (
                <div className="todo-list-body todo-list-body2" key={obj.id}>
                  <div className="todo-list">
                    <div className="left">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={(e) => {
                          setNewTodo(
                            newTodo.filter((todo) => {
                              if (todo.id === obj.id) {
                                todo.statusDone = e.target.checked;
                              }
                              return todo;
                            })
                          );
                        }}
                      />
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        {obj.text}{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {obj.toDoTime}
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <i
                        className="fas fa-times"
                        onClick={(e) => {
                          e.target.value = true;
                          setNewTodo(
                            newTodo.filter((obj2) => {
                              if (obj.id === obj2.id) {
                                obj2.statusDrop = e.target.value;
                              }
                              return obj2;
                            })
                          );
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="todo-portion">
          <h2>Deleted Tasks</h2>
          {newTodo.map((obj) => {
            if (obj.statusDrop && !obj.statusRemove && !obj.statusRetrieve) {
              return (
                <div className="todo-list-body todo-list-body3">
                  <div className="todo-list">
                    <div className="left">
                      <i 
                        onClick={(e) => {
                          let isDelete = window.confirm(
                            "Retrieving dropped ToDo"
                          );
                          if (isDelete) {
                            e.target.value = true;
                          }
                          setNewTodo(
                            newTodo.filter((obj2) => {
                              if (obj2.id === obj.id) {
                                obj2.statusRetrieve = e.target.value;
                              }
                              return obj2;
                            })
                          );
                        }}
                        value={obj.statusRetrieve}
                        className="fas fa-redo-alt"
                        title="Retrieve"
                      ></i>
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        {obj.text}{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {obj.toDoTime}
                        </span>
                      </p>
                    </div>
                    <div className="right">
                      <i
                        onClick={(e) => {
                          let isDelete = window.confirm(
                            "Deleting ToDo permanently !"
                          );
                          if (isDelete) {
                            e.target.value = true;
                          }
                          setNewTodo(
                            newTodo.filter((obj2) => {
                              if (obj2.id === obj.id) {
                                obj2.statusRemove = e.target.value;
                              }
                              return obj2;
                            })
                          );
                        }}
                        value={obj.statusRemove}
                        className="fas fa-trash-alt"
                        title="Remove"
                      ></i>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
