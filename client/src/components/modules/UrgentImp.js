import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {Array} taskList
 * @param onChange
 */

const UrgentImp = (props) => {
  // console.log(props.taskList.map((task) => task.name));
  const [taskList, setTaskList] = useState({
    quad1: [],
    quad2: [],
    quad3: [],
    quad4: [],
    unsorted: props.taskList.map((task) => task.name) ?? [
      "hello",
      "hellooooooo",
      "be gayer and do more crime",
    ],
  });
  // const containers = ["green", "blue"];
  // const [green, setGreen] = useState([]);
  // const [blue, setBlue] = useState([]);
  // const [draggables, setDraggables] = useState([
  //   { id: "draggable1", text: "be gay and do crime" },
  //   { id: "draggable2", text: "heyyyy" },
  //   { id: "draggable3", text: "another day, another slay" },
  // ]);
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

  const colorMapping = {
    quad1: "red",
    quad2: "blue",
    quad3: "pink",
    quad4: "purple",
  };

  const containerMarkup = (key) => {
    if (key !== "unsorted") {
      return <Droppable key={key} id={key} color={colorMapping[key]} tasks={taskList[key]} />;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* render all tasks not in a container */}
      {taskList["unsorted"].map(taskMarkup)}
      {Object.keys(taskList).map(containerMarkup)}
    </DndContext>
  );
};
//   function handleDragEnd(event) {
//     // get draggable item data
//     const { active } = event;
//     const item = active;
//     const newItem = { id: item.id, key: item.id, text: item.data.current?.title };

//     // get droppable item data
//     const { over } = event;

//     // add draggable to whatever droppable item it ended up in, if any
//     if (over.id === "green") {
//       setGreen(green.concat([newItem]));
//     } else if (over.id === "blue") {
//       setBlue(blue.concat([newItem]));
//     }

//     // remove droppable from list of droppables
//     setDraggables(draggables.filter((drag) => drag.id != newItem.id));
//   }
// };

export default UrgentImp;
