"use strict"

var angkaArgv = Number(process.argv[2])

class BoggleBoard{
  constructor(){

  }

  shake(angka){
    var jmlHuruf = alfabet.length-1
    var papan = []
    for(let i=0; i<angka; i++){
      var row = []
      for(let j=0; j<angka; j++){
        var hurufRandom = alfabet[Math.floor(Math.random()*jmlHuruf)+0]
        row.push(hurufRandom)
      }
      papan.push(row)
    }
    return papan
  }



}

var fs = require('fs')
var alfabet = fs.readFileSync('alfabet.txt')
  .toString()
  .split("\n")[0]

var game = new BoggleBoard(alfabet)

console.log(game.shake(angkaArgv))
