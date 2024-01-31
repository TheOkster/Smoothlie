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

const SelectTasks = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const navigate = useNavigate();
  const [possibleTaskList, setPossibleTaskList] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState(new Set());
  const [indivTaskId, setIndivTaskId] = useState(undefined);
  useEffect(() => {
    get("/api/tasks", { owner: props.userId }).then((tasks) => setPossibleTaskList(tasks));
  }, []);

  return (
    <div className="pageContainer">
      <div className="mainContainer">
        {possibleTaskList.length > 0 ? (
          possibleTaskList.map((task) => (
            <TaskCheckbox
              for={task._id}
              task={task}
              key={task._id}
              handleChange={(event) => {
                // TODO: Make this less slow
                event.target.checked
                  ? setCheckedTasks(new Set([...checkedTasks, event.target.id]))
                  : setCheckedTasks(
                      new Set([...checkedTasks].filter((item) => item != event.target.id))
                    );
              }}
              onTitleClick={(_id) => {
                setIndivTaskId(_id);
              }}
            />
          ))
        ) : (
          <div>You have no existing tasks to import!</div>
        )}
        <Modal
          isOpen={indivTaskId !== undefined}
          onRequestClose={() => {
            setIndivTaskId(undefined);
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
            taskList={possibleTaskList}
            setTaskList={setPossibleTaskList}
            {...props}
          />
        </Modal>
      </div>
      <button
        className="Button"
        onClick={() => {
          navigate("/createtasks", {
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
