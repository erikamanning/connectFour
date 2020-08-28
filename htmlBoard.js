
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
    const piece = document.createElement("div");
    piece.classList.add("piece",`player${currPlayer}`);
    const currentSquare = document.getElementById(`${y}-${x}`);
    currentSquare.append(piece);
  }

function clearBoard(){

    const gameCells = document.querySelectorAll(".gameCell");
  
    for(let cell of gameCells){
  
      if(cell.childElementCount >0){
  
        cell.firstElementChild.remove();
      }
    }
}

function removeTitle(){

  document.querySelector("h1").remove();

}

function addDrawTitle(){

  const newH1 = document.createElement("h1");
  const drawText = "DRAW!";
  let i=0;

  const spans = [];

  for(let i=0; i<5; i++){

    spans.push(document.createElement("span"));
    spans[i].classList.add("letter","draw");
  }
  for(let char of drawText){

    spans[i].innerText = char;
    newH1.append(spans[i]);
    i++;
  }
  
  document.body.prepend(newH1);

  loadStaticColors("multi",spans);

}

/*

<h1>
  <span class="letter outline">C</span>
  <span class="letter outline">o</span>
  <span class="letter outline">n</span>
  <span class="letter outline">n</span>
  <span class="letter outline">e</span>
  <span class="letter outline">c</span>
  <span class="letter outline">t</span> 
  <span class="letter outline">F</span>
  <span class="letter outline">o</span>
  <span class="letter outline">u</span>
  <span class="letter outline">r</span>
</h1>

*/