/*************************************************************************** 

                                    Core Game Functionality

***************************************************************************/

function addRestartButton(){

  // add button div and clss
  const buttonDiv1 = document.createElement("div");
  buttonDiv1.classList.add("buttonDiv");

  // adds html button, id, and text
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.innerText = "RESTART";

  // appends button to button div, and button div to button panel
  buttonDiv1.append(restartButton);
  buttonPanel.append(buttonDiv1);

  // functionality for if restart button is clicked
  restartButton.addEventListener("click",() => {

    gameWon=false;

    clearGameHandler();

    // adds main title text back
    headerDiv.prepend(FOUR);
    headerDiv.prepend(CONNECT);

    // adds title colors
    loadStaticLetterColors(document.querySelectorAll(".letter"),"multi");

    // loads blank board data double array
    makeBoard();

  });  
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {

  if(!gameWon){

    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);
    board[y][x] =currPlayer;
  
    // check for win
    if (checkForWin()) {
      gameWon = true;

      setTimeout(()=>{

        // printing opposite player for some reason, leaving quick fix for now
        winner = currPlayer===1 ? 2:1;
        winningColor = currPlayer===1 ? "Blue":"Red";
        clearGameHandler();
        winSplash(winningColor,`player${winner}`);
        endGame(`Player ${currPlayer} won!`);

      },100);
    }
  
    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if(board.every(cell => cell.every(val => val===1 || val ===2 ? true:false))){
  
      clearGameHandler();
      tieSplash();
      endGame("It\'s a tie!");
    }
  
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2:1;
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {

  // TODO: write the real version of this, rather than always returning 0
  let col = 0;
  const columnBottomSpot = document.getElementById(`${HEIGHT-1}-${x}`)
  const columnTopSpot = document.getElementById(`${0}-${x}`);

  // makes sure column is not full
  if(!columnTopSpot.firstElementChild){

    // checks if bottom spot if free
    if(!columnBottomSpot.firstElementChild){

      col = HEIGHT-1;
    }
    // otherwise fills the first free spot from the bottom
    else{

      for(let j=0; j<HEIGHT-1; j++){

        const selectedSquare = document.getElementById(`${j}-${x}`);
        const nextSquare = document.getElementById(`${j+1}-${x}`);

        if(!selectedSquare.firstElementChild && nextSquare.firstElementChild){

          col = j;
        }
      }
    }
  }
  else{

    col = null;
  }

  return col;
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  console.log(msg);
}

// gets a red or blue value depending on what is passed in
function getRedOrBlue(val){

  return val ===1 ? "Red":"Blue";
}

function clearGameHandler(){

  // clear tracking board and actual game board
    //r emove title text colors
  removeLetterColors(document.querySelectorAll(".letter"));
  removeLetterColors(FOUR.children);
  removeLetterColors(CONNECT.children);

  // clear tracking board and actual game board
  //remove title text
  clearBoard();
  clearArray();
  clearH1s();

}
function addTieButton(){

  // create button div and add class
  const buttonDiv2 = document.createElement("div");
  buttonDiv2.classList.add("buttonDiv");

  // create tie button and add id/inner text
  const tieButton = document.createElement("button");
  tieButton.id = "tieButton";
  tieButton.innerText = 'Show Tie!';

  // append pieces
  buttonDiv2.append(tieButton);
  buttonPanel.append(buttonDiv2);

  // add click listener
  tieButton.addEventListener("click", (event)=>{

    clearGameHandler()
    tieSplash();
    endGame("It\'s a tie!");
  });
}
