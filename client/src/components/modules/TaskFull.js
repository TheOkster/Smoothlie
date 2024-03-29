import React, { useState, useEffect } from "react";
import { get, del, put, post } from "../../utilities";
import Dropdown from "./Dropdown";
import "./Task.css";
import "../pages/General.css";

/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @param {boolean} isNewTask
 * @param {function} setIsNewTask
 * @param {Array} taskList
 * @param {Array} setTasklist
 */
const TaskFull = (props) => {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState();
  const [hours, setHours] = useState(0);
  const [fruit, setFruit] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  // Add Error checking
  const convertToDateTimeLocalString = (date) => {
    // Taken from StackOverflow: https://stackoverflow.com/questions/30166338/setting-value-of-datetime-local-from-date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  if (!props.isNewTask || !("isNewTask" in props)) {
    useEffect(() => {
      get("/api/task", { _id: props._id }).then((task) => {
        setTaskName(task.name);
        setDeadline(convertToDateTimeLocalString(new Date(task.deadline)));
        setHours(Math.floor(task.duration / 60));
        setMinutes(Math.round(task.duration % 60));
        setLabel(task.label);
        setNotes(task.notes);
      });
    }, []);
  } else {
    useEffect(() => {
      props.setIsNewTask(convertToDateTimeLocalString(new Date(Date.now() + 86400000)));
    }, []);
  }
  const handleDateChange = (event) => {
    console.log(event.target.value);
    setDeadline(event.target.value);
  };
  const handleChange = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  const closeTask = () => {
    if (props.indivTaskId !== "") {
      props.setIndivTaskId("");
    } else {
      setIsNewTask(false);
    }
  };
  const addTask = () => {
    if (taskName === "" || deadline === undefined || (hours === "0" && minutes === "0")) {
      alert(
        "Make sure that the task name, deadline (including the time), and duration boxes are filled!"
      );
      return;
    }

    post("/api/task", {
      _id: props._id,
      name: taskName,
      owner: props.userId,
      duration: parseInt(hours) * 60 + parseInt(minutes),
      deadline: new Date(deadline),
      notes: notes,
      source: "Manual",
    }).then((task) => {
      props.setTaskList([...props.taskList, task]);
      props.setIsNewTask(false);
    });
  };
  const updateTask = () => {
    if (taskName === "" || deadline === undefined || (hours === "0" && minutes === "0")) {
      alert(
        "Make sure that the task name, deadline (including the time), and duration boxes are filled!"
      );
      {
        /*make this actually distinct – each alert is for smth specific */
      }
      return;
    }

    put("/api/task", {
      _id: props._id,
      name: taskName,
      owner: props.userId,
      duration: parseInt(hours) * 60 + parseInt(minutes),
      deadline: new Date(deadline),
      notes: notes,
      source: "Manual",
    }).then((newTask) => {
      console.log(`Task ID: ${props.indivTaskId}`);
      props.setTaskList(
        props.taskList.map((task) => {
          if (task._id === props._id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
      props.setIndivTaskId("");
    });
  };

  const deleteTask = () => {
    // del("/api/task", {
    //   _id: props._id,
    // }).then(() => {
    //   console.log(`Task ID: ${props.indivTaskId}`);
    //   props.setIndivTaskId(undefined);
    //   props.setTaskList(props.taskList.filter((task) => task._id != props._id));
    // });
    if (props.fullDelete) {
      props.setIndivTaskId("");
      props.setTaskList(props.taskList.filter((task) => task._id != props._id));
    } else {
      del("/api/task", {
        _id: props._id,
      }).then(() => {
        console.log(`Task ID: ${props.indivTaskId}`);
        props.setIndivTaskId("");
        props.setTaskList(props.taskList.filter((task) => task._id != props._id));
      });
    }
  };
  return (
    <div>
      <h1>Enter your Tasks:</h1>
      <div className="taskContainer">
        <div className="line">
          <div className="labelContainer">
            <p>Task Name:</p>
            <input
              type="text"
              placeholder=""
              className="longInputBox"
              value={taskName}
              onChange={handleChange(setTaskName)}
            />
          </div>
        </div>
        <div className="line">
          <div className="labelContainer">
            <p>Deadline:</p>
            <input
              type="datetime-local"
              placeholder=""
              value={deadline}
              className="EnterTasks-dateInput"
              onChange={handleDateChange}
            />
          </div>
          <div className="labelContainer">
            <div className="smallContainer">
              <p>Duration: </p>
              <input
                type="number"
                min="0"
                max="10000"
                placeholder=""
                onChange={handleChange(setHours)}
              />
              <p>hrs </p>
              <input
                type="number"
                min="0"
                max="59"
                placeholder=""
                value={minutes}
                onChange={handleChange(setMinutes)}
              />
              <p>mins</p>
            </div>
            {/* <div className="smallContainer">
              <button className="Button">+15m</button>
              <button className="Button">-15m</button>
            </div> */}
          </div>
        </div>
        <div className="line">
          <div className="smallContainer">
            <p>Additional Notes:</p>
            <textarea value={notes} rows="4" cols="50" onChange={handleChange(setNotes)}></textarea>
          </div>
          {props.isNewTask ? (
            <div>
              <button className="Button" type="button" onClick={addTask}>
                Add
              </button>
            </div>
          ) : (
            <div className="smallContainer">
              <button className="Task-Button" type="button" onClick={updateTask}>
                Update
              </button>
              <button className="Task-Button" type="button" onClick={deleteTask}>
                Delete
              </button>
              <button className="Task-Button" type="button" onClick={closeTask}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFull;
