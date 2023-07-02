import assert from "assert";
import Head from "next/head";
import { useState, type ReactElement } from "react";

type GameState = { s: "Playing" } | { s: "Draw" } | { s: "Win"; a: number; b: number; c: number };

function Square({
  value,
  background,
  onSquareClick,
}: {
  value: string;
  background: string;
  onSquareClick: () => void;
}) {
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
  gameState,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  gameState: GameState;
  onPlay: (nextSquares: string[]) => void;
}) {
  function handleClick(index: number) {
    // a nonempty string is truthy apparently...
    // also disable board interaction if game is over (win or draw)
    if (squares[index] || gameState.s !== "Playing") {
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

    let background;
    switch (gameState.s) {
      case "Playing":
        background = "bg-white";
        break;
      case "Draw":
        background = "bg-yellow-200";
        break;
      case "Win":
        background =
          gameState.a === i || gameState.b === i || gameState.c === i ? "bg-green-300" : "bg-white";
        break;
    }

    grid.push(
      <Square
        key={i}
        value={symbol}
        background={background}
        onSquareClick={() => handleClick(i)}
      />
    );
  }

  return <div className="grid grid-cols-3 grid-rows-3">{grid}</div>;
}

function calculateWinner(squares: string[]): GameState {
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

  // check for winner
  for (const [a, b, c] of winningLines) {
    // necessary because noUncheckedIndexedAccess flag is true
    assert(typeof a === "number");
    assert(typeof b === "number");
    assert(typeof c === "number");

    // check that all three squares are not empty
    if (squares[a] && squares[b] && squares[c]) {
      if (squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[c]) {
        return { s: "Win", a, b, c };
      }
    }
  }

  // check for draw. occurs when every square is filled
  let count = 0;
  squares.forEach((square) => {
    if (square) {
      count += 1;
    }
  });

  if (count === 9) {
    return { s: "Draw" };
  }

  // else, the game is still going on
  return { s: "Playing" };
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
    const opacity = current ? "opacity-50" : "";
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
          className={`rounded-md border-2 ${cursor} border-black bg-purple-100 px-1 text-black ${opacity}`}
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
      <p className="ml-3">move history</p>
      <button
        className="mb-5 ml-3 rounded-md border-2 border-black bg-slate-300 px-1"
        onClick={() => setReverse(!reverse)}
      >
        reverse list!
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
  const [gameState, setGameState] = useState<GameState>({ s: "Playing" });

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameState(calculateWinner(nextSquares));
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
    setGameState(calculateWinner(getCurrentSquares(move)));
  }

  function getCurrentSquares(move: number) {
    const squares = history[move];
    assert(Array.isArray(squares));

    return squares;
  }

  // because player X only moves on even indices, and Y on odd
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = getCurrentSquares(currentMove);

  let status;
  switch (gameState.s) {
    case "Playing":
      status = `${xIsNext ? "X" : "O"}'s turn`;
      break;
    case "Draw":
      status = "game draw!";
      break;
    case "Win":
      const winningPlayer = currentSquares[gameState.a];
      assert(typeof winningPlayer === "string");

      status = `${winningPlayer} is the winner!`;
      break;
  }

  return (
    <>
      <Head>
        <title>tic tac toe</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center gap-5">
        <div className="rounded-xl bg-slate-100 p-3">
          <p>{status}</p>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            gameState={gameState}
            onPlay={handlePlay}
          />
        </div>
        <MoveList
          history={history}
          currentMove={currentMove}
          jumpTo={jumpTo}
        />
      </main>
    </>
  );
}
