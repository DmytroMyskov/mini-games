import React, { useState, useEffect } from "react";

const ALPHABET = [
  "А", "Б", "В", "Г", "Ґ", "Д", "Е", "Є", "Ж", "З", "И", "І", "Ї",
  "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х",
  "Ц", "Ч", "Ш", "Щ", "Ь", "Ю", "Я"
];

const WORDS = [
  "СОНЦЕ", "ДЕРЕВО", "КНИГА", "МОРЕ", "ПАЛЬМИ", "АВТОМОБІЛЬ",
  "МИСТЕЦТВО", "МУЗИКА", "ПРИГОДА", "ПРОГРАМА", "ФІЛЬМ", "КІНО", "БУРЯК",
  "ПОТУЖНІСТЬ", "ВІДПОЧИНОК", "ПОДОРОЖ", "ДРУЗІ", "ЩАСТЯ",
];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function Hangman() {
  const [word, setWord] = useState(getRandomWord());
  const [guessed, setGuessed] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const maxWrong = 6;

  useEffect(() => {
    if (wrongGuesses >= maxWrong || word.split("").every(letter => guessed.includes(letter))) {
      setIsGameOver(true);
    }
  }, [guessed, wrongGuesses, word]);

  const handleGuess = (letter) => {
    if (isGameOver) return;
    if (!guessed.includes(letter)) {
      setGuessed([...guessed, letter]);
      if (!word.includes(letter)) setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleRestart = () => {
    setWord(getRandomWord());
    setGuessed([]);
    setWrongGuesses(0);
    setIsGameOver(false);
  };

  const renderWord = word.split("").map((letter, i) => (
    <span key={i} style={{
      marginRight: "6px", fontSize: "24px",
      borderBottom: "2px solid #fff", display: "inline-block",
      width: "24px", textTransform: "uppercase"
    }}>
      {guessed.includes(letter) ? letter : ""}
    </span>
  ));

  const letterRows = [];
  for (let i = 0; i < 3; i++) {
    letterRows.push(ALPHABET.slice(i * 11, (i + 1) * 11));
  }

  const hangmanStages = [
    "",
    "Голова",
    "Тулуб",
    "Ліва рука",
    "Права рука",
    "Ліва нога",
    "Права нога"
  ];

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
          border: none;
          border-radius: 12px;
          font-size: 18px;
          padding: 20px 24px;
          margin: 4px;
          cursor: pointer;
          box-shadow: 0 0 5px #ff6f61, 0 0 10px #845ec2;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .retroButton:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }
        .retroButton:hover:enabled {
          transform: scale(1.1);
          box-shadow: 0 0 15px #ff6f61, 0 0 20px #845ec2;
        }

        .message {
          font-size: 20px;
          margin: 12px 0;
        }

        .hangmanStage {
          margin: 12px 0;
          font-size: 18px;
          color: #fff;
          text-shadow: 0 0 5px #fff, 0 0 10px #ff6f61;
        }

        .letterRow {
          margin-bottom: 8px;
        }
      `}</style>

      <div className="gameContainer">
        <style>{`
          .gameContainer {
            width: 100%;
            max-width: 800px;
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(10px);
            border-radius: 18px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            position: relative;`}</style>

        <h3>🏗️🧍 ➡️ 😵 💀 Шибениця</h3>
        <div style={{ marginBottom: "16px" }}>{renderWord}</div>

        <div className="hangmanStage">
          {hangmanStages[wrongGuesses]}
        </div>

        {letterRows.map((row, idx) => (
          <div key={idx} className="letterRow">
            {row.map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessed.includes(letter) || isGameOver}
                className="retroButton"
              >
                {letter}
              </button>
            ))}
          </div>
        ))}

        <div className="message">
          {isGameOver ? (word.split("").every(l => guessed.includes(l)) ? "🎉 Ви перемогли!" : `❌ Гру завершено! Слово: ${word}`) : `Помилок: ${wrongGuesses} / ${maxWrong}`}
        </div>

        {isGameOver && (
          <button onClick={handleRestart} className="retroButton" style={{ marginTop: "12px" }}>
            🔄 Зіграти знову
          </button>
        )}
      </div>
    </div>
  );
}

export default Hangman;
