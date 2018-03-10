class Boggle {
  constructor(grid, dictionary) {
    this.board = this.generateBoard(grid);
    this.dict = dictionary;
  }

  generateBoard(grid){
    let abjad = 'abcdefghijklmnopqrstuvwxyz';
    let board = [];
    for(let i=0; i<grid; i++){
      let line = [];
      for(let j=0; j<grid; j++){
        let random = Math.floor(Math.random()*26);
        line.push(abjad[random]);
      }
      board.push(line);
    }
    return board;
  }

  startingPoint(start){
    for(let i=0; i<this.board.length; i++){
      for(let j=0; j<this.board[i].length; j++){
        if(this.board[i][j]==start){
          return [i,j];
        }
      }
    }
    return -1;
  }

  checkBoard(board,row,col,str){
    let baris = Math.floor(row/3)*3;
    let kolom = Math.floor(col/3)*3;
    for(let q=baris; q<baris+3; q++){
      for(let w=kolom; w<kolom+3; w++){
        if(board[q][w]==str){
          return [q,w];
        }
      }
    }
    return -1;
  }

  searchBoard(){
    let array = [];
    for(let i=0; i<this.dict.length; i++){
      let currentWord = this.dict[i];
      let str = currentWord[0]; //a
      let max = currentWord.length; //3
      let start = this.startingPoint(str); // [baris,kolom] atau -1
      let newStr = currentWord[0]; //a
      if(start!==-1){
        let baris = start[0];
        let kolom = start[1];
        for(let j=1; j<max; j++){
          str = currentWord[j]; // k
          let check = this.checkBoard(this.board,baris,kolom,str); // board,baris,kolom,k
          if(check!==-1){
            newStr += str;
            baris = check[0];
            kolom = check[1];
          }
        }
        array.push(newStr);
      }
    }
    return array;
  }

}

var kamus = ['aku','kamu','kita','dia','anda'];
var boggle = new Boggle(4,kamus);
console.log(boggle);
console.log(boggle.searchBoard());
