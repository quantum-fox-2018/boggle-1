class Boggle{
    constructor(size){
        this._boardGame = this.board()
        this._size = size || 3

    }

    board(){
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let arrBoard = []
        for(let i=0; i<this._size; i++){
            let inside = []
            for(let j=0; j<this._size; j++){
                let random = alphabet[Math.floor(Math.random() * alphabet.length)];
                inside.push(random)
            }
            arrBoard.push(inside)
        }
        return arrBoard
    }

    searchWord(){
        let word = []
        let firstIndex = []
        let index = ''
        let count = 0
        let dict =  dict_string.split(',')
        let runBoard = this.board()

        // console.log(runBoard);
        
        
        while(count < dict.length){
          for(let i=0; i<runBoard.length; i++){
            for(let j=0; j<runBoard[i].length; j++){
              index = dict[count]
              firstIndex = index[0]
              if(runBoard[i][j] === firstIndex && word.indexOf(index) === -1){
                word.push(dict[count])
              }
            }
          }
          count ++
        }
        return word
      }

}

var fs = require('fs')
var dict_string = fs.readFileSync('dict.txt').toString().split("\n")[0]

let boggle = new Boggle(5)
// boggle.searchWord()
// console  .log(boggle.searchWord());
