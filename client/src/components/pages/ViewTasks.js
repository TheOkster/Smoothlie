import React from "react";
import { get } from "../../utilities";
import { useState } from "react";
import Checkbox from "../modules/Checkbox";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Task from "../modules/Task";
import "./General.css";
import "./ViewTasks.css";

const ViewTasks = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const [possibleTaskList, setPossibleTaskList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  get("/api/tasks", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  console.log(showAlert);
  const handleDelete = () => {
    setShowAlert(true);
  };
  return (
    <>
      <div>
        {possibleTaskList.length > 0 ? (
          possibleTaskList.map((task) => (
            <Task _id={task._id} name={task.name} onDelete={handleDelete} />
          ))
        ) : (
          <div>You have no existing tasks!</div>
        )}
        <button className="Button">Add New Task</button>
      </div>
    </>
  );
};

export default ViewTasks;
