import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      className="rounded-lg border-2 border-gray-200"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="m-3">{props.id}</div>
    </div>
  );
};

export default SortableItem;
