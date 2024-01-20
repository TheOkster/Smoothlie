import React from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

const UrgentImp = () => {
  return (
    <>
      <div>Urgent important is working</div>
      <DndContext>
        <Draggable />
        <Droppable />
      </DndContext>
    </>
  );
};

export default UrgentImp;
