import React from "react"; /* wait what does this actually mean */
import "./TaskPage.css";
import * as TaskPageImage from "./TaskPage.jpg";
import trash from "./icons/trash.svg";

const TaskPage = () => {
  return (
    <div className="TaskPage-bg">
      {/* Don't import as __ normally and don't use .default. Only used in this case since the .jpg and .s
      have the same name */}
      <img src={TaskPageImage.default} />
      <div className="TaskPage-pageContainer">
        <div className="TaskPage-taskContainer">
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Task Name: </div>
            <div className="TaskPage-textBox"></div>
          </div>
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Time Estimate: </div>
            <div className="TaskPage-textBox"></div>
            <div className="TaskPage-smallButton">+15m</div>
            <div className="TaskPage-smallButton">-15m</div>
          </div>
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Fruit Type: </div>
            <div className="TaskPage-textBox"></div>
            {/* <div className="TaskPage-textBox"></div> */}
          </div>
        </div>

        <div className="TaskPage-taskContainer">
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Task Name: </div>
          </div>
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Time Estimate: </div>
          </div>
          <div className="TaskPage-line">
            <div className="TaskPage-taskHeading"> Fruit Type: </div>
          </div>
        </div>
      </div>
      <div className="TaskPage-bottomLine">
        <div className="TaskPage-smallButton">--</div>
        <div className="TaskPage-smallButton">++</div>
        <div className="TaskPage-smallButton">New Task</div>
        <div className="TaskPage-smallButton">I'm Done!</div>
      </div>
    </div>
  );
};

export default TaskPage;
