import React, { useState } from "react";

const styles = `
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }

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
    width: 100%; max-width: 560px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  }

  h1 { margin: 0 0 16px; font-size: 28px; font-weight: 800; }

  .choices {
    display: flex; gap: 12px; justify-content: center; margin-bottom: 18px; flex-wrap: wrap;
  }
  .btn {
    border: none; border-radius: 12px; padding: 10px 16px; cursor: pointer;
    background: rgba(255,255,255,0.85); color: #222; font-weight: 600;
    transition: transform .15s ease, background .2s ease; font-size: 18px;
    box-shadow: 0 0 5px #ff6f61, 0 0 10px #845ec2;
  }
  .btn:hover { transform: translateY(-2px); background: #fff; }
  .btn:active { transform: translateY(0); }

  .arena {
    height: 140px; display: flex; align-items: center; justify-content: center; gap: 48px;
    margin: 8px 0 12px;
  }
  .fighter {
    font-size: 64px; line-height: 1; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.35));
    opacity: 0;
  }
  .from-left { animation: enterLeft .45s ease forwards, bounce .8s ease .45s; }
  .from-right { animation: enterRight .45s ease forwards, bounce .8s ease .45s; }

  @keyframes enterLeft { from { transform: translateX(-80px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
  @keyframes enterRight { from { transform: translateX(80px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
  @keyframes bounce { 0%{transform: scale(1)} 35%{transform: scale(1.15)} 70%{transform: scale(0.98)} 100%{transform: scale(1)} }

  .winner {
    position: relative;
    animation: glow 1.2s ease-in-out forwards .3s;
  }
  @keyframes glow {
    0% { text-shadow: 0 0 0 rgba(0,255,170,0) }
    50% { text-shadow: 0 0 20px rgba(0,255,170,0.8) }
    100% { text-shadow: 0 0 10px rgba(0,255,170,0.7) }
  }

  .status { min-height: 32px; font-size: 20px; font-weight: 700; margin-bottom: 12px; }

  .score {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center;
    background: rgba(255,255,255,0.12); border-radius: 12px; padding: 12px;
  }
  .score .box {
    background: rgba(255,255,255,0.12); border-radius: 10px; padding: 10px;
  }
  .muted { opacity: .9; font-weight: 600; }
  .reset { margin-top: 12px; }
`;

export default function App() {
  const choices = [
    { name: "Камінь", icon: "✊" },
    { name: "Папір", icon: "✋" },
    { name: "Ножиці", icon: "✌" },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [round, setRound] = useState(0);

  const decideWinner = (p, c) => {
    if (p.name === c.name) return "draw";
    if (
      (p.name === "Камінь" && c.name === "Ножиці") ||
      (p.name === "Папір" && c.name === "Камінь") ||
      (p.name === "Ножиці" && c.name === "Папір")
    ) return "player";
    return "computer";
  };

  const play = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    const w = decideWinner(choice, compChoice);
    setWinner(w);
    if (w === "draw") setResult("Нічия!");
    if (w === "player") {
      setResult("Ти виграв! 🎉");
      setScore(s => ({ ...s, player: s.player + 1 }));
    }
    if (w === "computer") {
      setResult("Комп'ютер виграв! 🤖");
      setScore(s => ({ ...s, computer: s.computer + 1 }));
    }
    setRound(r => r + 1);
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setWinner(null);
    setScore({ player: 0, computer: 0 });
    setRound(r => r + 1);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="card">
          <h1>Камінь • Папір • Ножиці</h1>

          <div className="choices">
            {choices.map((c) => (
              <button key={c.name} className="btn" onClick={() => play(c)}>
                {c.name}
              </button>
            ))}
            <button className="btn reset" onClick={reset}>Скинути</button>
          </div>

          <div className="arena">
            {playerChoice && (
              <div
                key={`p-${round}`}
                className={`fighter from-left ${winner === "player" ? "winner" : ""}`}
                title={playerChoice.name}
              >
                {playerChoice.icon}
              </div>
            )}

            {computerChoice && (
              <div
                key={`c-${round}`}
                className={`fighter from-right ${winner === "computer" ? "winner" : ""}`}
                title={computerChoice.name}
              >
                {computerChoice.icon}
              </div>
            )}
          </div>

          <div className="status">{result}</div>

          <div className="score">
            <div className="box">
              <div className="muted">Гравець</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{score.player}</div>
            </div>
            <div className="box">
              <div className="muted">Комп'ютер</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{score.computer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
