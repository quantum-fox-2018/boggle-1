/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";

class BoogleBoard {
  constructor(words_string) {
    this.wordAlphabet = words_string;
    this.board = [];
  }

  shake(num) {
    let count = 0;
    for (var i = 0; i < num; i++) {
      let row = [];
      for (var j = 0; j < num; j++) {
        row.push(this.wordAlphabet[Math.floor(Math.random()*this.wordAlphabet.length)]);
        count++;
      }
      this.board.push(row);
    }
    return this.board;
  }

  solve() {

  }
}

var fs = require('fs');
var words_string = fs.readFileSync('wordAlpabet.txt')
  .toString()
  .split("\n")[0];


var game = new BoogleBoard(words_string);

console.log('BoogleBoard');
console.log(game.shake(4));
game.solve();
