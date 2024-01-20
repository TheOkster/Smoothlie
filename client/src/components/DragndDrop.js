import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

const DragndDrop = () => {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me</Draggable>;

  const handleDragEnd = (over) => {
    setParent(over ? over.id : null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">{parent === "droppable" ? draggable : "Drop here"}</Droppable>
    </DndContext>
  );
};

export default DragndDrop;
