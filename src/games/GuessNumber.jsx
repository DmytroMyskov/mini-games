import React, { useState } from "react";

function GuessNumber() {
  const [target, setTarget] = useState(generateNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Спробуй вгадати число від 1 до 50");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  function generateNumber() {
    return Math.floor(Math.random() * 50) + 1;
  }

  const handleGuess = () => {
    const num = parseInt(guess);
    if (!num || num < 1 || num > 50) {
      setMessage("Введіть число від 1 до 50");
      return;
    }

    if (history.includes(num)) {
      setMessage(`Ви вже спробували ${num}`);
      return;
    }

    setAttempts(attempts + 1);
    setHistory([...history, num]);

    if (num === target) {
      setMessage(`🎉 Вітаю! Ви вгадали число ${target} за ${attempts + 1} спроб.`);
      setIsGameOver(true);
    } else if (num < target) {
      setMessage("Більше! 🔼");
    } else {
      setMessage("Меньше! 🔽");
    }

    setGuess("");
  };

  const handleRestart = () => {
    setTarget(generateNumber());
    setGuess("");
    setMessage("Спробуй вгадати число від 1 до 50");
    setAttempts(0);
    setHistory([]);
    setIsGameOver(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  return (
    <div className="app">
      <style>{`
        .app {
          min-height: 100vh;
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: #fff; 
          text-align: center; 
          background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6f61, #845ec2);
          background-size: 400% 400%;
          animation: gradientShift 18s ease infinite;
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        .retroButton {
          margin-left: 30px;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          padding: 12px 24px;
          cursor: pointer;
          box-shadow: 0 0 10px #ff6f61, 0 0 20px #845ec2;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .retroButton:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px #ff6f61, 0 0 30px #845ec2, 0 0 40px #ff6f61;
        }

        .message {
          font-size: 20px;
          margin: 12px 0 24px;
          text-shadow: 0 0 5px #fff, 0 0 10px #ff6f61, 0 0 15px #845ec2;
        }

        input {
          padding: 12px;
          width: 180px;
          font-size: 18px;
          border-radius: 8px;
          border: none;
          outline: none;
        }
      `}</style>

      <div className="game-container">
        <style>{`
          .game-container {
            width: 100%;
            max-width: 450px;
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(10px);
            border-radius: 18px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            position: relative;`}</style>
        <h3>🔢 Відгадай число</h3>
        <p className="message">{message}</p>

        {!isGameOver && (
          <>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Введіть число"
            />
            <button onClick={handleGuess} className="retroButton">Перевірити</button>
          </>
        )}

        {isGameOver && (
          <button
            onClick={handleRestart}
            className="retroButton"
            style={{ marginTop: "12px" }}
          >
            🔄 Зіграти знову
          </button>
        )}

        <div style={{ marginTop: "12px", fontSize: "16px" }}>
          <p>Спроби: {attempts}</p>
          {history.length > 0 && <p>Перевірені числа: {history.join(", ")}</p>}
        </div>
      </div>
    </div>
  );
}

export default GuessNumber;
