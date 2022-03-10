import { useState, useContext } from "react";
import { CardsContext } from "../context";

import Modal from "./Modal";
import Button from "./Button";
import labels from "../data/labels";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../data/itemTypes";

function Task({ id, title, label, description }) {
  const { deleteTask } = useContext(CardsContext);
  const [isSelected, setSelected] = useState(false);
  const addedLabel = labels.find((item) => item.id == label);

  const [, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: {
      id: id,
      title: title,
      description: description,
      label: label,
    },
    // collect: (monitor) => ({
    //   isDragging: !!monitor.isDragging(),
    // }),
  }));

  return (
    <>
      <div className="bg-white p-2 rounded drop-shadow mt-2" ref={drag}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row align-center">
            <Button marginRight isGrey onClick={() => deleteTask(id)}>
              x
            </Button>
            <h2 className="mr-2">{title}</h2>
            {addedLabel && (
              <hr
                className="w-[20px] h-[8px] content-none block rounded m-auto bg-[`${addedLabel.color}`]"
                style={{ backgroundColor: addedLabel.color }}
              />
            )}
          </div>
          <Button isGrey onClick={() => setSelected(!isSelected)}>
            Edit
          </Button>
        </div>
      </div>
      {isSelected && (
        <Modal
          id={id}
          title={title}
          description={description}
          label={label}
          setSelected={setSelected}
        ></Modal>
      )}
    </>
  );
}

export default Task;
