import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { title: props.text },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    width: "100px",
    backgroundColor: "pink",
  };

  return (
    <button className="Button" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.text}
      {/* {props.text} */}
    </button>
  );
};

export default Draggable;
