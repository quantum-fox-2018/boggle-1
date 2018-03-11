"use strict"



var jawaban = ["ABA","ABAD","ABADI","ABAH","ABAI","ABAL","ABANG","ABANGAN","ADIL"]
var gabung= jawaban.join('')
var  letter = []

for (var i = 0; i < gabung.length; i++) {
  if(letter.includes(gabung[i])==false){
    letter.push(gabung[i])
  }
}
//var jmlHuruf = abjad.join( '').length

class BoggleBoard{
  constructor(letter,jawaban){
    this.huruf = letter
    this.answer= jawaban
  }

  shake(){
    return this.generateBoard()


  }

  generateBoard(letter){
    var jmlHuruf = this.huruf.length
    var papanMain = []
    for(let i=0; i<4; i++){
    var baris = []
      for(let j=0; j<4; j++){
        //console.log(random);
        var random = Math.floor(Math.random()*jmlHuruf)
        var hurufRandom = this.huruf[random]
        baris.push(hurufRandom)
      }
      papanMain.push(baris)
    }
    return papanMain
  }

}



var game = new BoggleBoard(letter,jawaban)

console.log(game.shake())
