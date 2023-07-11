import assert from "assert";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

type Grid = [[string, string, string], [string, string, string], [string, string, string]];
type GameState =
  | { s: "Playing" }
  | { s: "Draw" }
  | {
      s: "Win";
      a: Coordinate;
      b: Coordinate;
      c: Coordinate;
    };

interface HistoryEntry {
  squares: Grid;
  move?: Coordinate;
}

interface Coordinate {
  x: number;
  y: number;
}

const Square = ({
  value,
  background,
  onSquareClick,
}: {
  value: string;
  background: string;
  onSquareClick: () => void;
}) => {
  return (
    <button
      className={`float-left border-black ${background} -mr-[4px] -mt-[4px] h-20 w-20 border-[4px] text-center text-5xl`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Board = ({
  xIsNext,
  squares,
  gameState,
  onPlay,
}: {
  xIsNext: boolean;
  squares: Grid;
  gameState: GameState;
  onPlay: (nextSquares: Grid, move: Coordinate) => void;
}) => {
  function handleClick({ x, y }: Coordinate) {
    // a nonempty string is truthy apparently...
    // also disable board interaction if game is over (win or draw)
    if ((squares[y] as string[])[x] || gameState.s !== "Playing") {
      return;
    }

    const nextSquares = squares.map((row) => row.slice()) as Grid;
    (nextSquares[y] as string[])[x] = xIsNext ? "X" : "O";

    onPlay(nextSquares, { x, y });
  }

  const grid: React.ReactElement[] = [];

  squares.forEach((row, y) => {
    row.forEach((symbol, x) => {
      const background = (() => {
        switch (gameState.s) {
          case "Playing":
            return "bg-white hover:bg-gray-100";
          case "Draw":
            return "bg-yellow-200 hover:bg-yellow-300";
          case "Win":
            const a = gameState.a.x === x && gameState.a.y === y;
            const b = gameState.b.x === x && gameState.b.y === y;
            const c = gameState.c.x === x && gameState.c.y === y;
            return a || b || c ? "bg-green-300 hover:bg-green-400" : "bg-white hover:bg-gray-100";
        }
      })();

      grid.push(
        <Square
          key={`${x}, ${y}`}
          value={symbol}
          background={background}
          onSquareClick={() => handleClick({ x, y })}
        />
      );
    });
  });

  return <div className="grid w-max min-w-max grid-cols-3 grid-rows-3">{grid}</div>;
};

const calculateWinner = (squares: Grid): GameState => {
  const winningLines = [
    // horizontal
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],

    // vertical
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],

    // diagonal
    [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ],
  ];

  for (const [i, j, k] of winningLines) {
    assert(typeof i !== "undefined");
    assert(typeof j !== "undefined");
    assert(typeof k !== "undefined");

    const a = (squares[i.y] as string[])[i.x] as string;
    const b = (squares[j.y] as string[])[j.x] as string;
    const c = (squares[k.y] as string[])[k.x] as string;

    // check that all three squares are not empty
    if (a && b && c) {
      if (a === b && a === c && b === c) {
        return { s: "Win", a: i, b: j, c: k };
      }
    }
  }

  // check for draw. occurs when every square is filled
  let count = 0;
  squares.forEach((row) => {
    row.forEach((square) => {
      if (square) {
        count += 1;
      }
    });
  });

  if (count === 9) {
    return { s: "Draw" };
  }

  // else, the game is still going on
  return { s: "Playing" };
};

const MoveList = ({
  history,
  currentMove,
  jumpTo,
}: {
  history: HistoryEntry[];
  currentMove: number;
  jumpTo: (move: number) => void;
}) => {
  const [reverse, setReverse] = useState(false);

  const moves = history.map((_, moveIndex) => {
    const current = moveIndex === currentMove;
    const opacity = current ? "opacity-50" : "";
    const cursor = current ? "cursor-not-allowed" : "cursor-pointer";

    const description = current
      ? currentMove === 0
        ? "you're at game start!"
        : `on move ${moveIndex}`
      : moveIndex > currentMove
      ? `move ${moveIndex}`
      : moveIndex > 0
      ? `move ${moveIndex}`
      : "go to game start";

    const coordinate = history[moveIndex]?.move;

    return (
      <li key={moveIndex}>
        <button
          className={`w-full rounded-xl ${cursor} border-black bg-gray-300 py-1.5 text-black ${opacity} hover:bg-gray-400/50`}
          disabled={current ? true : false}
          onClick={() => jumpTo(moveIndex)}
        >
          {description}
          {typeof coordinate !== "undefined" ? (
            <>
              {" / "}
              <code>{`(${coordinate.y}, ${coordinate.x})`}</code>
            </>
          ) : (
            ""
          )}
        </button>
      </li>
    );
  });

  return (
    <div className="mb-10 min-h-[508px] w-[295px] rounded-3xl bg-gray-200 p-5 md:min-h-[490px] md:w-[370px]">
      <h1 className="text-2xl font-bold">moves history</h1>
      <p className="mb-4 text-base">select a move to go back to that point in the game.</p>
      <p className="mb-4 text-base">
        coordinates are listed in <code className="inline-block">(row, col)</code> format with the
        origin at the top left.
      </p>
      <button
        className="mb-6 w-full rounded-xl bg-gray-50 py-2 font-mono italic hover:bg-gray-100"
        onClick={() => setReverse(!reverse)}
      >
        reverse list
      </button>
      <ol className="gap-2 space-y-2 md:grid md:grid-cols-2 md:space-y-0">
        {reverse ? moves.slice().reverse() : moves}
      </ol>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      squares: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameState, setGameState] = useState<GameState>({ s: "Playing" });

  function handlePlay(nextSquares: Grid, move: Coordinate) {
    const nextEntry = { squares: nextSquares, move };
    const nextHistory = [...history.slice(0, currentMove + 1), nextEntry];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameState(calculateWinner(nextSquares));
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
    setGameState(calculateWinner(history[move]?.squares as Grid));
  }

  // because player X only moves on even indices, and Y on odd
  const xIsNext = currentMove % 2 === 0;

  // currentMove will never be greater than history.length - 1
  const currentSquares = history[currentMove]?.squares as Grid;

  const status = (() => {
    switch (gameState.s) {
      case "Playing":
        return `${xIsNext ? "X" : "O"}'s turn`;
      case "Draw":
        return "game draw!";
      case "Win":
        // we get currentSquares[] from the history, guaranteed to be a Grid
        const winningPlayer = (currentSquares[gameState.a.y] as string[])[gameState.a.x] as string;
        return `${winningPlayer} wins!`;
    }
  })();

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row">
      <div className="flex flex-col items-start justify-center gap-6 lg:flex-row">
        <div className="mt-10 min-h-full max-w-[295px] rounded-3xl bg-gray-200 p-5 md:mt-0">
          <Link href="/">
            <button className="w-full rounded-xl bg-gray-50 py-[6px] font-mono italic hover:bg-gray-100">
              go back home
            </button>
          </Link>
          <h1 className="mt-4 text-2xl font-bold">tic-tac-toe</h1>
          <p className="text-base">
            created by following the React tutorial from their website. have fun.
          </p>
          <h1 className="mt-4 text-2xl font-bold">how to play</h1>
          <p className="text-base">are you serious?</p>
        </div>
        <div className="space-y-6">
          <div className="w-max min-w-max rounded-3xl bg-gray-200 p-8 pr-[35px] pt-[35px]">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              gameState={gameState}
              onPlay={handlePlay}
            />
          </div>
          <div className="flex h-20 w-[295px] select-none items-center justify-center rounded-3xl bg-gray-200 text-4xl font-bold text-gray-500">
            {status}
          </div>
        </div>
      </div>
      <MoveList
        history={history}
        currentMove={currentMove}
        jumpTo={jumpTo}
      />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Head>
        <title>tic-tac-toe</title>
        <meta
          name="description"
          content="tic-tac-toe with time travel"
        />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <Game />
      </main>
    </>
  );
};

export default App;
