var kata = require("./data.js");

//console.log(words);
//var kata = [ 'AT', 'AX', 'GLADE', 'HOME', 'IS', 'OF', 'TEA' ]
function generateBox(rowCol){
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var boggleBox = []
  for(var i =0;i<rowCol;i++){
    var fill = []
    for(var j =0;j<rowCol;j++){
      var random = Math.floor(Math.random() * 26);
      fill.push(char[random])
    }
    boggleBox.push(fill);
  }
  return boggleBox
}

function boggleSolve(words,boggleBox){
  //return {words: words,box: boggleBox}
  let resultWord =[]
  let resultPos = []
  let countFound = 0;
  inner :
  for(var i = 0; i<words.length;i++){
    let found = [];
    var status0 = false
    var len = words[i].length
    var out = false
    outer :
    for(j =0; j< len; j++){
      console.log(j)
      //cari huruf awal
      let pos = [];
      if(j === 0){
        outer2:
        for(var k = 0; k<boggleBox.length;k++){
          for(var l = 0; l<boggleBox.length;l++){
              if(words[i][0] === boggleBox[k][l]){
                  found.push(words[i][j])
                  pos.push(k,l)
                  resultPos.push(pos)
                  status0 = true;
                  j++
                  break outer2;
              }
          }
        }
      }
      if(status0 === false){
        i++
        break outer
      }else{
  if((checkBoggle(pos[0],pos[1],words[i][j],boggleBox)) === true){
    found.push(words[i][j])
   j++;
  }
      }
    }
    console.log(found)
    if(found.join('') === words[i]){
      resultWord.push(words[i]);
      countFound ++
    }
  }
  return {found: countFound, kata: resultWord}
}


function checkBoggle(row,col,letter,box){
  let rowKiri = row-1;
  let rowKanan = row +1;
  let colBawah = col-1;
  let colAtas = col+1;
  //let words = newWords;


    if(rowKiri<0){
      rowKiri = row;
    }
    else if(rowKanan>box.length-1){
      rowKanan = row;
    }
    if(colBawah<0){
      colBawah = col;
    }
    else if(colAtas>box.length-1){
      colAtas = col;
    }

    for(let m = rowKiri; m <= rowKanan; m++){

      for(let n = colBawah; n <= colAtas; n++){

          if(letter === box[m][n]){
            return true
          }
      }
    }
    return false
}
var kotak = generateBox(5)

console.log(kotak)
console.log(boggleSolve(kata,kotak));
