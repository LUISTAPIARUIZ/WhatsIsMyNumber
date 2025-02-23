import { useState } from 'react';

function InitialForm({ onStartGame }) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [digitCount, setDigitCount] = useState(4);
  const [player1Number, setPlayer1Number] = useState("");
  const [player2Number, setPlayer2Number] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!player1Name || !player2Name) {
      setFeedback("Por favor, ingresa los nombres de ambos jugadores.");
      return;
    }
    if (player1Number.length !== digitCount || player2Number.length !== digitCount) {
      setFeedback("Ambos jugadores deben ingresar números válidos.");
      return;
    }
    onStartGame({
      player1Name,
      player2Name,
      player1Number,
      player2Number,
      digitCount
    });
  };

  return (
    <div className="space-y-4 animate__animated animate__fadeIn">
      <div>
        <label className="block text-lg font-medium text-gray-700">Elige la cantidad de dígitos:</label>
        <input
          type="number"
          value={digitCount}
          onChange={(e) => setDigitCount(Number(e.target.value))}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">Nombre del Jugador 1:</label>
        <input
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">Número del Jugador 1:</label>
        <input
          type="password"
          value={player1Number}
          onChange={(e) => setPlayer1Number(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          maxLength={digitCount}
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">Nombre del Jugador 2:</label>
        <input
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">Número del Jugador 2:</label>
        <input
          type="password"
          value={player2Number}
          onChange={(e) => setPlayer2Number(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          maxLength={digitCount}
        />
      </div>
      {feedback && <p className="text-red-500">{feedback}</p>}
      <button 
        onClick={handleSubmit} 
        className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        Comenzar juego
      </button>
    </div>
  );
}

export default InitialForm; 