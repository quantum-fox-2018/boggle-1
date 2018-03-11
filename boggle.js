class BoggleBoard {
  constructor(param_dictionary, param_length, param_test) {
    this.test = param_test;
    this.strDictionary = param_dictionary;
    this.boardLength = param_length;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  solve() {
    //let arrBoard = this.test;
    let arrBoard = this.shake();
    let arrWord = this.strDictionary.split(' ');
    let result;
    let solvedWords = [];
    console.log(arrWord.join(', '));
    console.log(arrBoard);

    for (let i = 0; i < arrWord.length; i++) {
      let word = arrWord[i];
      let wordStatus = this.checkWord(arrBoard, word);
      if (wordStatus === true) {
        solvedWords.push(word);
      }
    }

    result = `\n${solvedWords.length} word(s) found!`;
    for (let j = 0; j < solvedWords.length; j++) {
      result += `\n${solvedWords[j]}`;
    }

    return result
  }

  shake() {
    let arrBoard = [];

    for (let i = 0; i < this.boardLength; i++) {
      let arrRow = [];
      for (let j = 0; j < this.boardLength; j++) {
        let randomize = Math.floor(Math.random() * this.alphabet.length);
        arrRow.push(this.alphabet[randomize]);
      }
      arrBoard.push(arrRow);
    }
    return arrBoard;
  }

  checkWord(arrBoard, word) {
    for (let j = 0; j < arrBoard.length; j++) {
      for (let k = 0; k < arrBoard.length; k++) {
        if (word[0] === arrBoard[j][k]) {
          let row = j; let col = k;
          word = word.slice(1);
          let boggleStatus = this.checkBoggle(arrBoard, row, col, word);

          if (boggleStatus === true) {
            return true;
          }
        }
      }
    }
  }

  checkBoggle(arrBoard, row, col, word) {
    let row1 = row-1; let row2 = row+1;
    let col1 = col-1; let col2 = col+1;

    if (word.length > 0) {
      if (row1 < 0) {
        row1 = row;
      } else if (row2 > arrBoard.length) {
        row2 = row;
      }

      if (col1 < 0) {
        col1 = col;
      } else if (col2 > arrBoard.length) {
        col2 = col;
      }

      for (let i = row1; i < row2; i++) {
        for (let j = col1; j < col2; j++) {
          if(word[0] === arrBoard[i][j]) {
            let row = i; let col = j;
            word = word.slice(1);
            let boggleStatus = this.checkBoggle(arrBoard, row, col, word);

            if (boggleStatus === true) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    } else {
      return true;
    }
  }

}

// manual boggle board for testing purpose
// use shake method to generate random boggle board
var test = [
    ['T', 'A', 'W', 'F', 'U', 'G'],
    ['Y', 'J', 'J', 'V', 'R', 'X'],
    ['Z', 'L', 'I', 'O', 'H', 'E'],
    ['Y', 'C', 'S', 'S', 'R', 'M'],
    ['S', 'E', 'Z', 'T', 'B', 'H'],
    ['E', 'Y', 'E', 'Q', 'I', 'H']
  ];
var fs = require('fs');
var dictionary = fs.readFileSync('dictionary.txt').toString().split('\n')[0];
var length = 8; // the boggle board is square
var game = new BoggleBoard(dictionary, length, test);

//console.log(game.shake());
console.log('');
console.log(game.solve());
