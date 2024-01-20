import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

const UrgentImp = () => {
  const containers = ["green", "blue"];
  const [green, setGreen] = useState([]);
  const [blue, setBlue] = useState([]);
  const [draggables, setDraggables] = useState([
    { id: "draggable1", text: "be gay and do crime" },
    { id: "draggable2", text: "heyyyy" },
    { id: "draggable3", text: "another day, another slay" },
  ]);

  const markupMap = (draggable) => {
    return <Draggable id={draggable.id} key={draggable.id} children={draggable.text} />;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* <Draggable id="task-1">Be gay and do crime</Draggable> */}
      {/* <Draggable id="task-2">Be gayer and do more crime</Draggable> */}
      {draggables.map(markupMap)}
      <Droppable key="green" id="green" color="green">
        {green.map(markupMap)}
      </Droppable>
      <Droppable key="blue" id="blue" color="blue">
        {blue.map(markupMap)}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd(event) {
    // get draggable item data
    const { active } = event;
    const item = active;
    const newItem = { id: item.id, key: item.id, text: item.data.current?.title };

    // get droppable item data
    const { over } = event;

    // add draggable to whatever droppable item it ended up in, if any
    if (over.id === "green") {
      setGreen(green.concat([newItem]));
    } else if (over.id === "blue") {
      setBlue(blue.concat([newItem]));
    }

    // remove droppable from list of droppables
    setDraggables(draggables.filter((drag) => drag.id != newItem.id));
  }
};

export default UrgentImp;
