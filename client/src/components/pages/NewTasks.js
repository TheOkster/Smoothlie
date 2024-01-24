import React from "react";
import { get, post } from "../../utilities";
import Dropdown from "../modules/Dropdown";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* Ignore this for now
  While this is (mostly) functional, it doesn't fit with our React structure and will likely be better fitted
  into a component so that we can use props from the Urgent/Important Grid */
const NewTask = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(location.state?.taskList ?? []);
  const [date, setDate] = useState();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const handleDateChange = (event) => {
    setDate(event.target.valueAsDate);
  };
  const handleChange = (setter) => {
    // I'm not sure why return is necessary in this case, but it doesn't work without it
    return (event) => {
      setter(event.target.value);
    };
  };

  const addTask = () => {
    if (taskName == "" || date === undefined || (hours == 0 && minutes == 0)) {
      return;
    }
    post("/api/task", {
      name: taskName,
      owner: props.userId,
      duration: hours * 60 + minutes,
      label: label,
      deadline: date,
      notes: notes,
      source: "Manual",
    }).then((task) =>
      navigate("/entertasks", {
        state: {
          taskList: taskList.concat({ _id: task._id, name: task.name }),
        },
      })
    );
  };
  return (
    <>
      <h1>Enter your Lemons:</h1>
      <p>Task Name:</p>
      <input
        type="text"
        placeholder=""
        className="EnterTasks-taskNameInput"
        onChange={handleChange(setTaskName)}
      />
      <p>Deadline</p>
      <input
        type="datetime-local"
        placeholder=""
        className="EnterTasks-dateInput"
        onChange={handleDateChange}
      />
      <p>Duration</p>
      <input
        type="number"
        min="0"
        placeholder=""
        className="EnterTasks-hourInput"
        onChange={handleChange(setHours)}
      />
      hrs
      <input
        type="number"
        min="0"
        max="60"
        placeholder=""
        className="EnterTasks-minuteInput"
        onChange={handleChange(setMinutes)}
      />
      mins
      <p>Label: </p>
      <Dropdown
        handleChange={handleChange(setLabel)}
        // To Do: Use Not Hardcoded Label Options
        fields={["", "", "", ""]}
      />
      <p>Additional Notes:</p>
      <textarea rows="4" cols="50" onChange={handleChange(setNotes)}></textarea>
      <div>
        <button type="button" onClick={addTask}>
          Add
        </button>
      </div>
    </>
  );
};

export default NewTask;
