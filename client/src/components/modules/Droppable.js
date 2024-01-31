import React from "react";

import { useDroppable } from "@dnd-kit/core";
import Draggable from "./Draggable";

const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
    backgroundColor: props.color,
    padding: "20px",
    width: "150px",
    height: "150px",
  };

  const taskMarkup = (tasks) => {
    // note --- will have to come up with better system for id in case user has two tasks with same name
    const markup = [];
    for (const task of Array.from(tasks)) {
      markup.push(<Draggable id={task._id} key={task._id} text={task.name} />);
    }
    return markup;
  };

  return (
    <div ref={setNodeRef} style={style}>
      {taskMarkup(props.tasks)}
    </div>
  );
};

export default Droppable;
