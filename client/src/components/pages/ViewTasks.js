import React from "react";
import { get, del } from "../../utilities";
import { useState } from "react";
import Checkbox from "../modules/Checkbox";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Task from "../modules/Task";
import TaskFull from "../modules/TaskFull";
import * as mongoose from "mongoose";
import "./General.css";
import "./ViewTasks.css";

const ViewTasks = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const [possibleTaskList, setPossibleTaskList] = useState([]);
  const [indivTaskId, setIndivTaskId] = useState();

  get("/api/tasks", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  const handleDelete = () => {
    console.log("Did it work?");
    del("/api/task", { id: mongoose.Types.ObjectId("65aeecf2087fa00ec4207d12") });
    setShowAlert(true);
  };
  return (
    <>
      {indivTaskId === undefined ? (
        <div>
          {possibleTaskList.length > 0 ? (
            possibleTaskList.map((task) => (
              <Task
                key={task._id}
                _id={task._id}
                name={task.name}
                onDelete={handleDelete}
                onTitleClick={(_id) => {
                  setIndivTaskId(_id);
                }}
              />
            ))
          ) : (
            <div>You have no existing tasks!</div>
          )}
          <button className="Button">Add New Task</button>
        </div>
      ) : (
        <TaskFull _id={indivTaskId} setIndivTaskId={setIndivTaskId} {...props} />
      )}
    </>
  );
};

export default ViewTasks;
