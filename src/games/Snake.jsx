import React, { useEffect, useRef, useState } from "react";

const CELL_SIZE = 30;
const BOARD_SIZE = 20;
const BASE_SPEED = 200;

function Snake() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ]);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("snakeHighScore")) || 0
  );
  const [speed, setSpeed] = useState(BASE_SPEED);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        if (direction === "UP") head.y -= 1;
        if (direction === "DOWN") head.y += 1;
        if (direction === "LEFT") head.x -= 1;
        if (direction === "RIGHT") head.x += 1;

        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= BOARD_SIZE ||
          head.y >= BOARD_SIZE ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood());
          setScore((s) => {
            const newScore = s + 1;

            setSpeed((prevSpeed) => Math.max(prevSpeed - 2, 50));

            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("snakeHighScore", newScore);
            }
            return newScore;
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver, highScore, speed]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, CELL_SIZE * BOARD_SIZE, CELL_SIZE * BOARD_SIZE);

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#f0f0f0" : "#e0e0e0";
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  }, [snake, food]);

  const handleRestart = () => {
    setSnake([
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ]);
    setFood(randomFood());
    setDirection("RIGHT");
    setIsGameOver(false);
    setScore(0);
    setSpeed(BASE_SPEED);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "1rem",
      height: "879px",
      background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff6f61, #845ec2)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 18s ease infinite",
      margin: "0",
    }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <h3 style={{ margin: "0 0 8px", fontSize: "24px", color: "white" }}>🐍 Змійка</h3>

      <div style={{ fontSize: "18px", marginBottom: "8px" }}>
        Бали: {score} | Рекорд: {highScore}
      </div>

      {isGameOver && (
        <button
          onClick={handleRestart}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 0 5px #ff6f61, 0 0 10px #845ec2",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          🔄 Зіграти знову
        </button>
      )}

      {isGameOver && <h2 style={{ margin: "12px 0 0" }}>❌Кінець гри</h2>}

      <canvas
        ref={canvasRef}
        width={CELL_SIZE * BOARD_SIZE}
        height={CELL_SIZE * BOARD_SIZE}
        style={{ border: "1px solid #ccc", marginTop: "12px" }}
      />
    </div>
  );
}

export default Snake;
