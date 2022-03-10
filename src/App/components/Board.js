import { useContext, useCallback } from "react";

import { CardsContext } from "../context";

import Card from "./Card";
import Button from "./Button";

function Board() {
  const { cards, toggleCards } = useContext(CardsContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const card = { id: Date.now(), title: event.target[0].value, tasks: [] };
      toggleCards([...cards, card]);
      event.target[0].value = null;
    },
    [toggleCards, cards]
  );

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        title={card.title}
        tasks={card.tasks}
      />
    );
  }, []);

  return (
    <div className="relative h-[94vh] overflow-x-scroll">
      <div className="absolute inset-0 mt-2">
        <div className="flex flex-row">
          {cards.map((card, i) => renderCard(card, i))}
          <form
            className="add_card_form flex flex-col m-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              className="rounded p-1 mb-2"
              required
              placeholder="Enter card title..."
            ></input>
            <Button isBlue>Add card</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Board;
