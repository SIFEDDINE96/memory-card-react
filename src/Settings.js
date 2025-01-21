import React from "react";

function Settings({ background, setBackground, numSubCards, setNumSubCards }) {
  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-4">Settings</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Change Background Color</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setBackground("bg-blue-200")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Blue
          </button>
          <button
            onClick={() => setBackground("bg-green-200")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Green
          </button>
          <button
            onClick={() => setBackground("bg-red-200")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Red
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Set Number of Sub-Cards</h3>
        <select
          value={numSubCards}
          onChange={(e) => setNumSubCards(Number(e.target.value))}
          className="p-2 border rounded"
        >
          <option value={4}>4</option>
          <option value={9}>9</option>
          <option value={16}>16</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
