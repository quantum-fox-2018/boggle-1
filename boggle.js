var global = require('./data');

function shake(num) {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var arrboard = [];

  for (var i = 0; i < num; i++) {
    var arr = []
    for (var j = 0; j < num; j++) {
      arr.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    }
    arrboard.push(arr);
  }
  return arrboard;
}

// function solve(listKata, num) {
//   var board = shake(num);
//
// }

console.log(solve(global, 4))
// console.log(shake(4))
console.log(global.word[0]);
