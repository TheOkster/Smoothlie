import React from "react";
import { get, post } from "../../utilities";
import Dropdown from "../modules/Dropdown";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NewTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(location.state?.taskList ?? []);
  console.log("Task list");
  console.log(taskList);
  return (
    <>
      <h1>Tasks:</h1>
      <ul className="EnterTasks-taskList">
        {taskList.map((task) => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate("/newtask", { state: { taskList: taskList } });
        }}
      >
        Add a New Task
      </button>
    </>
  );
};

export default NewTask;
