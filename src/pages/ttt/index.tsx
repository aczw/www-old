import assert from "assert";
import Head from "next/head";
import { useState, type ReactElement } from "react";

function Square({
  value,
  won,
  onSquareClick,
}: {
  value: string;
  won: boolean;
  onSquareClick: () => void;
}) {
  const background = won ? "bg-green-500" : "bg-white";

  return (
    <button
      className={`float-left -mr-[2px] -mt-[2px] h-12 w-12 border-2 border-black ${background} text-center text-3xl`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
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

  const grid: ReactElement[] = [];

  for (let i = 0; i < 9; i++) {
    const symbol = squares[i];

    assert(typeof symbol === "string");

    grid.push(
      <Square
        key={i}
        value={symbol}
        won={false}
        onSquareClick={() => handleClick(i)}
      />
    );
  }

  return <div className="grid grid-cols-3 grid-rows-3">{grid}</div>;
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

function MoveList({
  history,
  currentMove,
  jumpTo,
}: {
  history: string[][];
  currentMove: number;
  jumpTo: (move: number) => void;
}) {
  const [reverse, setReverse] = useState(false);

  const moves = history.map((_, moveIndex) => {
    const current = moveIndex === currentMove;
    const opacity = current ? "/50" : "";

    const borderColor = `border-black${opacity}`;
    const background = `bg-slate-100${opacity}`;
    const text = `text-black${opacity}`;
    const cursor = current ? "cursor-not-allowed" : "cursor-pointer";

    let description = "go to game start";
    if (current) {
      description = currentMove === 0 ? "you're at game start!" : `you're on move #${moveIndex}`;
    } else if (moveIndex > currentMove) {
      description = `go back to move #${moveIndex}`;
    } else if (moveIndex > 0) {
      description = `go to move #${moveIndex}`;
    }

    return (
      <li key={moveIndex}>
        <button
          className={`rounded-md border-2 ${cursor} ${borderColor} ${background} px-1 ${text}`}
          disabled={current ? true : false}
          onClick={() => jumpTo(moveIndex)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="rounded-xl bg-slate-100 p-3">
      <p className="ml-3">move list</p>
      <button
        className="mb-5 ml-3 rounded-md border-2 border-black bg-slate-300 px-1"
        onClick={() => setReverse(!reverse)}
      >
        reverse move list
      </button>
      <div className="rounded-xl bg-slate-50 p-3">
        <ol className="space-y-1">{reverse ? moves.slice().reverse() : moves}</ol>
      </div>
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

  // because player X only moves on even indices, and Y on odd
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  assert(typeof currentSquares === "object");

  // TODO: modify calculateWinner() to return the array of indices so that we can pass it into the
  // <Board /> prop and have it render squares either green (won) or white (normal)
  const winner = calculateWinner(currentSquares);

  return (
    <>
      <Head>
        <title>tic tac toe</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center gap-5">
        <div className="rounded-xl bg-slate-100 p-3">
          <p>{winner ? `${winner} is the winner!` : `${xIsNext ? "X" : "O"}'s turn`}</p>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            gameWon={winner}
            onPlay={handlePlay}
          />
        </div>
        <div>
          <MoveList
            history={history}
            currentMove={currentMove}
            jumpTo={jumpTo}
          />
        </div>
      </main>
    </>
  );
}
