import { createContext, useState, useEffect } from "react";

const CardsContext = createContext();
const CARDS_KEY = "cards";

function CardsProvider({ children }) {
  const [cards, toggleCards] = useState(
    JSON.parse(localStorage.getItem(CARDS_KEY)) || [
      {
        id: Date.now(),
        title: "To Do",
        tasks: [{ id: 1, title: "do something" }],
      },
    ]
  );

  const deleteCard = (id) => {
    const filteredCards = cards.filter((card) => id !== card.id);
    toggleCards(filteredCards);
  };

  const addTask = (id, task) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, tasks: [...card.tasks, task] };
      } else return card;
    });
    toggleCards(newCards);
  };

  const deleteTask = (id) => {
    toggleCards(
      cards.map((card) => {
        if (card.tasks.some((task) => task.id === id)) {
          console.log(card.tasks);
          const taskList = card.tasks.filter((task) => id !== task.id);
          return { ...card, tasks: taskList };
        } else return card;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  }, [cards]);

  return (
    <CardsContext.Provider
      value={{ cards, toggleCards, deleteCard, addTask, deleteTask }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export default CardsContext;
export { CardsProvider };
