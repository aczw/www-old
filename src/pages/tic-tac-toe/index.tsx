import assert from "assert";
import Head from "next/head";
import { useState } from "react";

function Square({
  value,
  onSquareClick,
}: {
  value: string | undefined;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="float-left -mr-[2px] -mt-[2px] h-12 w-12 border-2 border-black text-center text-2xl"
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
    assert(a !== undefined);
    assert(b !== undefined);
    assert(c !== undefined);

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as string;
    }
  }

  return "";
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));

  const winner = calculateWinner(squares);
  const status = winner ? `winner: ${winner}` : `next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(index: number) {
    // a nonempty string is truthy apparently
    if (squares[index] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[index] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);

    setSquares(nextSquares);
  }

  return (
    <div>
      <div className="my-2">{status}</div>
      <div>
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div>
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div>
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <>
      <Head>
        <title>tic tac toe</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <Board />
      </main>
    </>
  );
}
