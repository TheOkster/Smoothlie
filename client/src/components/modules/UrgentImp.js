import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {Array} taskList
 * @param handleTaskList
 */

const UrgentImp = (props) => {
  // console.log(props.taskList.map((task) => task.name));
  const [taskList, setTaskList] = useState({
    notUrgNotImp: [],
    notUrgIsImp: [],
    isUrgNotImp: [],
    isUrgIsImp: [],
    unsorted: props.taskList.map((task) => task.name) ?? [
      "hello",
      "hellooooooo",
      "be gayer and do more crime",
    ],
  });
  if ("handleTaskList" in props) {
    props.handleTaskList(taskList);
  }

  const handleDragEnd = (e) => {
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
    const temp = { ...taskList };

    temp[initialContainer] = temp[initialContainer].filter((task) => task !== item_id);
    temp[finalContainer] = temp[finalContainer].concat([item_id]);

    setTaskList(temp);
  };

  const findTaskContainer = (taskName) => {
    for (const key of Object.keys(taskList)) {
      for (const task of taskList[key]) {
        if (task == taskName) {
          return key;
        }
      }
    }
  };

  const taskMarkup = (task) => {
    // note --- will have to come up with better system for id in case user has two tasks with same name
    return <Draggable id={task} key={task} text={task} />;
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
      return <Droppable key={key} id={key} color={colorMapping[key]} tasks={taskList[key]} />;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="UrgentImp-Box">
        <div className="taskColumn">
          {/* Render all tasks not in a container */}
          {taskList["unsorted"].map(taskMarkup)}
        </div>
        {/* Render 2x2 grid */}
        <div className="gridContainer">
          <div style={{ display: "flex" }}>
            {["isUrgIsImp", "isUrgNotImp"].map(containerMarkup)}
          </div>
          <div style={{ display: "flex" }}>
            {["notUrgIsImp", "notUrgNotImp"].map(containerMarkup)}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default UrgentImp;
