import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameBoard from "./GameBoard";
import Settings from "./Settings";

function App() {
  const [background, setBackground] = useState("bg-blue-200");
  const [numSubCards, setNumSubCards] = useState(4);
  const [history, setHistory] = useState([]);

  return (
    <Router>
      <div
        className={`min-h-screen ${background} flex flex-col items-center p-4`}
      >
        <nav className="mb-6 flex justify-center space-x-8">
          <Link
            to="/"
            className="text-blue-600 font-semibold text-lg hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600 transition duration-300"
          >
            Game
          </Link>
          <Link
            to="/settings"
            className="text-blue-600 font-semibold text-lg hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600 transition duration-300"
          >
            Settings
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <GameBoard numSubCards={numSubCards} setHistory={setHistory} />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                background={background}
                setBackground={setBackground}
                numSubCards={numSubCards}
                setNumSubCards={setNumSubCards}
              />
            }
          />
        </Routes>

        <div className="mt-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Game History:</h2>
          <ul className="list-disc list-inside bg-white p-4 rounded shadow">
            {history.map((entry, index) => (
              <li key={index}>
                Game {index + 1}: {entry.time}s, {entry.clicks} clicks
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Router>
  );
}

export default App;
