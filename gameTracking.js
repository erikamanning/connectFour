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

function clearArray(){

    for(let y=0; y<HEIGHT; y++){
  
      board.pop();
    }
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
