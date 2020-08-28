function addRestartButton(){

    const buttonPanel = document.querySelector("#buttonPanel");
    const startButton = document.createElement("button");
    const h1 = document.querySelector('h1');
    
    
    startButton.innerText = "RESTART";
  
    startButton.addEventListener("click",(event) => {
  
      stopAllIntervals();
      clearLetterColors();
      clearBoard();
      clearArray();
      h1.remove();

      

      addTitle("Connect Four","letter","#connectFourText");
      makeBoard();
      
  
  
      if(startColor == red){
        startColor=blue;
        winColor = red;
      }
      else{
        startColor=red;
        winColor = blue;
      }
  
      connectAnimation(startColor,winColor);
      gameCounter++;
  
    });
  
    buttonPanel.append(startButton);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {

  const titleLetters = document.querySelectorAll("#connectFourText")

    stopAllIntervals();
    //loadStaticColors('multi',letters);
  
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
  
      winSplash(`player${currPlayer}`,titleLetters);
      endGame(`Player ${currPlayer} won!`);
    }
  
    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if(board.every(cell => cell.every(val => val===1 || val ===2 ? true:false))){
  
      // clearBoard();
      // tieSplash();
      endGame("It\'s a tie!");
    }
  
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2:1;
  
    // clear splash colors
    clearInterval(splashInterval);    
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    let col = 0;
    const columnBottomSpot = document.getElementById(`${HEIGHT-1}-${x}`)
    const columnTopSpot = document.getElementById(`${0}-${x}`);
  
    if(!columnTopSpot.firstElementChild){
  
      if(!columnBottomSpot.firstElementChild){
  
        col = HEIGHT-1;
      }
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

function stopAllIntervals(){
  
    clearInterval(splashInterval);
    clearInterval(connectAnimationStopper);
    clearInterval(fourAnimationStopper);
}

function getRedOrBlue(val){

    return val ===1 ? "red":"blue";
}

function winHandler(){

}

const tieButton = document.querySelector("#tiebutton");
tieButton.addEventListener("click", (event)=>{

  clearBoard();
  clearH1s();

  tieSplash();

});