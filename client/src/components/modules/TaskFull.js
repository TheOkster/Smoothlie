import React, { useState, useEffect } from "react";
import { get, del, put } from "../../utilities";
import Dropdown from "./Dropdown";
import "./Task.css";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 */
/* Right now this is basically the same code as NewTasks w/o location and navigate and with
  the fields already set */
const TaskFull = (props) => {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  // Add Error checking
  const convertToDateTimeLocalString = (date) => {
    // Taken from StackOverflow
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
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
  const handleDateChange = (event) => {
    console.log(event.target.value);
    setDeadline(event.target.value);
  };
  const handleChange = (setter) => {
    // I'm not sure why return is necessary in this case, but it doesn't work without it
    return (event) => {
      setter(event.target.value);
    };
  };

  const updateTask = () => {
    if (taskName === "" || deadline === undefined || (hours === "0" && minutes === "0")) {
      alert(
        "Make sure that the task name, deadline (including the time), and duration boxes are filled!"
      );
      return;
    }

    put("/api/task", {
      _id: props._id,
      name: taskName,
      owner: props.userId,
      duration: parseInt(hours) * 60 + parseInt(minutes),
      label: label,
      deadline: new Date(deadline),
      notes: notes,
      source: "Manual",
    }).then(() => {
      console.log(`Task ID: ${props.indivTaskId}`);
      props.setIndivTaskId(undefined);
    });
  };
  const deleteTask = () => {
    del("/api/task", {
      _id: props._id,
    }).then(() => {
      console.log(`Task ID: ${props.indivTaskId}`);
      props.setIndivTaskId(undefined);
    });
  };
  return (
    <div className="TaskPage-pageContainer">
      <h1>Enter your Lemons:</h1>
      <div className="TaskPage-line">
        <p>Task Name:</p>
        <input
          type="text"
          value={taskName}
          className="EnterTasks-taskNameInput"
          onChange={handleChange(setTaskName)}
        />
      </div>
      <div className="TaskPage-line">
        <p>Deadline</p>
        <input
          type="datetime-local"
          value={deadline}
          className="EnterTasks-dateInput"
          onChange={handleDateChange}
        />
      </div>
      <div className="TaskPage-line">
        <p>Duration</p>
        <input
          type="number"
          min="0"
          value={hours}
          className="EnterTasks-hourInput"
          onChange={handleChange(setHours)}
        />
        hrs
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          className="EnterTasks-minuteInput"
          onChange={handleChange(setMinutes)}
        />
        mins
      </div>
      <div className="TaskPage-line">
        <p>Label: </p>
        <Dropdown
          handleChange={handleChange(setLabel)}
          // To Do: Use Not Hardcoded Label Options
          fields={["Lemons", "Avocados", "Blah", "Heh"]}
        />
      </div>
      <div className="TaskPage-line">
        <p>Additional Notes:</p>
        <textarea value={notes} rows="4" cols="50" onChange={handleChange(setNotes)}></textarea>
        <div>
          <button className="Button" type="button" onClick={updateTask}>
            Update
          </button>
          <button className="Button" type="button" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFull;
