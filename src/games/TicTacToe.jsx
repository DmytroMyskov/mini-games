import React, { useState, useRef } from "react";

const styles = `
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; margin: 0; font-family: 'Poppins', sans-serif; }

  .app {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    color: #fff; text-align: center; padding: 24px;
    background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6f61, #845ec2);
    background-size: 400% 400%;
    animation: gradientShift 18s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  .card {
    width: 100%; max-width: 450px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    position: relative;
  }

  h1 { margin: 0 0 16px; font-size: 28px; font-weight: 800; }
  .scoreboard { display: flex; justify-content: space-between; margin-bottom: 16px; }
  .scoreboard div { font-weight: 700; font-size: 18px; }

  .status { margin-bottom: 16px; font-size: 20px; font-weight: 700; min-height: 28px; }

  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 8px;
    justify-content: center;
    margin-bottom: 16px;
  }

  .cell {
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; font-weight: 700;
    cursor: pointer;
    border-radius: 12px;
    transition: transform 0.2s ease, background 0.2s ease;
    position: relative;
  }
  .cell:hover { transform: scale(1.05); background: rgba(255,255,255,0.35); }
  .strike { position: absolute; width: 100%; height: 4px; background: #0c0; top: 50%; left: 0; transform-origin: center; }

  .reset {
    padding: 10px 20px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    background: rgba(255,255,255,0.85);
    color: #222;
    transition: transform .15s ease, background .2s ease;
  }
  .reset:hover { transform: translateY(-2px); background: #fff; }
  .reset:active { transform: translateY(0); }
`;

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [cur, setCur] = useState("❌"); // Игрок всегда ❌
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState("Хід: ❌");
  const [winnerLine, setWinnerLine] = useState(null); // Индексы победной линии
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const handleMove = (i) => {
    if (over || cells[i]) return;

    const newCells = [...cells];
    newCells[i] = cur;
    setCells(newCells);

    if (checkWinner(newCells, cur)) return;

    setCur("⭕");
    setStatus("Хід: ⭕");
    setTimeout(() => {
      const empty = newCells.map((v, j) => v === "" ? j : null).filter(j => j !== null);
      if (empty.length === 0) return;
      const compMove = empty[Math.floor(Math.random() * empty.length)];
      newCells[compMove] = "⭕";
      setCells([...newCells]);
      if (!checkWinner(newCells, "⭕")) {
        setCur("❌");
        setStatus("Хід: ❌");
      }
    }, 400);
  };

  const checkWinner = (board, player) => {
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setOver(true);
        setStatus(`🏆 Переміг: ${player}`);
        setWinnerLine([a, b, c]);
        if (player === "❌") setScore(s => ({ ...s, player: s.player + 1 }));
        else setScore(s => ({ ...s, computer: s.computer + 1 }));
        return true;
      }
    }
    if (!board.includes("")) {
      setOver(true);
      setStatus("🤝 Нічия!");
      return true;
    }
    return false;
  };

  const reset = () => {
    setCells(Array(9).fill(""));
    setCur("❌");
    setOver(false);
    setStatus("Хід: ❌");
    setWinnerLine(null);
  };

  const getStrikeStyle = (line) => {
    if (!line) return {};
    const [a, b, c] = line;
    if (a + 1 === b && b + 1 === c) return { transform: "rotate(0deg)" };
    if (a + 3 === b && b + 3 === c) return { transform: "rotate(90deg)" };
    if (a === 0 && c === 8) return { transform: "rotate(45deg)" };
    if (a === 2 && c === 6) return { transform: "rotate(-45deg)" };
    return {};
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="card">
          <h1>❌⭕ Хрестики-Нолики</h1>

          <div className="scoreboard">
            <div>Гравець: {score.player}</div>
            <div>Комп'ютер: {score.computer}</div>
          </div>

          <div className="status">{status}</div>

          <div className="board">
            {cells.map((v, i) => (
              <div key={i} className="cell" onClick={() => handleMove(i)}>
                {v}
                {winnerLine && winnerLine.includes(i) && <div className="strike" style={getStrikeStyle(winnerLine)}></div>}
              </div>
            ))}
          </div>

          <button className="reset" onClick={reset} style={{ fontSize: "18px" }}>🔄 Зіграти знову</button>
        </div>
      </div>
    </>
  );
}
