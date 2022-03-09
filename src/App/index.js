import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CardsProvider } from "./context";

import "./App.css";

import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  return (
    <div className="App bg-gradient-to-r from-purple to-pink">
      <DndProvider backend={HTML5Backend}>
        <CardsProvider>
          <Header />
          <Board />
        </CardsProvider>
      </DndProvider>
    </div>
  );
}

export default App;
