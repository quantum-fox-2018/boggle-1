
var fs = require('fs');
eval(fs.readFileSync('data.js')+'');

class BoggleBoard {
  constructor(row, col){
    this.board = shake(row, col)
    this.results = []
    this.rowsLength = this.board.length;
    this.colsLength = this.board[0].length;

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
  }

  //if its a valid word in data.js
  isWord(str){
    if (words.indexOf(str) === -1) {
      return false
    }else{
      return true;
    }
  }

  //checking if its a valid coordinate
  checkValid(coordinates, row, col){
    if(this.checkOriginalLocation(coordinates, row, col) && this.checkBorder(row, col)){
      return true;
    }
    return false;
  }

  //if the location visited before or not
  checkOriginalLocation(coordinates, row, col){
    if (coordinates.indexOf(""+row+col) === -1){
      return true;
    }
    return false;
  }

  //if the coordinate still inside the board
  checkBorder(row, col){
    if(row > -1 && row < this.rowsLength && col > -1 && col < this.colsLength){
      return true;
    }
    return false;
  }

  //generate new locations
  generateNewLocations(rows, cols, row, col){
        let newLocations = [];
        let newRows = rows;
        let newCols = cols;
        newRows.push(row);
        newCols.push(col);
        newLocations.push(newRows);
        newLocations.push(newCols);

        return newLocations;
  }

  main(){
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        var rows = [];
        var cols = [];
        var locations = [];
        rows.push(i);
        cols.push(j);
        locations.push(rows)
        locations.push(cols)
        this.boggle(locations)
      }
    }
    return this.results
  }

  boggle(locations){
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
      word += this.board[rows[i]][cols[i]]
    }
    //check if the formed word is inside dictionary
    if (this.isWord(word) && this.results.indexOf(word) === -1) {
      this.results.push(word)
    }

    //current coordinate
    let row = rows[rows.length-1]
    let col = cols[cols.length-1]

    //NORTH
    let northRow = row-1
    let northCol = col
    if(this.checkValid(coordinates, northRow, northCol)){
        this.boggle(this.generateNewLocations(rows, cols, northRow, northCol))
    }

    //NORTHEAST
    let northEastRow = row-1
    let northEastCol = col+1
    if(this.checkValid(coordinates, northEastRow, northEastCol)){
      this.boggle(this.generateNewLocations(rows, cols, northEastRow, northEastCol))
    }

    //EAST
    let eastRow = row
    let eastCol = col+1
    if (this.checkValid(coordinates, eastRow, eastCol)) {
      this.boggle(this.generateNewLocations(rows, cols, eastRow, eastCol))
    }

    //SOUTHEAST
    let southEastRow = row+1
    let southEastCol = col+1
    if(this.checkValid(coordinates, southEastRow, southEastCol)){
      this.boggle(this.generateNewLocations(rows, cols, southEastRow, southEastCol))
    }

    //SOUTH
    let southRow = row+1
    let southCol = col
    if(this.checkValid(coordinates, southRow, southCol)){
      this.boggle(this.generateNewLocations(rows, cols, southRow, southCol))
    }

    //SOUTHWEST
    let southWestRow = row+1
    let southWestCol = col-1
    if(this.checkValid(coordinates, southWestRow, southWestCol)){
      this.boggle(this.generateNewLocations(rows, cols, southWestRow, southWestCol))
    }

    //WEST
    let westRow = row
    let westCol = col-1
    if(this.checkValid(coordinates, westRow, westCol)){
      this.boggle(this.generateNewLocations(rows, cols, westRow, westCol))
    }

    //NORTHWEST
    let northWestRow = row-1
    let northWestCol = col-1
    if(this.checkValid(coordinates, northWestRow, northWestCol)){
      this.boggle(this.generateNewLocations(rows, cols, northWestRow, northWestCol))
    }
  }
}

function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function play(){
  var row = parseInt(document.getElementById("row").value)
  var col = parseInt(document.getElementById("col").value)
  if(!row){
    row = randomize(1,11)
  }
  if(!col){
    col = randomize(1,11)
  }

  var game = new BoggleBoard(row, col)
  var result = game.main()
  var str = result.join(" ")

  document.getElementById("boggle_board").innerHTML = str;
}
