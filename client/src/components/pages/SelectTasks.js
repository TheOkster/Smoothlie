import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
import { get } from "../../utilities";
import { useState } from "react";
import Checkbox from "../modules/Checkbox";
import "./General.css";
import "./TaskPage.css";

const SelectTasks = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const navigate = useNavigate();
  const [possibleTaskList, setPossibleTaskList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState(new Set());
  get("/api/tasks", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  return (
    <div className="TaskPage-pageContainer">
      {possibleTaskList.length > 0 ? (
        possibleTaskList.map((task) => (
          <Checkbox
            for={task._id}
            text={task.name}
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
        <div>You have no existing tasks to import!</div>
      )}
      <button
        className="Button"
        onClick={() => {
          navigate("/entertasks", {
            state: { taskList: possibleTaskList.filter((task) => checkedTasks.has(task._id)) },
          });
        }}
      >
        Finish Selecting Existing Tasks
      </button>
    </div>
  );
};

export default SelectTasks;
