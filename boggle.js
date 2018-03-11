'use strict'

class Boggle {
	constructor(words,length) {
		this.words = words;
		this.length = length || 5;
		this.alphabet='abcdefghijklmnopqrstuvwxyz';
		this.boardWords = this.board();
	}

	board() {
		var arrBoard=[];
		for(var i=0;i<this.length;i++){
			arrBoard.push([]);
			for(var j=0;j<this.length;j++){
				arrBoard[i].push(this.alphabet[Math.floor(Math.random() * this.alphabet.length)]);
			}
		}
		return arrBoard;
	}

	matchWords(){
    var fixWords=[]
    for (var i = 0; i < this.words.length; i++) {
      if(this.foundWord(this.words[i])) {
        fixWords.push(this.words[i])
      }
    }
		let uniqueArray = fixWords.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
		})
    if(uniqueArray.length>0){
      return 'Matching Word : '+uniqueArray;
    }
    else{
      return 'Matching Word : Not Found';
    }
  }


	foundWord(input) {
		let index = {};
		let arrFirst = []

		for (let i = 0; i < this.boardWords.length; i++) {
			for (let j = 0; j < this.boardWords.length; j++) {
				if(this.boardWords[i][j]===input[0]){
					index['row']=i
					index['col']=j
					arrFirst.push(index)

				}
			}
		}
		let uniqueIndex = arrFirst.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
		})

		if(uniqueIndex.length>0){
			for (var i = 0; i < uniqueIndex.length; i++) {
				if(!this.checkAround(input,uniqueIndex[i])){
					 return false
				}
			}
		}
		else{
			return false
		}

    return true
	}

	checkAround(input, index) {
		if (input.length == 0) {
			return true
		}
		if (!this.checkLimit(input[0], index)) {
			return false
		}
    //atas
    if(this.checkAround(input.slice(1),{row: index.row-1,col: index.col})) {
			return true
		}
    //atas kanan
    if(this.checkAround(input.slice(1),{row: index.row-1,col: index.col+1})) {
			return true
		}
    //atas kiri
    if(this.checkAround(input.slice(1),{row: index.row-1,col: index.col-1})) {
			return true
		}
    //bawah
    if(this.checkAround(input.slice(1),{row: index.row+1,col: index.col})) {
			return true
		}
    // bawah kanan
    if(this.checkAround(input.slice(1),{row: index.row+1,col: index.col+1})) {
			return true
		}
    //bawah kiri
    if(this.checkAround(input.slice(1),{row: index.row+1,col: index.col-1})) {
			return true
		}
    //kanan
    if(this.checkAround(input.slice(1),{row: index.row,col: index.col+1})) {
			return true
		}
    //kiri
    if(this.checkAround(input.slice(1),{row: index.row,col: index.col-1})) {
			return true
		}
		return false;
	}

	checkLimit(input,index) {
		if (index.row < this.length && index.col < this.length && index.row >= 0 && index.col >= 0 && this.boardWords[index.row][index.col] == input)
				{
	  			return true;
	  		}
	  return false;
	}

	printBoard() {
		return this.boardWords
	}
}

var fs = require('fs')
var words = fs.readFileSync('./kamusdata.txt')
  .toString()
  .split(",")
const args = process.argv;;
var newBoggle = new Boggle(words,args[2]);
console.log(newBoggle.printBoard());
console.log(newBoggle.matchWords());
