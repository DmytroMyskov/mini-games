import React, { useState } from "react";
import Snake from "./games/Snake";
import RPS from "./games/RPS";
import TicTacToe from "./games/TicTacToe";
import GuessNumber from "./games/GuessNumber";
import Hangman from "./games/Hangman";
import './index.css';

function App() {
  const [game, setGame] = useState(null);

  const games = {
    snake: <Snake />,
    rps: <RPS />,
    ttt: <TicTacToe />,
    guess: <GuessNumber />,
    hangman: <Hangman />,
  };

  if (game) {
    return (
      <div>
        <button
          onClick={() => setGame(null)}
          style={{
            position: "absolute",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "18px",
            cursor: "pointer",
            backgroundColor: "transparent",
            top: "10px",
            left: "10px",
            color: "#fff",
            transition: "transform 0.2s ease, background 0.2s ease",
            textTransform: "uppercase",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 0 20px #ff6f61, 0 0 30px #845ec2, 0 0 40px #ff6f61",
            },
          }}
        >
          ⬅ Назад в меню
        </button>
        {games[game]}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      background: "linear-gradient(-45deg, #ff6ec7, #8338ec, #3a86ff, #ffbe0b)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      transition: "background 0.5s ease",
      textTransform: "uppercase"
    }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <h1>🎮 Міні-ігри</h1>
      <ul style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
      }}>
        <li>
          <button style={gameButtonStyle} onClick={() => setGame("snake")}>🐍 Змійка</button>
        </li>
        <li>
          <button style={gameButtonStyle} onClick={() => setGame("rps")}>✊✋✌ Камінь-Ножиці-Папір</button>
        </li>
        <li>
          <button style={gameButtonStyle} onClick={() => setGame("ttt")}>❌⭕ Хрестики-Нолики</button>
        </li>
        <li>
          <button style={gameButtonStyle} onClick={() => setGame("guess")}>🔢 Відгадай число</button>
        </li>
        <li>
          <button style={gameButtonStyle} onClick={() => setGame("hangman")}>🏗️🧍 ➡️ 😵 💀 Шибениця</button>
        </li>
      </ul>
    </div>
  );
}

const gameButtonStyle = {
  fontFamily: "'Poppins', sans-serif",
  padding: "16px 32px",
  fontSize: "20px",
  fontWeight: "semibold",
  borderRadius: "10px",
  cursor: "pointer",
  border: "none",
  background: "rgba(0,0,0,0.3)",
  color: "#fff",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 0 10px #ff6f61, 0 0 20px #845ec2",
  textTransform: "uppercase",


  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 0 20px #ff6f61, 0 0 30px #845ec2, 0 0 40px #ff6f61",
  },
};

export default App;