import React from "react"; /* wait what does this actually mean */
import "./TaskPage.css";
import "./TaskPage.jpg";

import * as TaskPageImage from "./TaskPage.jpg";
import trash from "./icons/trash.svg";

const TaskPage = () => {
    return (
        <>
        <div className="Background">
            <img src={require("./TaskPage.jpg").default} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}} />
        </div>
        <div className="TaskPage-pageContainer" style={{zIndex:"1"}}>
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
        </div>
        </>
    );
};

export default TaskPage;
