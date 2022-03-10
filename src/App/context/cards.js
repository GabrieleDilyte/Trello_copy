import { createContext, useState, useEffect, useCallback } from "react";
import update from "immutability-helper";

const CardsContext = createContext();
const CARDS_KEY = "cards";

function CardsProvider({ children }) {
  const [cards, toggleCards] = useState(
    JSON.parse(localStorage.getItem(CARDS_KEY)) || [
      {
        id: Date.now(),
        title: "To Do",
        tasks: [
          {
            id: 1,
            title: "Task example",
            description: "Your description",
            label: "1",
          },
        ],
      },
    ]
  );

  const deleteCard = (id) => {
    const filteredCards = cards.filter((card) => id !== card.id);
    toggleCards(filteredCards);
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      toggleCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [cards]
  );

  const addTask = useCallback(
    async (id, task) => {
      const newCards = cards.map((card) => {
        if (card.id === id) {
          return { ...card, tasks: [...card.tasks, task] };
        } else return card;
      });
      toggleCards(newCards);
    },
    [cards, toggleCards]
  );

  const deleteTask = (id) => {
    const newCards = cards.map((card) => {
      if (card.tasks.some((task) => task.id === id)) {
        const taskList = card.tasks.filter((task) => id !== task.id);
        return { ...card, tasks: taskList };
      } else return card;
    });
    toggleCards(newCards);
  };

  const moveTask = useCallback(
    (id, task) => {
      const newCards = cards.map((card) => {
        if (card.tasks.some((tasks) => tasks.id === task.id)) {
          const taskList = card.tasks.filter((tasks) => task.id !== tasks.id);
          return { ...card, tasks: taskList };
        } else return card;
      });

      const newAddedCards = newCards.map((card) => {
        if (card.id === id) {
          return { ...card, tasks: [...card.tasks, task] };
        } else return card;
      });
      toggleCards(newAddedCards);
    },
    [cards, toggleCards]
  );

  const updateDescription = (id, description) => {
    const newCards = cards.map((card) => {
      if (card.tasks.some((task) => task.id === id)) {
        const index = card.tasks.findIndex((obj) => obj.id == id);
        card.tasks[index].description = description;
        return card;
      } else return card;
    });
    toggleCards(newCards);
  };

  const addLabel = (id, label) => {
    const newCards = cards.map((card) => {
      if (card.tasks.some((task) => task.id === id)) {
        const index = card.tasks.findIndex((obj) => obj.id == id);
        card.tasks[index].label = label;
        return card;
      } else return card;
    });
    toggleCards(newCards);
  };

  useEffect(() => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  }, [cards]);

  return (
    <CardsContext.Provider
      value={{
        cards,
        toggleCards,
        deleteCard,
        addTask,
        deleteTask,
        moveTask,
        moveCard,
        updateDescription,
        addLabel,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export default CardsContext;
export { CardsProvider };
