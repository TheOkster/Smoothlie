import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";

const GridPage = (props) => {
  const location = useLocation();
  if (!location.state?.taskList) {
    console.log("yes");
    return <div>Please don't call this page directly.</div>;
  }
  const [taskList, setTaskList] = useState(location.state.taskList);
  const [quadrants, setQuadrants] = useState();
  // console.log(location.state.taskList);
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  return (
    <div className="TaskPage-pageContainer">
      <UrgentImp taskList={taskList} handleTaskList={(event) => setQuadrants(event)} />
    </div>
  );
};
export default GridPage;
