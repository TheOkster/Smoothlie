import React from "react";
import { get, post } from "../../utilities";
import Dropdown from "../modules/Dropdown";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./General.css";

/*TODO: Page is no longer useful, will probably delete before 1/31 12:00PM*/

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
  const [showAlert, setShowAlert] = useState(false);
  const handleDateChange = (event) => {
    console.log(event.target.value);
    const parsedDateTime = new Date(event.target.value);
    setDate(parsedDateTime);
  };
  const handleChange = (setter) => {
    // I'm not sure why return is necessary in this case, but it doesn't work without it
    return (event) => {
      setter(event.target.value);
    };
  };

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 500px)' })

  const addTask = () => {
    if (taskName === "" || date === undefined || (hours === "0" && minutes === "0")) {
      alert(
        "Make sure that the task name, deadline (including the time), and duration boxes are filled!"
      );
      return;
    }
    /*edit this later to make it custom to each */

    post("/api/task", {
      name: taskName,
      owner: props.userId,
      duration: parseInt(hours) * 60 + parseInt(minutes),
      label: label,
      deadline: date,
      notes: notes,
      source: "Manual",
      // hardcoding these for now, eventually these should be passed in as well
      fruit: "",
      urgent: true,
      important: true,
    }).then((task) =>
      navigate("/createtasks", {
        state: {
          taskList: taskList.concat({
            _id: task._id,
            name: task.name,
            owner: task.owner,
            duration: task.duration,
            label: task.label,
            deadline: task.deadline,
            notes: task.notes,
            source: task.source,
          }),
        },
      })
    );
  };
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  return (
    <div className="pageContainer">
      <h1>Enter your Fruits:</h1>
      <div className="taskContainer">
        <div className="line">
          <div className="labelContainer">
            <p>Task Name:</p>
            <input
              type="text"
              placeholder=""
              className="longInputBox"
              //"EnterTasks-taskNameInput"
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
              className="dateInput"
              onChange={handleDateChange}
            />
          </div>
          <div className="labelContainer">
            <div className="smallContainer">
              <p>Duration: </p>
              <input
                type="number"
                min="0"
                placeholder=""
                className="inputBox"
                onChange={handleChange(setHours)}
              />
              hrs
              <input
                type="number"
                min="0"
                max="59"
                placeholder=""
                className="inputBox"
                onChange={handleChange(setMinutes)}
              />
              mins
            </div>
            <div className="smallContainer">
              <div className="Button">+15m</div>
              <div className="Button">-15m</div>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="labelContainer">
            <p>Fruit type: </p>
            {/* need to fix the dropdown*/}
            <Dropdown
              handleChange={handleChange(setLabel)}
              fields={["lemons", "avocados", "strawberries", "bananas"]}
            />
          </div>
          <div className="labelContainer">
            <p>Project: </p>
            <Dropdown
              handleChange={handleChange(setLabel)}
              // To Do: Use Not Hardcoded Label Options
              fields={["", "", "", ""]}
            />
          </div>
        </div>
        <div className="line">
          <div className="labelContainer">
            <p>Additional Notes:</p>
            <textarea className="longInputBox" rows="4" cols="50" onChange={handleChange(setNotes)}></textarea>
          </div>
          <button className="Button" type="button" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
