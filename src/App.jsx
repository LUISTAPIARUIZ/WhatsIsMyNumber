import { useState } from 'react';
import 'animate.css'; // Importa animate.css para las animaciones

function App() {
  const [digitCount, setDigitCount] = useState(4);
  const [player1Number, setPlayer1Number] = useState("");
  const [player2Number, setPlayer2Number] = useState("");
  const [player1Guess, setPlayer1Guess] = useState("");
  const [player2Guess, setPlayer2Guess] = useState("");
  const [turn, setTurn] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Attempts, setPlayer1Attempts] = useState([]); // Intentos de jugador 1
  const [player2Attempts, setPlayer2Attempts] = useState([]); // Intentos de jugador 2
  const [winner, setWinner] = useState(null); // Control de ganador

  const countMatches = (guess, actual) => {
    let count = 0;
    for (let i = 0; i < actual.length; i++) {
      if (guess[i] === actual[i]) {
        count++;
      }
    }
    return count;
  };

  const handleGuess = () => {
    if (turn === 1) {
      const matches = countMatches(player1Guess, player2Number);
      setPlayer1Attempts([...player1Attempts, { guess: player1Guess, matches }]);
      setFeedback(`Jugador 1 tiene ${matches} coincidencias.`);
      if (matches === digitCount) {
        setWinner(1);
      }
    } else {
      const matches = countMatches(player2Guess, player1Number);
      setPlayer2Attempts([...player2Attempts, { guess: player2Guess, matches }]);
      setFeedback(`Jugador 2 tiene ${matches} coincidencias.`);
      if (matches === digitCount) {
        setWinner(2);
      }
    }
    setTurn(turn === 1 ? 2 : 1);
  };

  const startGame = () => {
    if (player1Number.length === digitCount && player2Number.length === digitCount) {
      setGameStarted(true);
      setFeedback("Juego iniciado! Turno del Jugador 1.");
    } else {
      setFeedback("Ambos jugadores deben ingresar números válidos.");
    }
  };

  const renderAttempts = (attempts) => {
    return attempts.map((attempt, index) => (
      <li key={index}>Intento {index + 1}: {attempt.guess} - {attempt.matches} coincidencias</li>
    ));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4 animate__animated animate__fadeIn">Adivina mi número</h1>
        {!gameStarted ? (
          <div className="space-y-4">
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
              <label className="block text-lg font-medium text-gray-700">Jugador 1 ingresa su número:</label>
              <input
                type="password"
                value={player1Number}
                onChange={(e) => setPlayer1Number(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                maxLength={digitCount}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Jugador 2 ingresa su número:</label>
              <input
                type="password"
                value={player2Number}
                onChange={(e) => setPlayer2Number(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                maxLength={digitCount}
              />
            </div>
            <div>
              <button 
                onClick={startGame} 
                className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Comenzar juego
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-6">
            <div className="w-2/3">
              <h2 className="text-xl font-semibold text-center">Turno del Jugador {turn}</h2>
              <div>
                {turn === 1 ? (
                  <input
                    type="text"
                    value={player1Guess}
                    onChange={(e) => setPlayer1Guess(e.target.value)}
                    placeholder="Jugador 1, ingresa tu suposición"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    maxLength={digitCount}
                  />
                ) : (
                  <input
                    type="text"
                    value={player2Guess}
                    onChange={(e) => setPlayer2Guess(e.target.value)}
                    placeholder="Jugador 2, ingresa tu suposición"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    maxLength={digitCount}
                  />
                )}
              </div>
              <div>
                <button 
                  onClick={handleGuess} 
                  className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                  Adivinar
                </button>
              </div>
              <p className="text-center text-lg font-semibold">{feedback}</p>
            </div>

            {/* Lado derecho: lista de intentos con scroll */}
            <div className="w-1/3 overflow-y-auto max-h-80 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold">Intentos Jugador 1</h3>
              <ul>{renderAttempts(player1Attempts)}</ul>
              <h3 className="text-lg font-semibold mt-4">Intentos Jugador 2</h3>
              <ul>{renderAttempts(player2Attempts)}</ul>
            </div>
          </div>
        )}

        {/* Animación de ganador */}
        {winner && (
          <div className="absolute inset-0 flex justify-center items-center animate__animated animate__zoomIn animate__delay-1s">
            <div className="bg-green-500 text-white p-6 rounded-full animate__animated animate__heartBeat">
              <h2 className="text-4xl font-bold">¡Jugador {winner} gana!</h2>
              <div className="fireworks-animation">
                {/* Aquí puedes agregar un componente para fuegos artificiales */}
              </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Fuegos artificiales o animación */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

