var fs = require('fs');
eval(fs.readFileSync('data.js')+'');
// variable words

//building the board
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shake(row, col){
  let rows = [];
  for (let i = 0; i < row; i++) {
    let cols = [];
    for (let j = 0; j < col; j++) {
      let randomAlphabet = String.fromCharCode(getRandomInt(65 , 91))
      cols.push(randomAlphabet);
    }
    rows.push(cols)
  }
  return rows;
}

var board = shake(4, 6)
console.log(board);


var result = [];

var rowsLength = board.length;
var colsLength = board[0].length;

//checking if its a word inside dictionary
function isWord(str){
  if (words.indexOf(str) === -1) {
    return false
  }else{
    return true;
  }
}

//checking if its a valid coordinate
function checkValid(coordinates, row, col){
  if(checkOriginalLocation(coordinates, row, col) && checkBorder(row, col)){
    return true;
  }
  return false;
}

//if the location visited before or not
function checkOriginalLocation(coordinates, row, col){
  if (coordinates.indexOf(""+row+col) === -1){
    return true;
  }
  return false;
}

//if the coordinate still inside the board
function checkBorder(row, col){
  if(row > -1 && row < rowsLength && col > -1 && col < colsLength){
    return true;
  }
  return false;
}

//generate new locations
function generateNewLocations(rows, cols, row, col){
      let newLocations = [];
      let newRows = rows;
      let newCols = cols;
      newRows.push(row);
      newCols.push(col);
      newLocations.push(newRows);
      newLocations.push(newCols);

      return newLocations;
}

function boggle(locations){
  let word = "";
  let rows = locations[0]
  let cols = locations[1]
  let coordinates = []

  //forming complete coordinate from rows and cols
  for (var i = 0; i < rows.length; i++) {
    coordinates.push(""+rows[i]+cols[i])
  }

  //forming the word
  for (var i = 0; i < locations[0].length; i++) {
    word += board[rows[i]][cols[i]]
  }
  //check if the formed word is inside dictionary
  if (isWord(word) && result.indexOf(word) === -1) {
    result.push(word)
  }

  //current coordinate
  var row = rows[rows.length-1]
  var col = cols[cols.length-1]

  //NORTH
  let northRow = row-1
  let northCol = col
  if(checkValid(coordinates, northRow, northCol)){
      boggle(generateNewLocations(rows, cols, northRow, northCol))
  }

  //NORTHEAST
  let northEastRow = row-1
  let northEastCol = col+1
  if(checkValid(coordinates, northEastRow, northEastCol)){
    boggle(generateNewLocations(rows, cols, northEastRow, northEastCol))
  }

  //EAST
  let eastRow = row
  let eastCol = col+1
  if (checkValid(coordinates, eastRow, eastCol)) {
    boggle(generateNewLocations(rows, cols, eastRow, eastCol))
  }

  //SOUTHEAST
  let southEastRow = row+1
  let southEastCol = col+1
  if(checkValid(coordinates, southEastRow, southEastCol)){
    boggle(generateNewLocations(rows, cols, southEastRow, southEastCol))
  }

  //SOUTH
  let southRow = row+1
  let southCol = col
  if(checkValid(coordinates, southRow, southCol)){
    boggle(generateNewLocations(rows, cols, southRow, southCol))
  }

  //SOUTHWEST
  let southWestRow = row+1
  let southWestCol = col-1
  if(checkValid(coordinates, southWestRow, southWestCol)){
    boggle(generateNewLocations(rows, cols, southWestRow, southWestCol))
  }

  //WEST
  let westRow = row
  let westCol = col-1
  if(checkValid(coordinates, westRow, westCol)){
    boggle(generateNewLocations(rows, cols, westRow, westCol))
  }

  //NORTHWEST
  let northWestRow = row-1
  let northWestCol = col-1
  if(checkValid(coordinates, northWestRow, northWestCol)){
    boggle(generateNewLocations(rows, cols, northWestRow, northWestCol))
  }
}

function main(){
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var rows = [];
      var cols = [];
      var locations = [];
      rows.push(i);
      cols.push(j);
      locations.push(rows)
      locations.push(cols)
      boggle(locations)
    }
  }
}

main()
console.log("===============================================");
console.log(result)
