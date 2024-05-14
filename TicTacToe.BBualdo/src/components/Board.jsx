import React from "react";
import logo from "../images/logo.svg";
import xTurn from "../images/pick-x.svg";
import oTurn from "../images/pick-o.svg";
import xIcon from "../images/icon-x.svg";
import oIcon from "../images/icon-o.svg";

export default function Board(props) {
  // Represent the game board
  const [board, setBoard] = React.useState(Array(9).fill(""));
  // Represents currentPlayer
  const [currentPlayer, setCurrentPlayer] = React.useState("x");
  // Represents game status
  const [gameResult, setGameResult] = React.useState("ongoing");
  // Counting Score
  const [score, setScore] = React.useState({
    xWins: 0,
    ties: 0,
    oWins: 0,
  });
  // Represents showing Restart Overlay
  const [showRestart, setShowRestart] = React.useState(false);
  // Represent which cells should be styled
  const [styleWinners, setStyleWinners] = React.useState([]);
  // Represents CPU turn
  const [isComputerTurn, setIsComputerTurn] = React.useState(
    props.player === "x" ? false : true
  );

  function handleCellClick(i) {
    if (board[i] === "" && gameResult === "ongoing") {
      const newBoard = [...board];
      newBoard[i] = currentPlayer;
      setBoard(newBoard);
      const winner = checkWinner(newBoard);
      if (winner) {
        setGameResult(winner === "tie" ? "tie" : `${winner}`);
        // update the score
        winner === "x"
          ? setScore((prevScore) => ({
              ...prevScore,
              xWins: prevScore.xWins + 1,
            }))
          : winner === "o"
          ? setScore((prevScore) => ({
              ...prevScore,
              oWins: prevScore.oWins + 1,
            }))
          : setScore((prevScore) => ({
              ...prevScore,
              ties: prevScore.ties + 1,
            }));
      } else {
        nextTurn();
      }
    }
  }

  // function that switches turns
  function nextTurn() {
    setCurrentPlayer((prevPlayer) => {
      return prevPlayer === "x" ? "o" : "x";
    });
    props.CPU && currentPlayer === props.player
      ? setIsComputerTurn(true)
      : setIsComputerTurn(false);
  }

  React.useEffect(() => {
    if (isComputerTurn && gameResult === "ongoing") {
      // find all empty cells on the board
      const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === "") {
          acc.push(index);
        }
        return acc;
      }, []);

      // check if there are empty cells avaiable for CPU to move
      if (emptyCells.length > 0) {
        // generate a random index to select a random empty cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        // delay simulation
        setTimeout(() => {
          handleCellClick(computerMove);
        }, Math.random() * 2000);
      }
    }
  }, [board, gameResult, isComputerTurn]);

  // Result components
  function Result() {
    return (
      <section className="result-popup">
        {gameResult !== "tie" && props.player !== gameResult && props.CPU && (
          <h4>Oh no, you lost...</h4>
        )}
        {props.player === gameResult && props.CPU && <h4>You won!</h4>}
        {gameResult !== "tie" && props.player !== gameResult && !props.CPU && (
          <h4>Player 2 wins!</h4>
        )}
        {props.player === gameResult && !props.CPU && <h4>Player 1 wins!</h4>}
        {gameResult === "tie" && <h4></h4>}
        <div className="winner">
          {gameResult !== "tie" && (
            <img
              alt="Winner"
              src={gameResult === "x" ? xIcon : gameResult === "o" ? oIcon : ""}
            />
          )}
          <h1
            className={
              gameResult === "x"
                ? "x-won"
                : gameResult === "o"
                ? "o-won"
                : "no-won"
            }
          >
            {gameResult === "tie" ? `Round Tied` : `Takes the round`}
          </h1>
        </div>
        <div className="result-buttons">
          <button className="quit--button" onClick={props.togglePage}>
            Quit
          </button>
          <button className="next-round--button" onClick={restartGame}>
            Next Round
          </button>
        </div>
      </section>
    );
  }

  // board rendering component
  function BoardFields() {
    // Represents cell hover image
    const [hoveredCell, setHoveredCell] = React.useState(null);

    return board.map((cell, i) => (
      <div
        key={i}
        className={`board--field field--${cell} 
        ${
          !isComputerTurn &&
          hoveredCell === i &&
          cell === "" &&
          gameResult === "ongoing" &&
          `cell-hover-${currentPlayer}`
        }
        ${styleWinners.includes(i) ? `winner-cell--${gameResult}` : ""}`}
        onClick={() => handleCellClick(i)}
        onMouseEnter={() => setHoveredCell(i)}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {cell}
      </div>
    ));
  }

  // function that checks result after each move
  function checkWinner(board) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setStyleWinners(condition);
        return board[a]; // Return mark that is on this position
      }
    }

    if (board.every((cell) => cell !== "")) {
      return "tie"; // If every cell is occupied and not found any win condition there is a tie
    }

    return null; // Game is still ongoing
  }

  // function that check who's turn is it
  function whosTurn() {
    if (currentPlayer === "x") {
      return xTurn;
    } else {
      return oTurn;
    }
  }

  // Ask to restart component
  function AskToRestart() {
    return (
      <section className="restart-popup">
        <h1 className="no-won">Restart Game?</h1>
        <div className="result-buttons">
          <button
            className="quit--button"
            onClick={() => setShowRestart(false)}
          >
            No, cancel
          </button>
          <button className="next-round--button" onClick={restartGame}>
            Yes, restart
          </button>
        </div>
      </section>
    );
  }

  // function that restarts the game
  function restartGame() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("x");
    setGameResult("ongoing");
    setShowRestart(false);
    setIsComputerTurn(props.player === "x" ? false : true);
  }

  return (
    <section className="board-page">
      <section
        className={`board ${
          gameResult !== "ongoing" || showRestart ? "overlay" : ""
        }`}
      >
        <header>
          <img alt="App Logo" className="app--logo" src={logo} />
          <div className="current-turn">
            <img
              alt="Current Player"
              className="current-player--img"
              src={whosTurn()}
            />
            <h4>Turn</h4>
          </div>
          <button
            onClick={() => setShowRestart(true)}
            className="restart-game--button"
          ></button>
        </header>
        <div className="board--grid">
          <BoardFields />
        </div>
        <div className="scores">
          <div className="score score--x">
            <p>
              X (
              {props.player === "x" && !props.CPU
                ? "Player 1"
                : props.player === "x" && props.CPU
                ? "You"
                : props.CPU
                ? "CPU"
                : "Player 2"}
              )
            </p>
            <h2>{score.xWins}</h2>
          </div>
          <div className="score score-ties">
            <p>Ties</p>
            <h2>{score.ties}</h2>
          </div>
          <div className="score score--o">
            <p>
              O (
              {props.player === "o" && !props.CPU
                ? "Player 1"
                : props.player === "o" && props.CPU
                ? "You"
                : props.CPU
                ? "CPU"
                : "Player 2"}
              )
            </p>
            <h2>{score.oWins}</h2>
          </div>
        </div>
      </section>
      <section className="popups">
        {gameResult !== "ongoing" && <Result />}
        {showRestart && <AskToRestart />}
      </section>
    </section>
  );
}
