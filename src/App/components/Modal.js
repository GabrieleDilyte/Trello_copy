import { useState, useContext, useCallback } from "react";
import { CardsContext } from "../context";

import Button from "./Button";

import labels from "../data/labels";

function Modal({ id, title, description, setSelected, label }) {
  const { updateDescription, addLabel } = useContext(CardsContext);
  const [isEditing, setEditing] = useState(false);
  const addedLabel = labels.find((item) => item.id == label);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateDescription(id, event.target[0].value);
      setEditing(false);
    },
    [updateDescription]
  );

  const submitLabel = useCallback(
    (event) => {
      event.preventDefault();
      addLabel(id, event.target[0].value);
    },
    [addLabel]
  );

  return (
    <div className="absolute top-[20%] bg-zinc-200 p-2 rounded drop-shadow mt-2 z-10 shadow w-[500px] pt-2 pr-4 pl-4">
      <div className="flex flex-row justify-between align-center">
        <h2 className="text-left font-extrabold text-lg">{title}</h2>
        <Button onClick={() => setSelected(false)}>x</Button>
      </div>
      <div>
        <div className="text-left mt-2  p-2 rounded bg-white">
          <h3 className="mb-2 font-medium">Description</h3>
          {!isEditing && (
            <p className="border min-h-[80px] mb-2 rounded">{description}</p>
          )}
          {isEditing && (
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                type="text"
                placeholder={description}
                className="border w-full mb-2 rounded"
              ></input>
              <Button isBlue>Save</Button>
            </form>
          )}
          {!isEditing && (
            <Button isBlue onClick={() => setEditing(!isEditing)}>
              Edit
            </Button>
          )}
        </div>
        <div className="text-left mt-4 p-2 rounded bg-white">
          <h3 className="mb-2 font-medium ">Label</h3>
          {addedLabel && (
            <div
              className="rounded inline-block p-1 text-sm"
              style={{ backgroundColor: addedLabel.color }}
            >
              {addedLabel.title}
            </div>
          )}
          <form onSubmit={(event) => submitLabel(event)}>
            <select name="labels" id="label" className="border rounded p-1 ">
              {labels.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
            <Button margin isBlue>
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
