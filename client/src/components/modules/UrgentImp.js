import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

const UrgentImp = () => {
  const containers = ["green", "blue", "red", "purple"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Be gay and do crime</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <Draggable id="task-1">Be gay and do crime</Draggable>
        <Draggable id="task-2">Be gayer and do more crime</Draggable>
      </div>

      {/* {parent === null ? draggableMarkup : null} */}
      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id} color={id}>
          {parent === id ? draggableMarkup : id}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};

export default UrgentImp;
