class Boogle {
    constructor(alfabet, size, library) {
      this.alfabet = alfabet
      this.size = size
      this.library = library
    }
  
    board() {
      var arrBoard = []
      for(let i=0; i<this.size; i++) {
        arrBoard.push([])
        for(let j=0; j<this.size; j++) {
          arrBoard[i].push(this.randomLibrary())
        }
      }
      return arrBoard
    }
  
    randomLibrary() {
      let joinAlfabet = this.library.join('').split('')
      let randomAlfabet = Math.floor((Math.random()*(joinAlfabet.length-1))+1)
  
      return joinAlfabet[randomAlfabet]
    }
  
  }
  
  
  var alfabet = 'abcdefghijklmnopqrstuvwxyz'
  var size = 4
  var library = ['kursi','celana','pintu','foto','buku']
  var game = new Boogle (alfabet, size, library)
  
  // console.log(game.randomLibrary());
  console.log(game.board());