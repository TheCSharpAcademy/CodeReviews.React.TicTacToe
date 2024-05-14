# Frontend Mentor - Tic Tac Toe solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person
- **TODO 1**: Save the game state in the browser so that it’s preserved if the player refreshes their browser
- **TODO 2**: Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win

### Screenshots

![](/main-menu-ss.png)
![](/board-ss.png)
![](/result-ss.png)

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/react-tictactoe-game-CQJoQfX2Fr]
- Live Site URL: [https://bbualdo-tictactoe-app.netlify.app]

## My process

1. Created the envoirment with Vite, builded Components and rendered them on the page.
2. Styled components without Mobile First approach, because there was no need, the layout stays the same, only widths, heights and font-sizes changes.
3. Added a ```currentPage``` state in App component. It handles onClick to change the page from Menu to Board.
4. Added styled ````chooseMark``` logic that asigns chosen mark to ```player1```.
5. Added ```currentPlayer``` state that helps changing the turn and displaying it in turn div on the player's move.
6. Added win conditions ```gameResult``` state that helps keep track of current game status: Win/Tie/ongoing.
7. Styled moves to show appropiate mark on the board field.
8. Added ```restartGame``` that immediately resets the board after reset button click.
9. Added ```hoveredCell``` state that indicates which field is hovered and shows outline image of current mark in a turn.
10. Added ```score``` state as an object of X and O wins and ties, which helps keep track of player score are renders it in proper containers at the bottom of the screen.
11. Conditionally rendered result overlay with proper messages and buttons to try again or quit to menu.
12. Replaced immediate restart on restart button with ```showRestart``` state that if true, renders ```AskToRestart``` component that is a popup with 2 buttons to decide if player wants to restart or cancel it.
13. Updated information which player is 1 and which is 2 in the score containers.
14. Added logic that rest of the page is darker when any popup (Restart/Result) appears.
15. Styled fields on the board that includes winner sequence with ```.reduce()``` method.
16. Added ```computer``` state which is true or false depending on which button in menu is clicked.
17. Added random CPU logic that takes random empty board field and make a move.
18. Some fixes, improvements and styling for mobile devices.

### Built with
- [React](https://reactjs.org/) - JS library
- Vite
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### What I learned

- Using ```Array[number].fill()``` method
- Mastered Conditional Rendering
- Got a harder grip on States

### Continued development

I'm still begginner in React, but have a solid foundation in JS, so most of React's features are clear for me. But I still have to master Arrays methods, because I see that it is really important in React Development, and I'm gonna get more attention useEffect. 
I have to consider add some style classes at the beggining to reuse them later, to speed up my styling proccess.
I also want to learn one of the CSS preprocessors to make my styling faster and more clear.

### Useful resources

I found **ChatGPT** as very useful learning tool. When I stuck somewhere for a long time or knew what to do, but didn't know how to do it, it was really helpful.

## Author

- GitHub - [BBualdo](https://github.com/BBualdo/)
- Frontend Mentor - [@BBualdo](https://www.frontendmentor.io/profile/BBualdo)