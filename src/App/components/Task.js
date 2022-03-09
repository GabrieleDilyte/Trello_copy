import { useState, useCallback, useContext } from "react";
import { CardsContext } from "../context";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../itemTypes";

function Task({ id, title }) {
  const { deleteTask } = useContext(CardsContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: id, title: title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="task bg-white p-2 rounded drop-shadow mt-2" ref={drag}>
      <div className="flex flex-row justify-between items-center">
        <div className="task__content--title">{title}</div>
        <button className="text-slate-300" onClick={() => deleteTask(id)}>
          x
        </button>
      </div>
    </div>
  );
}

export default Task;
