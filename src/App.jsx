import { useState } from 'react';
import 'animate.css'; // Importa animate.css para las animaciones
import InitialForm from './components/InitialForm';
import Fireworks from './components/Fireworks';

function App() {
  const [gameState, setGameState] = useState({
    player1Name: "",
    player2Name: "",
    player1Number: "",
    player2Number: "",
    digitCount: 4
  });
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
    const currentGuess = turn === 1 ? player1Guess : player2Guess;
    const targetNumber = turn === 1 ? gameState.player2Number : gameState.player1Number;
    const currentPlayerName = turn === 1 ? gameState.player1Name : gameState.player2Name;

    const matches = countMatches(currentGuess, targetNumber);
    
    if (turn === 1) {
      setPlayer1Attempts([...player1Attempts, { guess: currentGuess, matches }]);
      setFeedback(`${currentPlayerName} tiene ${matches} coincidencias.`);
    } else {
      setPlayer2Attempts([...player2Attempts, { guess: currentGuess, matches }]);
      setFeedback(`${currentPlayerName} tiene ${matches} coincidencias.`);
    }

    if (matches === gameState.digitCount) {
      setWinner(turn);
    } else {
      setTurn(turn === 1 ? 2 : 1);
    }
    
    if (turn === 1) {
      setPlayer1Guess("");
    } else {
      setPlayer2Guess("");
    }
  };

  const handleStartGame = (gameData) => {
    setGameState(gameData);
    setGameStarted(true);
    setFeedback(`¡Juego iniciado! Turno de ${gameData.player1Name}`);
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
          <InitialForm onStartGame={handleStartGame} />
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
                    maxLength={gameState.digitCount}
                  />
                ) : (
                  <input
                    type="text"
                    value={player2Guess}
                    onChange={(e) => setPlayer2Guess(e.target.value)}
                    placeholder="Jugador 2, ingresa tu suposición"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    maxLength={gameState.digitCount}
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

        {winner && (
          <div className="fixed inset-0 flex justify-center items-center animate__animated animate__zoomIn">
            <div className="bg-green-500 text-white p-6 rounded-xl z-50 text-center">
              <h2 className="text-4xl font-bold mb-4">
                ¡{winner === 1 ? gameState.player1Name : gameState.player2Name} gana!
              </h2>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-green-500 px-4 py-2 rounded-md mt-4"
              >
                Jugar de nuevo
              </button>
            </div>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <Fireworks />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

