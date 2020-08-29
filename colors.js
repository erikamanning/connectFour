/*************************************************************************** 

                                    Color Changing Functions

***************************************************************************/
// loads multi/or single colors for title letters
function loadStaticLetterColors(letters,colorKey){

  let color;  
  
  for(let i =0; i<letters.length; i++){

    if(colorKey === 'multi'){

      color = getRedOrBlue(i%2)
    }
    else{

      color = colorKey;
    }

    letters[i].classList.add(color);
  }
}
// removes colors from letters arrs passed in
function removeLetterColors(letters){

  for(letter of letters){

    if(letter.classList.contains("Red")){

      letter.classList.remove("Red");
    }
    if(letter.classList.contains("Blue")){

      letter.classList.remove("Blue");
    }
  }
}

// fills color half red half blue for DRAW
function drawBoardFill(){

  let currentColor;

  for(let i=0; i<gameCells.length;i++){
    if(i<21){

      currentColor = "player2";
      const piece = createGamePiece(currentColor);
      gameCells[i].append(piece);
    }
    else{

      currentColor = 'player1';
      const piece = createGamePiece(currentColor);
      gameCells[i].append(piece);
    }
  }
}
// fills board with one color passed in
function fillBoardSolid(color){

  for(let i=0; i<gameCells.length; i++){

    currentColor = 'player1';
    const piece = createGamePiece(color);
    gameCells[i].append(piece);
  }
}

// fills board with pieces based on passed in configuration
function fillBoard(fillConfig){

  if(fillConfig === "draw"){

    drawBoardFill();
  }
  else if(fillConfig=== 'Red'){

    fillBoardSolid('player1');
  }
  else if(fillConfig === 'Blue'){

    fillBoardSolid('player2');
  }
}
/// splash screen and HTML board populate for win
function winSplash(winnerColor,winner){

  const color = winner==="player1" ? red:blue;
  const winnerHeading = makeTitleH1(winnerColor,"letter","connect");
  const winsText = makeTitleH1("Wins","letter","four");
  headerDiv.prepend(winnerHeading);
  headerDiv.prepend(winsText);

  fillBoard(winnerColor);

  removeLetterColors(CONNECT.children);
  removeLetterColors(FOUR.children);
  loadStaticLetterColors(winnerHeading.children,color);    
  loadStaticLetterColors(winsText.children,color); 
}
// splash screen and HTML board populate for tie
function tieSplash(){
  
  const drawTitle = makeTitleH1("Draw","letter","drawText");
  headerDiv.prepend(drawTitle);
  loadStaticLetterColors(drawTitle.children,"multi");

  fillBoard("draw");

}