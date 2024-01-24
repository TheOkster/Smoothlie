import React from "react";
import { get, post } from "../../utilities";
import Dropdown from "../modules/Dropdown";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateTasks = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(location.state?.taskList ?? []);
  //  console.log(taskList);
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  return (
    <div className="TaskPage-pageContainer">
      <h1>Tasks:</h1>
      <ul className="EnterTasks-taskList">
        {taskList.map((task) => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
      <button className="Button"
        onClick={() => {
          navigate("/newtask", { state: { taskList: taskList } });
        }}
      >
        Add a New Task
      </button>
      <button className="Button"
        onClick={() => {
          navigate("/taskgrid", { state: { taskList: taskList } });
        }}
      >
        Finish Adding Tasks
      </button>
    </div>
  );
};

export default CreateTasks;
