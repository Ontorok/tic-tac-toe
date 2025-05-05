import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-500 h-12 w-12 m-1 leading-9 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay, onReset }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function handleReset() {
    onReset();
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is : " + winner;
  } else {
    status = "Next player is : " + (xIsNext ? "X" : "O");
  }
  return (
    <div>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button
        className="bg-red-300 px-3 py-1 m-1 h-8 w-full rounded-full"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history, nextSquares];
    setHistory(nextHistory);
    setCurrentMove((prev) => prev + 1);
  }

  function handleReset() {
    const nextHistory = [Array(9).fill(null)];
    setHistory(nextHistory);
    setCurrentMove(0);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-50 min-w-72 min-h-80 flex items-center justify-center">
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          onReset={handleReset}
        />
      </div>
      <div className=" bg-red-100 min-w-72 min-h-80 flex items-center justify-start">
        <ul className="ml-5">
          {history.map((_, move) => {
            let description;
            if (move > 0) {
              description = "Go to move " + move;
            } else {
              description = "Start Game";
            }
            return (
              <li key={move}>
                <button
                  className="bg-amber-50 px-2 py-1 my-0.5 w-full text-start rounded-sm text-sm"
                  onClick={() => jumpTo(move)}
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Game;
