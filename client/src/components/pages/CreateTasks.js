import React from "react";
import { get, del } from "../../utilities";
import { useState, useEffect } from "react";
import TaskCheckbox from "../modules/TaskCheckbox";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Task from "../modules/Task";
import TaskFull from "../modules/TaskFull";
import * as mongoose from "mongoose";
import "./General.css";
import "./Mobile.css";
import { useMediaQuery } from "react-responsive";

const CreateTasks = (props) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const location = useLocation();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(location.state?.taskList ?? []);
  const [indivTaskId, setIndivTaskId] = useState("");
  const [isNewTask, setIsNewTask] = useState(false);
  useEffect(() => {
    // Event listener for popstate
    // the handlePopState, window.addEventListener, and window.removeEventListener were taken from ChatGPT
    const handlePopState = (event) => {
      // Update condition based on the state
      if (event.state) {
        setIndivTaskId(event.state.indivTaskId);
        setIsNewTask(event.state.isNewTask);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // Run only once on component mount
  //  console.log(taskList);
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const handleDelete = () => {
    console.log("Did it work?");
    del("/api/task", { id: mongoose.Types.ObjectId("65aeecf2087fa00ec4207d12") });
    setShowAlert(true);
  };

  return (
    <>
      <div className="pageContainer">
        <div className="createtoplineContainer">
          <h1>Your current tasks are: </h1>
        </div>
        <div className="tasklistContainer">
          {taskList.length > 0 ? (
            taskList.map((task) => (
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
            <div>You have no existing tasks. Click below to add a task!</div>
          )}
        </div>
        <div className="buttonContainer">
          <button
            className="Button"
            onClick={() => {
              setIsNewTask(true);
            }}
          >
            Add New Task
          </button>
          <button
            className="Button"
            onClick={() => {
              navigate("/taskgrid", { state: { taskList: taskList } });
            }}
          >
            Finishing Adding Tasks
          </button>
        </div>
      </div>
      <Modal
        isOpen={indivTaskId !== ""}
        onRequestClose={() => {
          setIndivTaskId("");
        }}
        style={{
          content: {
            width: "auto", // Adjust the width as needed
            height: "auto", // Adjust the height as needed
            margin: "auto", // Center the modal horizontally
          },
        }}
      >
        <TaskFull
          _id={indivTaskId}
          setIndivTaskId={setIndivTaskId}
          setIsNewTask={setIsNewTask}
          isNewTask={isNewTask}
          taskList={taskList}
          setTaskList={setTaskList}
          {...props}
        />
      </Modal>
      <Modal
        isOpen={isNewTask}
        onRequestClose={() => {
          setIsNewTask(false);
        }}
        style={{
          content: {
            width: "auto", // Adjust the width as needed
            height: "auto", // Adjust the height as needed
            margin: "auto", // Center the modal horizontally
          },
        }}
      >
        <TaskFull
          _id={indivTaskId}
          setIndivTaskId={setIndivTaskId}
          setIsNewTask={setIsNewTask}
          isNewTask={isNewTask}
          taskList={taskList}
          setTaskList={setTaskList}
          {...props}
        />
      </Modal>
    </>
  );
};

export default CreateTasks;
