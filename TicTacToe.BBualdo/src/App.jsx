import React from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";

export default function App() {
  const [player1, setPlayer1] = React.useState('x');
  const [computer, setComputer] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('menu');

// function to change player related on mark
  function chooseMark(mark) {
    setPlayer1(mark);
  }

// function to change the page to board
  function togglePage() {
    setCurrentPage(prevPage => {
      if (prevPage === 'menu') {
        return 'board'
      } else {
        return 'menu'
      }
    })
  }
  // changes CPU to true (ON) or false (OFF)
  function setCPU(bool) {
    setComputer(bool)
  }
  
// function to render the page with updated props
  function renderPage() {
    if (currentPage === 'menu') {
      return (
        <Menu 
          togglePage={togglePage}
          chooseMark={chooseMark}
          player={player1}
          CPU={computer}
          setCPU={setCPU}
        />
      )
    } else {
      return <Board 
          togglePage={togglePage}
          player={player1}
          CPU={computer}
      />
    }
  }

  return (
    <main>
      {renderPage()}
    </main>
  )
}