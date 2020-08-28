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
          removeLetterColors(letters);
          loadStaticColors("multi",letters);
          splashColors();
  
        },750)
      }
    }, 100);
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
      removeLetterColors(letters);
      loadStaticColors(color,letters);    
    } 
}
function tieSplash(){

  const gameCells = document.querySelectorAll(".gameCell");
  let color;
  
  let i=0;

  removeTitle();
  addDrawTitle();

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