import { useContext, useCallback } from "react";

import { CardsContext } from "../context";

import Card from "./Card";

function Board() {
  const { cards, toggleCards } = useContext(CardsContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const card = { id: Date.now(), title: event.target[0].value, tasks: [] };
      toggleCards([...cards, card]);
    },
    [toggleCards, cards]
  );

  return (
    <div className="relative h-full overflow-x-scroll">
      <div className="absolute inset-0">
        <div className="flex flex-row">
          {cards.map(({ id, title, tasks }) => (
            <Card key={id} id={id} title={title} tasks={tasks} />
          ))}
          <form
            className="add_card_form flex flex-col m-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              className="rounded p-1"
              required
              placeholder="Enter card title..."
            ></input>
            <button className="m-1 bg-sky-500 p-2 rounded text-white">
              Add card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Board;
