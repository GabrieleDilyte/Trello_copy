import { useState, useCallback, useContext, useRef } from "react";
import { CardsContext } from "../context";

import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../data/itemTypes";

import Button from "./Button";
import Task from "./Task";

function Card({ id, title, tasks, index }) {
  const { deleteCard, addTask, moveTask, moveCard } = useContext(CardsContext);
  const [inputOpen, setInputOpen] = useState(false);

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item) => {
        moveTask(id, item);
      },
      //   collect: (monitor) => ({
      //     isOver: !!monitor.isOver(),
      //   }),
    }),
    [moveTask]
  );

  const ref = useRef(null);
  const [{ handlerId }, sort] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(sort(ref));

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const task = {
        id: Date.now(),
        title: event.target[0].value,
        descriprion: "",
        label: "",
      };
      addTask(id, task);
      setInputOpen(!inputOpen);
    },
    [addTask, inputOpen]
  );

  return (
    <div
      className="min-w-[272px] bg-zinc-200 m-2 rounded pt-2 pb-2 pl-3 pr-3 shadow"
      ref={ref}
      style={{ opacity: opacity }}
      data-handler-id={handlerId}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-left font-medium">{title} </h2>
        <Button isGrey onClick={() => deleteCard(id)}>
          x
        </Button>
      </div>
      <div ref={drop}>
        <div className="mt-2">
          {tasks.map(({ id, title, description, label }) => (
            <Task
              key={id}
              id={id}
              title={title}
              description={description}
              label={label}
            />
          ))}
        </div>
        <div className=" mt-2">
          {!inputOpen && (
            <Button isGrey onClick={() => setInputOpen(!inputOpen)}>
              + Add a task
            </Button>
          )}
          {inputOpen && (
            <form
              className="flex flex-col"
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                className="text-slate-400 rounded p-2"
                required
                placeholder="Enter a title for this card..."
              ></input>
              <div>
                <Button isBlue margin>
                  Add task
                </Button>
                <Button isBlue onClick={() => setInputOpen(!inputOpen)}>
                  X
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
