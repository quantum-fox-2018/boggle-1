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
    let arrayOfStart = [];
    for(let i=0; i<this.board.length; i++){
      for(let j=0; j<this.board[i].length; j++){
        if(this.board[i][j]==start){
          arrayOfStart.push([i,j]);
        }
      }
    }
    return arrayOfStart;
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
    for(let i=0; i<this.dict.length; i++){ // looping kata di dalam kamus
      let currentWord = this.dict[i]; // kata di dalam kamus
      let str = currentWord[0]; // huruf pertama di dalam kata
      let max = currentWord.length; // panjang kata
      let start = this.startingPoint(str); // array of koordinat
      let newStr = currentWord[0]; // kata baru yang didapat dari board
      for(let w=0; w<start.length; w++){ // looping koordinat
        let baris = start[w][0];
        let kolom = start[w][1];
        for(let j=1; j<max; j++){
          str = currentWord[j];
          let check = this.checkBoard(this.board,baris,kolom,str);
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

  comparrison(){
    let result = this.searchBoard();
    let firstDict = this.dict;
    for(let i=0; i<firstDict.length; i++){
      for(let j=0; j<result.length; j++){
        if(firstDict[i]==result[j]){
          console.log(result[j]);
        }
      }
    }
  }
}

var kamus = ['aku','kamu','kita','dia','anda'];
var boggle = new Boggle(4,kamus);
console.log(boggle);
console.log(boggle.searchBoard())
boggle.comparrison();
