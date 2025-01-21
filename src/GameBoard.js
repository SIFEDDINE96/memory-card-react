import React, { useState } from "react";

function GameBoard({ numSubCards, setHistory }) {
  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [flipped, setFlipped] = useState(Array(numSubCards).fill(false));
  const [endTime, setEndTime] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const resetGame = () => {
    setClicks(0);
    setFlipped(Array(numSubCards).fill(false));
    setCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setMessageVisible(false);
    setTimerStarted(false);
  };

  const handleStartClick = () => {
    setTimerStarted(true);
    setStartTime(Date.now());
  };

  const handleClick = (index) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (flipped[index]) return;

    setClicks((prev) => prev + 1);
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (clicks + 1 === numSubCards) {
      setCompleted(true);
      setEndTime(Date.now());

      const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
      setHistory((prev) => [
        ...prev,
        { time: timeElapsed, clicks: clicks + 1 },
      ]);

      setTimeout(() => {
        setMessageVisible(true);
      }, 500);
    }
  };

  const gridSize = Math.sqrt(numSubCards);

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  const timeElapsed = endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        {!timerStarted && (
          <button
            onClick={handleStartClick}
            className="px-10 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start
          </button>
        )}

        {timerStarted && (
          <button
            disabled
            className="px-6 py-3 bg-gray-400 text-gray-500 rounded-lg cursor-not-allowed"
          >
            Timer Started
          </button>
        )}
      </div>

      <div
        className="grid gap-4 bg-white p-6 rounded shadow-lg"
        style={gridStyle}
      >
        {Array.from({ length: numSubCards }, (_, index) => (
          <div
            key={index}
            onClick={() => !completed && timerStarted && handleClick(index)}
            className={`w-32 h-32 flex items-center justify-center bg-gray-300 rounded cursor-pointer relative
              ${flipped[index] ? "bg-green-500" : "bg-gray-300"}
              ${completed ? "bg-green-500" : ""}
              ${!timerStarted ? "cursor-not-allowed opacity-50" : ""}
              transform ${flipped[index] ? "rotateY(180deg)" : ""} 
              transition-transform duration-700 ease-in-out`}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                flipped[index] ? "hidden" : ""
              }`}
            >
              <span className="text-2xl font-bold">🔒</span>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transform rotateY(180deg) ${
                !flipped[index] ? "hidden" : ""
              }`}
            >
              <span className="text-2xl font-bold">✔️</span>{" "}
            </div>
          </div>
        ))}
      </div>

      {messageVisible && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <div className="bg-white p-8 rounded-lg text-center shadow-lg">
            <h1 className="text-4xl font-bold">You Won!</h1>
            <p className="text-xl mt-4">Moves: {clicks}</p>
            <p className="text-xl">Time: {timeElapsed} seconds</p>
            <button
              onClick={() => {
                setMessageVisible(false); 
                resetGame(); 
              }}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
