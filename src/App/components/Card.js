import { useState, useCallback, useContext } from "react";
import { CardsContext } from "../context";

import { useDrop } from "react-dnd";

import { ItemTypes } from "../itemTypes";
import Task from "./Task";

function Card({ id, title, tasks }) {
  const { deleteCard, addTask, deleteTask } = useContext(CardsContext);
  const [inputOpen, setInputOpen] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => {
      addTask(id, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const task = { id: Date.now(), title: event.target[0].value };
      addTask(id, task);
      setInputOpen(!inputOpen);
    },
    [addTask, inputOpen]
  );

  return (
    <div className="min-w-[272px] bg-zinc-200 m-2 rounded pt-2 pb-2 pl-3 pr-3">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-left font-medium">{title} </h2>
        <button className="font-medium text-lg" onClick={() => deleteCard(id)}>
          x
        </button>
      </div>
      <div className="mt-2" ref={drop}>
        {tasks.map(({ id, title }) => (
          <Task key={id} id={id} title={title} />
        ))}
      </div>
      <div className=" mt-2">
        {!inputOpen && (
          <button
            className="text-slate-400 "
            onClick={() => setInputOpen(!inputOpen)}
          >
            + Add a task
          </button>
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
              <button className="m-1 bg-sky-500 p-2 rounded text-white">
                Add card
              </button>
              <button
                className="m-1 bg-sky-500 rounded p-2 text-white"
                onClick={() => setInputOpen(!inputOpen)}
              >
                X
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Card;
