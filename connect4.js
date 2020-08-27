/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

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
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {

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

    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(cell => cell.every(val => val===1 || val ===2 ? true:false))){

    endGame("It\'s a tie bitches!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2:1;
  
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

makeBoard();
makeHtmlBoard();
