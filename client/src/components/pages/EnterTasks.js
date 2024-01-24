import React from "react";
import { get, post } from "../../utilities";
import Dropdown from "../modules/Dropdown";
/* Ignore this for now
  While this is (mostly) functional, it doesn't fit with our React structure and will likely be better fitted
  into a component so that we can use props from the Urgent/Important Grid */
const EnterTasks = () => {
  let taskName = "";
  let hours;
  let minutes;
  let label;
  const handleTaskNameChange = (event) => {
    taskName = event.target.value;
  };
  const handleHoursChange = (event) => {
    hours = event.target.value;
  };
  const handleMinutesChange = (event) => {
    minutes = event.target.value;
  };
  const addTask = () => {
    post("/api/task", {
      name: taskName,
      owner: "0",
      duration: hours * 60 + minutes,
      label: "",
      category: "",
      notes: "",
      source: "Manual",
    });
  };
  return (
    <>
      <h1>Enter your Lemons:</h1>
      <p>Task Name:</p>
      <input
        type="text"
        placeholder=""
        className="EnterTasks-taskNameInput"
        onChange={handleTaskNameChange}
      />
      <p>Duration</p>
      <input
        type="number"
        min="0"
        placeholder=""
        className="EnterTasks-hourInput"
        onChange={handleHoursChange}
      />
      hrs
      <input
        type="number"
        min="0"
        placeholder=""
        className="EnterTasks-minuteInput"
        onChange={handleMinutesChange}
      />
      mins
      <p>Notes</p>
      <textarea rows="4" cols="50"></textarea>
      <div>
        <button type="button" onClick={addTask}>
          Add
        </button>
        {/* For Now, Next Button does nothing */}
        <button
          type="submit"
          onClick={() => {
            console.log(taskName);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EnterTasks;
