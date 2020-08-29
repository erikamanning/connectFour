/*************************************************************************** 

                          HTML Doc Editing Functions

***************************************************************************/

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

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  
  // TODO: make a div and insert into correct table cell
  const piece = createGamePiece(`player${currPlayer}`);
  const currentSquare = document.getElementById(`${y}-${x}`);
  currentSquare.append(piece);
}

// clears all pieces from game board
function clearBoard(){

  const gameCells = document.querySelectorAll(".gameCell");

  for(let cell of gameCells){

    if(cell.childElementCount >0){

      cell.firstElementChild.remove();
    }
  }
}

// makes a heading for the game, multiple configurations
function makeTitleH1(titleString,letterClass,position){

  const newH1 = document.createElement("h1");
  const spans = [];

  for(let i=0; i<titleString.length; i++){

    spans[i]=document.createElement("span");
    spans[i].classList.add("letter", letterClass,"outline");
    spans[i].innerText = titleString[i];

    newH1.append(spans[i]);
  }

  if(position === "connect"){

    newH1.classList.add("connect","titleText");
  }
  else if(position === "four"){
    newH1.classList.add("four","titleText");
  }
  else{

    newH1.classList.add("draw","outline");
  }

  return(newH1);
}

// removes all h1s from the game
function clearH1s(){

  allH1s = document.querySelectorAll("h1");

  for(let h1 of allH1s){

    h1.remove();
  } 
}

// creates a game piece and returns it
function createGamePiece(colorCode){

  const piece = document.createElement("div");
  piece.classList.add("piece", colorCode);

  return piece;
}
