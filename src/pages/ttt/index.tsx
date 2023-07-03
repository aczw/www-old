import assert from "assert";
import Head from "next/head";
import Link from "next/link";
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

  squares.forEach((symbol, i) => {
    const background = (() => {
      switch (gameState.s) {
        case "Playing":
          return "bg-white";
        case "Draw":
          return "bg-yellow-200";
        case "Win":
          return gameState.a === i || gameState.b === i || gameState.c === i
            ? "bg-green-300"
            : "bg-white";
      }
    })();

    grid.push(
      <Square
        key={i}
        value={symbol}
        background={background}
        onSquareClick={() => handleClick(i)}
      />
    );
  });

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

  for (const [i, j, k] of winningLines) {
    assert(typeof i === "number");
    assert(typeof j === "number");
    assert(typeof k === "number");

    // check that all three squares are not empty
    if (squares[i] && squares[j] && squares[k]) {
      if (squares[i] === squares[j] && squares[i] === squares[k] && squares[j] === squares[k]) {
        return { s: "Win", a: i, b: j, c: k };
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

    const description = current
      ? currentMove === 0
        ? "you're at game start!"
        : `you're on move #${moveIndex}`
      : moveIndex > currentMove
      ? `go back to move #${moveIndex}`
      : moveIndex > 0
      ? `go to move #${moveIndex}`
      : "go to game start";

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
    // guaranteed to be array of strings, because that's all we ever .push() into it
    const squares = history[move] as string[];

    return squares;
  }

  // because player X only moves on even indices, and Y on odd
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = getCurrentSquares(currentMove);

  const status = (() => {
    switch (gameState.s) {
      case "Playing":
        return `${xIsNext ? "X" : "O"}'s turn`;
      case "Draw":
        return "game draw!";
      case "Win":
        // we get currentSquares[] from the history, guaranteed to have string[]
        const winningPlayer = currentSquares[gameState.a] as string;

        return `${winningPlayer} is the winner!`;
    }
  })();

  return (
    <>
      <Head>
        <title>tic tac toe</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center gap-5">
        <div>
          <h1>tic tac toe</h1>
          <p>
            coordinates are counted as <code>(0, 0)</code> from the top left.
          </p>
        </div>
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
        <Link
          href="/"
          className="rounded-xl bg-purple-100 p-2"
        >
          go back
        </Link>
      </main>
    </>
  );
}
