function connectAnimation(letters,firstColor,secondColor){
  
    console.log("Letters: ",letters);
    let i=0;  
    
    connectAnimationStopper = setInterval(()=>{
  
      if(i%2===0){
  
          letters[i].classList.add(firstColor);
      }  
      else{
  
        letters[i].classList.add(secondColor);
      }
  
      i++;
      if(i==letters.length){
  
        clearInterval(connectAnimationStopper);
  
        setTimeout(()=>{
  
          console.log("FOUR: ",FOUR);
          fourAnimation(FOUR.children,secondColor);
        },250);
        
      }
  
    },350);   
}

function fourAnimation(letters,winner){

    let i=0;
  
    fourAnimationStopper = setInterval(()=>{
  
      letters[i].classList.add(winner);
      letters[i].classList.remove("outline");
      letters[i].classList.add("glow");
      
      i++;
  
      if(i==letters.length){
  
        clearInterval(fourAnimationStopper);
  
        setTimeout(()=>{
  
          clearInterval(fourAnimationStopper);
          removeLetterColors(letters);
          loadStaticColors("multi",letters);
          splashColors(document.querySelectorAll(".letter"));
  
        },750)
      }
    }, 100);
}

function splashColors(letters){

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

function clearLetterColors(){

    for(let i =0; i<letters.length; i++){
      letters[i].classList.remove(...letters[i].classList);
      letters[i].classList.add("letter");
      
    }
}

function removeLetterColors(letters){

  for(letter of letters){

    if(letter.classList.contains("red")){
      letter.classList.remove("red");
    }
    if(letter.classList.contains("blue")){

      letter.classList.remove("blue");
    }
  }
}

function loadStaticColors(colorKey,letters){

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

function winSplash(winner,letters){

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
      removeLetterColors(letters);
      loadStaticColors(color,letters);    
    } 
}
function tieSplash(){

  const gameCells = document.querySelectorAll(".gameCell");
  let color;
  
  let i=0;

  const drawTitle = makeTitleH1("Draw","letter","drawText");
  headerDiv.prepend(drawTitle);
  loadStaticColors("multi",drawTitle.children);

  tieSplashStopper = setInterval(()=>{

    const piece = document.createElement("div");
    piece.classList.add("piece");
    if(i<21){
      color = 'player2'
    }
    else color = 'player1';
    piece.classList.add(color); 
    gameCells[i].append(piece);
    i++;

    if(i=== HEIGHT*WIDTH){

      clearInterval(tieSplashStopper);
    }

  },50);
}