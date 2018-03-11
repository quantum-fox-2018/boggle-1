/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";

// console.log(words);
//
class BoogleBoard {
  constructor(words_string) {
    this.wordAlphabet = words_string;
    // this.box = box;
    this.board = [];

  }

  shake(num) {
    // let wordAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // let wordAlphabet = 'AKJDZAOHGEBRTFJV';
    let count = 0;
    for (var i = 0; i < num; i++) {
      let row = [];
      for (var j = 0; j < num; j++) {
        row.push(this.wordAlphabet[Math.floor(Math.random()*this.wordAlphabet.length)]);
        // row.push(wordAlphabet[Math.floor(Math.random()*wordAlphabet.length)]);
        // row.push(wordAlphabet[count]);
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
// var game = new BoogleBoard(4);
// var number = +(process.argv)[2];
console.log('BoogleBoard');
console.log(game.shake(4));
game.solve();
