//generate random array 3x3
//tiap index array cek hurufnya
//  cek apa hurufnya sama kyk huruf pertama di kamus
//  kalau sama cek sesuai arah mata angin yg masuk ke huruf kedua kamus
//    (kalau sama ama 2 kamus gmn bro ?) looping dlu sesuai kamus 1, baru lanjut kamus 2. kalau hit dua2nya kumpullin di result
//    terus bikin count buat ngitung dia ketemu berapa kali
//  pas cek, simpan koordinat nya biar enggak ke koordinat itu lagi pas cek mata angin
//  hati2 juga sama out of index
//
// dictionary[] = ["GEEKS", "FOR", "QUIZ", "GO"];
// boggle[][]   = {{'G','I','Z'},
//                 {'U','E','K'},
//                 {'Q','S','E'}};
// result[] = [{word:'GEEKS',count:'1'}.{word:'FOR',count:'0'}.{word:'QUIZ',count:'1'}.{word:'GO',count:'0'}.];
//
// shake(3) -> 3 itu panjang row sama col buat board, tiap index board diisi sama random text/huruf
// lalu return berapa banyak kata di kamus itu ditemukan
//
// arrah mata angin -> up[row-1,col],upRight[row-1,col+1],right[row,col+1],downRight[row+1,col+1]
//                     dow[row+1,col],downLeft[row+1,col-1],left[row,col-1],upLeft[row+1,col-1]
//
// kayaknya enakan simpen dlu semua possible kata dari board (tidak terikat kamus, kata apa aja) simpen di array 'allPossibleWord'
// baru deh cek satu2 cunt katanya

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const kamus = ["GEEKS", "FOR", "QUIZ", "GO"];
const board = [['G','I','Z'],
                ['U','E','K'],
                ['Q','S','E']];

class boggle{
  constructor(kamus,board){
    this.dictionary = kamus;
    this.checker = [this.checkUp, this.checkUpRight, this.checkRight,
                    this.checkDownRight, this.checkDown, this.checkDownLeft,
                    this.checkLeft, this.checkUpLeft];
  }

  shake(puzzleLength){
    let board = this.getBoard(puzzleLength);
    let dictionary = this.dictionary;
    let result = this.getResultItems(dictionary);

    for(let rowBoard = 0; rowBoard < board.length; rowBoard++){
      for(let colBoard = 0; colBoard < board.length; colBoard++){
        for(let indexDict = 0; indexDict < board.length; indexDict++){
          if(board[rowBoard][colBoard] === dictionary[indexDict][0] && this.checkMatch(dictionary[indexDict],[rowBoard,colBoard])){
            result[indexDict].count++;
          }
        }
      }
    }

    return result;
  }

  getBoard(length){
    let board = [];
    for(var row = 0; row < length; row++){
      for(var col = 0; col < length; col++){
        (visitArray[row]) ? visitArray[row].push(false) : visitArray[row] = [false];
      }
    }
  }

  getResultItems(dictionary){
    let dict = dictionary;
    let resultItems = [];
    for(let index = 0; index < dict.length; index++){
      resultItems.push({word:dict[index], count:0});
    }

    return resultItems;
  }

  getVisitArray(){
    let visitArray = [];
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        (visitArray[row]) ? visitArray[row].push(false) : visitArray[row] = [false];
      }
    }
    return visitArray;
  }

  checkMatch(searchedWord,startBoardCoordinate){
    let word = searchedWord;
    let startCoordinate = startBoardCoordinate;
    let checker = this.checker;
    let visited = this.getVisitArray();
    visited[startCoordinate[0]][startCoordinate[0]] = true;

    for(let indexHuruf = 0; indexHuruf < word.length; indexHuruf++){
      for(let checkerIndex = 0; checkerIndex < checker.length; checkerIndex++){
        if(this.checker[checkerIndex](word[indexHuruf],startCoordinate),visited[][]){

        }
      }
    }
  }

  // arrah mata angin -> up[row-1,col],upRight[row-1,col+1],right[row,col+1],downRight[row+1,col+1]
  //                     dow[row+1,col],downLeft[row+1,col-1],left[row,col-1],upLeft[row+1,col-1]

  checkUp(){
    if(huruf === this.board[row-1][col] && ){}
  }

  checkUpRight(){
    if(huruf === this.board[row-1][col+1]){}
  }

  checkRight(){
    if(huruf === this.board[row][col+1]){}
  }

  checkDownRight(){
    if(huruf === this.board[row+1][col+1]){}
  }

  checkDown(){
    if(huruf === this.board[row+1][col]){}
  }

  checkDownLeft(){
    if(huruf === this.board[row+1][col-1]){}
  }

  checkLeft(){
    if(huruf === this.board[row][col-1]){}
  }

  checkUpLeft(){
    if(huruf === this.board[row-1][col-1]){}
  }

}


let bogel = new boggle(kamus,board);
console.log(bogel.shake());
