import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {

  if (isWinner) {
    return (
      <button className="square winnerSquare" onClick={onSquareClick}>
      {value}
    </button>
    );
  }
  

  return (
    
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  const renderSquares = (row, winnerArray) => {
    let squareElements = [];

    for (let i = 0; i < 3; i++) {
      let index = 3 * row + i

      squareElements.push(
      <Square key={index} 
      value={squares[index]} 
      isWinner={winnerArray.includes(index)} 
      onSquareClick={() => handleClick(index)} />);
    }

    return squareElements;
  }

  const renderBoard = (win) => {
    let divs = []

    for (let i = 0; i < 3; i++) {
      divs.push(<div key={"rows" + i} className="board-row">{renderSquares(i, win)}</div>)
      
    }
    return divs;
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner[1];
    return (
      <>
      <div className="status">{status}</div>
      {renderBoard(winner[0])}
      </>
    );
  } else if (!squares.includes(null)) {
    status = "Draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {renderBoard([])}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move == currentMove) {
      description = 'You are at move #' + move;
    } else if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    if (move == currentMove) {
      return (
        <li key={move}>
          {description}
        </li>
      );
    } 

    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
    
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [[a,b,c], squares[a]];
    }
  }
  return null;
}
