import React from "react";

import { useDroppable } from "@dnd-kit/core";

const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    opactiy: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
