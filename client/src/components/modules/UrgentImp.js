import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { useMediaQuery } from "react-responsive";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import "../pages/General.css";
import "../../utilities.css";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {Array} taskList
 * @param handleTaskList
 */

// sources used for drag and drop: https://dndkit.com/,
// https://medium.com/@kurniawanc/implement-drag-and-drop-feature-in-react-js-using-dnd-kit-library-4cbd7e4b8135, https://medium.com/@kurniawanc/create-multiple-drag-and-drop-list-like-trello-in-react-js-using-dnd-kit-library-b2acd9a65fab

const UrgentImp = (props) => {
  if ("handleTaskList" in props) {
    props.handleTaskList(props.taskGrid);
  }
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const handleDragEnd = (e) => {
    console.log(`e.active ${JSON.stringify(e.active)}`);
    const item_id = e.active.id;

    let finalContainer;

    if (e.over === null) {
      finalContainer = "unsorted";
    } else {
      finalContainer = e.over.id;
    }

    const initialContainer = findTaskContainer(item_id); // this is the item id

    // if (initialContainer === null) {
    //   initialContainer = "unsorted";
    // } else if (finalContainer === null) {
    //   finalContainer = "unsorted";
    // }

    console.log(finalContainer);
    const temp = { ...props.taskGrid };
    const task = temp[initialContainer].find((task) => task._id === item_id);
    console.log(task);
    temp[initialContainer] = temp[initialContainer].filter((task) => task._id !== item_id);
    temp[finalContainer] = temp[finalContainer].concat([task]);

    props.setTaskGrid(temp);
  };

  const findTaskContainer = (taskId) => {
    for (const key of Object.keys(props.taskGrid)) {
      for (const task of props.taskGrid[key]) {
        if (task._id == taskId) {
          return key;
        }
      }
    }
  };

  const taskMarkup = (task) => {
    // note --- will have to come up with better system for id in case user has two tasks with same name
    return <Draggable id={task._id} key={task._id} text={task.name} />;
  };

  //change these colours to be prettier later
  const colorMapping = {
    notUrgNotImp: "red",
    notUrgIsImp: "blue",
    isUrgNotImp: "pink",
    isUrgIsImp: "purple",
  };

  const containerMarkup = (key) => {
    if (key !== "unsorted") {
      return <Droppable key={key} id={key} color={colorMapping[key]} tasks={props.taskGrid[key]} />;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="toplineContainer">
        <h1>Prioritise your tasks!</h1>
      </div>
      <div className="topContainer">
        <h5>Important</h5>
        <h5>Not Important</h5>
      </div>
      <div className="smallContainer">
        <div className={isTabletOrMobile ? "taskgridMobile" : "taskgridContainer"}>
          <div className="taskColumn">
            {/* below line of code was referenced from chatgpt */}
            {props.taskGrid.unsorted.map(taskMarkup)}
          </div>

          <div className="wholeContainer">
            <div className="sideContainer">
              <div className="u-sideways-text">
                <h5>Urgent</h5>
              </div>
              <div className="u-sideways-text">
                <h5>Not Urgent</h5>
              </div>
            </div>
            <div className="gridContainer">
              <div className="u-flex">

                {["isUrgIsImp", "isUrgNotImp"].map(containerMarkup)}
              </div>
              <div className="u-flex">
                {["notUrgIsImp"].map(containerMarkup)}
                {["notUrgNotImp"].map(containerMarkup)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default UrgentImp;
