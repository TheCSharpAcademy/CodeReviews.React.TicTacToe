import { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button
            className={`square ${isWinningSquare ? "winning-square" : ""}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || calculateDraw(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares, i);
    }

    const winningResult = calculateWinner(squares);
    const draw = calculateDraw(squares);
    let status;
    let winningLine = [];
    if (winningResult) {
        status = "Winner: " + winningResult.winner;
        winningLine = winningResult.line;
    } else if (draw) {
        status = "Draw: Try again!";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const boardSize = 3;
    const board = [];
    for (let row = 0; row < boardSize; row++) {
        const rowSquares = [];
        for (let col = 0; col < boardSize; col++) {
            const index = row * boardSize + col;
            const isWinningSquare = winningLine.includes(index);
            rowSquares.push(
                <Square
                    key={index}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                    isWinningSquare={isWinningSquare}
                />
            );
        }
        board.push(
            <div key={row} className="board-row">
                {rowSquares}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquare = history[currentMove].squares;

    function handlePlay(nextSquares, index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: `(${row}, ${col})` }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function toggleSortOrder() {
        setIsAscending(!isAscending);
    }

    const sortedMoves = isAscending ? history : [...history].reverse();
    const moves = sortedMoves.map((step, move) => {
        const displayMove = isAscending ? move : history.length - 1 - move;
        let description;
        if (displayMove === currentMove) {
            description = `You are at move #${displayMove} ${step.location ? step.location : ""}`;
        } else if (displayMove > 0) {
            description = `Go to move #${displayMove} ${step.location}`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={displayMove}>
                <button onClick={() => jumpTo(displayMove)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquare} onPlay={(squares, index) => handlePlay(squares, index)} />
            </div>
            <div className="game-info">
                <button onClick={toggleSortOrder}>
                    {isAscending ? 'Sort Descending' : 'Sort Ascending'}
                </button>
                <ol>
                    {moves}
                </ol>
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return null;
}

function calculateDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            return null;
        }
    }
    return true;
}
