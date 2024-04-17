import { Square } from "./Square";
import { calculateWinner } from "../utils/calculateWinner";

interface Props {
  xIsNext: boolean;
  squares: string[];
  winnerColor: string;
  setWinnerColor: React.Dispatch<React.SetStateAction<string>>;
  winnerStatusCss: boolean;
  setWinnerStatusCss: React.Dispatch<React.SetStateAction<boolean>>;
  onPlay: (squares: string[]) => void;
}

export const Board = ({
  xIsNext,
  squares,
  winnerStatusCss,
  setWinnerStatusCss,
  winnerColor,
  setWinnerColor,
  onPlay,
}: Props) => {
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares: string[] = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    setWinnerStatusCss(true);
    setWinnerColor(winner === "X" ? "xWinnerColor" : "oWinnerColor");
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    setWinnerStatusCss(false);
  }

  return (
    <div>
      <div
        className={`status ${
          winnerStatusCss ? `winnerStatusCss ${winnerColor}` : ""
        }`}
      >
        {status}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};
