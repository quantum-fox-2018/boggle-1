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

  boardTest(){
      var board = [
                    ['D','G','H','I'],
                    ['T','L','P','S'],
                    ['Y','E','U','T'],
                    ['E','O','R','N'],
                  ]

      return board
  }

  solve(){
    var kamus = ['APPLE','SIT','TRIP','TURN','SUPER']
    var result = []
    for(let i=0; i<kamus.length; i++){
      var lemparCek = getCek(kamus[i])
      // if(getCek!===false){
      //   result.push(getCek)
      // }
    }
    return result
  }

  getCek(kamus){
    var papan = this.boardTest()
    console.log(papan)
    var kata = 'TRIP' // NANTI DIGANTI DENGAN kamus
    var tmp = []
    var firstHuruf = []

    // cek huruf pertama kata, apakah ada di board. jika tidak ada langsung return false
    for(let r=0; r<papan.length; r++){
      var baris = papan[r]
      for(let k=0; k<baris.length; k++){
        if(baris[k]===kata[0]){
          firstHuruf.push(r)
          firstHuruf.push(k)
        }
      }
      if(firstHuruf.length>0){
        tmp.push(firstHuruf)
      }
      firstHuruf = []
    }
    // console.log(tmp) // [1,0], [2,3]

    // jika angka pertama tidak ada di papan
    if(tmp.length===0){
      return false
    }

    // jika angka pertama ada dipapan dan lebih dari 1,
    // lakukan perulangan untuk mengecek huruf yang mana yang akan dijadikan base nya
    if(tmp.length>1){

      var koordinatKata = []
      var ambilKeliling = this.getKoordinat(tmp[0][0], tmp[0][1])
      var cekHuruf = []
      for(let i=0; i<ambilKeliling.length; i++){
        cekHuruf.push(ambilKeliling[i][0])
      }
      // console.log(cekHuruf)
      if(cekHuruf.indexOf(kata[1])===-1){
        return false
      }
      else {
        koordinatKata.push([tmp[0][0], tmp[0][1]])
        // koordinatKata.push(ambilKeliling[i][i])
      }





    }

  }

  getKoordinat(baris, kolom){
    var papan = this.boardTest()
    // console.log('papan : \n',papan)
    var koordinatKeliling = []
    var hurufKoordinat = []
    if(papan[baris-1][kolom-1]!==undefined){
      hurufKoordinat.push(papan[baris-1][kolom-1])
      hurufKoordinat.push([baris-1, kolom-1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris-1][kolom]!==undefined){
      hurufKoordinat.push(papan[baris-1][kolom])
      hurufKoordinat.push([baris-1, kolom])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris-1][kolom+1]!==undefined){
      hurufKoordinat.push(papan[baris-1][kolom+1])
      hurufKoordinat.push([baris-1, kolom+1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris][kolom-1]!==undefined){
      hurufKoordinat.push(papan[baris][kolom-1])
      hurufKoordinat.push([baris, kolom-1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris][kolom+1]!==undefined){
      hurufKoordinat.push(papan[baris][kolom+1])
      hurufKoordinat.push([baris, kolom+1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris+1][kolom-1]!==undefined){
      hurufKoordinat.push(papan[baris+1][kolom-1])
      hurufKoordinat.push([baris+1, kolom-1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris+1][kolom]!==undefined){
      hurufKoordinat.push(papan[baris+1][kolom])
      hurufKoordinat.push([baris+1, kolom])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }
    if(papan[baris+1][kolom+1]!==undefined){
      hurufKoordinat.push(papan[baris+1][kolom+1])
      hurufKoordinat.push([baris+1, kolom+1])
      koordinatKeliling.push(hurufKoordinat)
      hurufKoordinat = []
    }

    return koordinatKeliling
  }



}

var fs = require('fs')
var alfabet = fs.readFileSync('alfabet.txt')
  .toString()
  .split("\n")[0]

var game = new BoggleBoard(alfabet)

// console.log(game.shake(angkaArgv))
// console.log(game.boardTest())
// console.log(game.solve())
console.log(game.getCek())
// console.log(game.getKoordinat(1,0))
