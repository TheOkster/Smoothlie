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
    unsorted: props.taskList,
  });
  if ("handleTaskList" in props) {
    props.handleTaskList(taskList);
  }

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
    const temp = { ...taskList };
    const task = temp[initialContainer].find((task) => task._id === item_id);
    console.log(task);
    temp[initialContainer] = temp[initialContainer].filter((task) => task._id !== item_id);
    temp[finalContainer] = temp[finalContainer].concat([task]);

    setTaskList(temp);
  };

  const findTaskContainer = (taskId) => {
    for (const key of Object.keys(taskList)) {
      for (const task of taskList[key]) {
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
