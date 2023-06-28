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

function Board() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));

  function handleClick(index: number) {
    const nextSquares = squares.slice();
    nextSquares[index] = "X";

    setSquares(nextSquares);
  }

  return (
    <div>
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

export default function Wrapper() {
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
