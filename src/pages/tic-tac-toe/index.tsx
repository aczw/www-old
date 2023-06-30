import assert from "assert";
import Head from "next/head";
import { useState } from "react";

function Square({ value, onSquareClick }: { value: string; onSquareClick: () => void }) {
  return (
    <button
      className="float-left -mr-[2px] -mt-[2px] h-12 w-12 border-2 border-black bg-white text-center text-2xl"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares: string[]) {
  const winningLines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningLines) {
    // necessary because noUncheckedIndexedAccess flag is true
    assert(typeof a === "number");
    assert(typeof b === "number");
    assert(typeof c === "number");

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // also necessary because squares[a] inherently has type string | undefined, so we can't
      // return it. instead, we can return a variable and assert its type beforehand
      const winner = squares[a];
      assert(typeof winner === "string");

      return winner;
    }
  }

  return "";
}

function Board({
  xIsNext,
  squares,
  gameWon,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  gameWon: string;
  onPlay: (nextSquares: string[]) => void;
}) {
  function handleClick(index: number) {
    // a nonempty string is truthy apparently...
    // also disable board interaction if there's a winner
    if (squares[index] || gameWon) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {Array(9)
        .fill(<></>)
        .map((_, index) => (
          <Square
            key={index}
            value={squares[index] ?? ""}
            onSquareClick={() => handleClick(index)}
          />
        ))}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const currentSquares = history[currentMove];
  assert(typeof currentSquares === "object");
  const winner = calculateWinner(currentSquares);

  const moves = history.map((_, move) => {
    return (
      <li key={move}>
        <button
          className="rounded-md border-2 border-black bg-slate-100 px-1"
          onClick={() => jumpTo(move)}
        >
          {move > 0 ? `go to move #${move}` : "go to game start"}
        </button>
      </li>
    );
  });

  // because player X only moves on even indices, and Y on odd
  const xIsNext = currentMove % 2 === 0;
  const status = winner ? `${winner} is the winner!` : `${xIsNext ? "X" : "O"}'s turn`;

  return (
    <>
      <Head>
        <title>tic tac toe</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center gap-5">
        <div>
          <p>{status}</p>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares ?? Array(9).fill("")}
            gameWon={winner}
            onPlay={handlePlay}
          />
          <p>{currentMove > 0 ? `you're on move #${currentMove}` : "game start!"}</p>
        </div>
        <div>
          <ol className="list-inside list-decimal space-y-1">{moves}</ol>
        </div>
      </main>
    </>
  );
}
