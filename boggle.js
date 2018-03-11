var dictionaryExample = ['RAMA','DIAN','SYAH','APPLE','BUDI','SUPER','KEY','ABI','SUSU','MOS','BURGER','MINUM'];
//Kamus dan rowcolumn generate
solveBoggle(dictionaryExample,10,10);

//Fungsi untuk membuat board boggle
function shake(rowBoard,columnBoard){
  var boggleBoard = [];
  const hurufAbjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   for(let i=0;i<rowBoard;i++){
     boggleBoard.push([]);
     for(let j=0;j<columnBoard;j++){
       boggleBoard[i].push(hurufAbjad[Math.floor(Math.random()*Math.floor(26))]);
     }
   }
   return boggleBoard;
}


//Fungsi untuk mencari kata boggle
function solveBoggle(dictionaryExample,rowBoard,columnBoard){

  let boggleBoard = shake(rowBoard,columnBoard);
  let boggleWords = [];

  for(var counter=0;counter<dictionaryExample.length;counter++){

    for(let i=0;i<boggleBoard.length;i++){

      var solveBoard = boggleBoard;

      for(let j=0;j<boggleBoard.length;j++){
        if(solveBoard[i][j] == dictionaryExample[counter][0]){

          var coordinateX = i;
          var coordinateY = j;
          solveBoard[i][j] = ' ';
          var newWords = dictionaryExample[counter].slice(1);
          var checkCondition = checkBoggle(coordinateX,coordinateY,newWords,solveBoard)

          if(checkCondition == true){
            solveBoard[i][j] = dictionaryExample[counter][0];
            boggleWords.push(dictionaryExample[counter]);
            break;
          }
          else if(checkCondition == false){
            solveBoard[coordinateX][coordinateY] = dictionaryExample[counter][0];
          }
        }
      }

      if(checkCondition == true){
        solveBoard = boggleBoard;
        break;
      }
    }
  }

  console.log(boggleBoard);
  if(boggleWords.length>0){
    console.log(boggleWords.length +  ' words found : ');
    for(let i=0;i<boggleWords.length;i++){
      console.log(boggleWords[i]);
    }
  }
  else{
    console.log('No words found!');
  }
}

//Fungsi untuk mengecek apakah kamus tersebut ada apa tidak
function checkBoggle(coordinateX,coordinateY,newWords,solveBoard){

  let batasBawahX = coordinateX-1;
  let batasAtasX = coordinateX +1;
  let batasBawahY = coordinateY-1;
  let batasAtasY = coordinateY+1;
  let words = newWords;

  if(newWords.length > 0){

    if(batasBawahX<0){
      batasBawahX =coordinateX;
    }
    else if(batasAtasX>solveBoard.length-1){
      batasAtasX = coordinateX;
    }
    if(batasBawahY<0){
      batasBawahY = coordinateY;
    }
    else if(batasAtasY>solveBoard.length-1){
      batasAtasY = coordinateY;
    }

    for(let i=batasBawahX;i<=batasAtasX;i++){

      for(let j=batasBawahY;j<=batasAtasY;j++){

          if(newWords[0] == solveBoard[i][j]){
            let coordinateX = i;
            let coordinateY = j;
            solveBoard[i][j] = ' ';
            let newWords = words.slice(1);

            let checkCondition = checkBoggle(coordinateX,coordinateY,newWords,solveBoard);

            if(checkCondition == true){
              solveBoard[coordinateX][coordinateY] = words[0];
              return true;
            }
            else if(checkCondition == false){
              solveBoard[i][j] = words[0];
            }
          }
      }
    }
  }

  else{
    return true;
  }

  checkCondition = false;
  return checkCondition

}
