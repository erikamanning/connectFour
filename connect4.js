/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const letters = document.querySelectorAll(".letter");
const red ="red";
const blue = "blue";
let gameCounter = 0;
let splashInterval,connectAnimationStopper, fourAnimationStopper;
const topTextLength = 7;
const bottomTextLength = 4;
let winner;

let startColor =red;
let winColor = blue;

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  for(let y=0; y<HEIGHT; y++){

    board.push([]);

    for(let x=0; x<WIDTH;x++){

        board[y].push([]);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  // create clickable top row for dropping pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // add cells that make up game board and their ids
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.classList.add("gameCell");
      row.append(cell);
    }
    htmlBoard.append(row);
  }
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

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece",`player${currPlayer}`);
  const currentSquare = document.getElementById(`${y}-${x}`);
  currentSquare.append(piece);
  

}
/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  console.log(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {

  stopAllIntervals();
  loadStaticColors('multi',letters);

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

    winSplash(`player${currPlayer}`);
    endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(cell => cell.every(val => val===1 || val ===2 ? true:false))){

    endGame("It\'s a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2:1;

  // clear splash colors
  clearInterval(splashInterval);
  
}

function winHandler(){

}
function winSplash(winner){

  const gameCells = document.querySelectorAll(".gameCell");
  const color = winner==="player1" ? red:blue;
  //console.log(gameCells);

  for(let gameCell of gameCells){

    const piece = document.createElement("div");
    piece.classList.add("piece",winner);

    if(gameCell.childElementCount>0){
      gameCell.firstElementChild.remove();
    }

    gameCell.append(piece);
    //console.log(gameCell);
    loadStaticColors(color,letters);    
  } 
}

function clearData(){

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
        
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // iterate over all cells data horizontally first then moving vertically
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // outlines possible win configurations on the board relative to a starting y,x position
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // checks to see if any above win conditions apply with the current x,y position 
         // and does this for every position on the whole game board 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function getRedOrBlue(val){

  return val ===1 ? "red":"blue";
}

function loadStaticColors(colorKey,letters){

  let color;  
//console.log("color key: ",colorKey);
    for(let i =0; i<letters.length; i++){
      letters[i].classList.remove(...letters[i].classList);
      letters[i].classList.add("letter");
      if(colorKey === 'multi'){

          color = getRedOrBlue(i%2)
      }
      else{

        color = colorKey;
      }

      letters[i].classList.add(color);
    }
}

function splashColors(){

  splashInterval = setInterval(()=>{

    for(let letter of letters){

        if(letter.classList.contains("red")){

          letter.classList.add("blue");
          letter.classList.remove("red");
        }
        else{
        
          letter.classList.add("red");
          letter.classList.remove("blue");
        }
    }
  },500);
}

function connectAnimation(winner,loser){
  
  const endColor = winner;
  const startColor = loser;
  let i=0;  
  
  connectAnimationStopper = setInterval(()=>{

    if(i%2===0){

        letters[i].classList.add(startColor);
    }  
    else{

      letters[i].classList.add(endColor);
    }

    i++;
    if(i==topTextLength){

      clearInterval(connectAnimationStopper);

      setTimeout(()=>{

        fourAnimation(winner);
      },250);
      
    }

  },350);
  
}

function fourAnimation(winner){

  let i=0;

  fourAnimationStopper = setInterval(()=>{

    letters[i+7].classList.add(winner);
    letters[i+7].classList.remove("outline");
    letters[i+7].classList.add("glow");
    
    i++;

    if(i==bottomTextLength){

      clearInterval(fourAnimationStopper);

      setTimeout(()=>{

        clearInterval(fourAnimationStopper);
        loadStaticColors("multi",letters);
        splashColors();

      },750)
    }
  }, 100);

}

function addRestartButton(){

  const buttonPanel = document.querySelector("#buttonPanel");
  const startButton = document.createElement("button");
  
  startButton.innerText = "RESTART";

  startButton.addEventListener("click",(event) => {

    stopAllIntervals();
    clearLetterColors();
    clearBoard();
    clearArray();
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
function clearArray(){

  for(let y=0; y<HEIGHT; y++){

    board.pop();
  }
}

function clearBoard(){

  const gameCells = document.querySelectorAll(".gameCell");
  //console.log("Game Cells BEFORE clear() : ",gameCells);
  for(let cell of gameCells){

    if(cell.childElementCount >0){

      cell.firstElementChild.remove();
    }
  }
  //console.log("Game Cells AFTER clear() : ",gameCells);

}

function stopAllIntervals(){

  clearInterval(splashInterval);
  clearInterval(connectAnimationStopper);
  clearInterval(fourAnimationStopper);
}

function clearLetterColors(){

  for(let i =0; i<letters.length; i++){
    letters[i].classList.remove(...letters[i].classList);
    letters[i].classList.add("letter");
    
  }
}

connectAnimation(startColor,winColor);


makeBoard();
makeHtmlBoard();
addRestartButton();
