import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
import { get } from "../../utilities";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import TaskFull from "../modules/TaskFull.js";
import TaskCheckbox from "../modules/TaskCheckbox.js";
import "./General.css";
import "./TaskPage.css";
import "../../utilities.css";

const TestProjectAdding = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState("");
  const [projectList, setPossibleTaskList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState(new Set());
  const [showAddProject, setShowAddProject] = useState(false);
  const handleChange = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  useEffect(() => {
    get("/api/projects", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  }, []);

  return (
    <div className="pageContainer">
      <div className="mainContainer">
        {projectList.length > 0 ? (
          projectList.map((project) => (
            <Checkbox
              for={project._id}
              name={project.name}
              handleChange={(event) => {
                // TODO: Make this less slow
                event.target.checked
                  ? setCheckedTasks(new Set([...checkedTasks, event.target.id]))
                  : setCheckedTasks(
                      new Set([...checkedTasks].filter((item) => item != event.target.id))
                    );
              }}
            />
          ))
        ) : (
          <div>You have no projects!</div>
        )}
      </div>

      {showAddProject ? (
        <div className="line">
          <div className="labelContainer">
            <p>Project Name:</p>
            <input
              type="text"
              className="longInputBox"
              value={newProjectName}
              //"EnterTasks-taskNameInput"
              onChange={handleChange(setNewProjectName)}
            />
          </div>
        </div>
      ) : (
        <div className="line">
          <button
            className="Button"
            //   onClick={() => {
            //     navigate("/createtasks", {
            //       state: { taskList: projectList.filter((task) => checkedTasks.has(task._id)) },
            //     });
            //   }}
            onClick={() => {
              setShowAddProject(true);
            }}
          >
            Add New Project
          </button>
          <button
            className="Button"
            //   onClick={() => {
            //     navigate("/createtasks", {
            //       state: { taskList: projectList.filter((task) => checkedTasks.has(task._id)) },
            //     });
            //   }}
            onClick={() => {
              for (const task in projectList.filter((task) => checkedTasks.has(task._id))) {
              }
            }}
          >
            Delete Selected Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default TestProjectAdding;
