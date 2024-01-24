import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
import { get } from "../../utilities";
import { useState } from "react";
import Checkbox from "../modules/Checkbox";
const SelectTasks = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const navigate = useNavigate();
  const [possibleTaskList, setPossibleTaskList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState(new Set()); // Didn't use useState since we will never need to render this
  get("/api/tasks", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  return (
    <div>
      {possibleTaskList.map((task) => (
        <Checkbox
          for={task._id}
          text={task.name}
          handleChange={(event) => {
            event.target.checked
              ? setCheckedTasks(new Set([...checkedTasks, event.target.id]))
              : setCheckedTasks(
                  new Set([...checkedTasks].filter((item) => item != event.target.id))
                );
            // TODO: Make this less slow
          }}
        />
      ))}
      <button
        onClick={() => {
          navigate("/entertasks", {
            state: { taskList: possibleTaskList.filter((task) => checkedTasks.has(task._id)) },
          });
        }}
      >
        Finish Selecting Checked Tasks
      </button>
    </div>
  );
};

export default SelectTasks;
