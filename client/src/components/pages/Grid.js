import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
import {useMediaQuery} from 'react-responsive';
import "./Mobile.css";

const GridPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state?.taskList) {
    console.log("yes");
    return <div>Please don't call this page directly.</div>;
  }
  const [taskList, setTaskList] = useState(location.state.taskList);
  const [quadrants, setQuadrants] = useState();
  const [taskGrid, setTaskGrid] = useState({
    notUrgNotImp: [],
    notUrgIsImp: [],
    isUrgNotImp: [],
    isUrgIsImp: [],
    unsorted: taskList,
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const handleClick = (event) => {
    if (taskGrid.unsorted.length > 0) {
      alert("Please sort all tasks onto the grid!");
      return;
    }
    // TODO: loop through taskgrid and save info to each tasks and then send to api
    for (const key of Object.keys(taskGrid)) {
      for (const task of taskGrid[key]) {
        if (key === "notUrgNotImp") {
          task.urgent = false;
          task.important = false;
        } else if (key === "notUrgIsImp") {
          task.urgent = false;
          task.important = true;
        } else if (key === "isUrgNotImp") {
          task.urgent = true;
          task.important = false;
        } else if (key === "isUrgIsImp") {
          task.urgent = true;
          task.important = true;
        }
      }
    }
    navigate("/createschedule", {
      state: { taskList: taskList },
    });
  };

  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }

  return (
    <>
      <div className="TaskPage-pageContainer">
        <UrgentImp
          taskList={taskList}
          handleTaskList={(event) => setQuadrants(event)}
          taskGrid={taskGrid}
          setTaskGrid={setTaskGrid}
        />
        <button className="Button" onClick={handleClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default GridPage;
