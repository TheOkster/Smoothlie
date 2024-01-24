import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";

const GridPage = () => {
  const location = useLocation();
  const [taskList, setTaskList] = useState(location.state.taskList);
  // console.log(location.state.taskList);
  return (
    <>
      <UrgentImp taskList={taskList} />
    </>
  );
};
export default GridPage;