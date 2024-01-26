import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";

const GridPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state?.taskList) {
    console.log("yes");
    return <div>Please don't call this page directly.</div>;
  }
  const [taskList, setTaskList] = useState(location.state.taskList);
  const [quadrants, setQuadrants] = useState();

  console.log(
    `task list before passing onto create schedule in grid.js ${JSON.stringify(taskList)}`
  );

  const handleClick = (event) => {
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
        <UrgentImp taskList={taskList} handleTaskList={(event) => setQuadrants(event)} />
        <button onClick={handleClick}>Next</button>
      </div>
    </>
  );
};

export default GridPage;
