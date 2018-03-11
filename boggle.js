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
// const board = [['G','I','Z'],
//                 ['U','E','K'],
//                 ['Q','S','E']];

class boggle{
  constructor(kamus){
    this.alphabets = alphabets;
    this.dictionary = kamus;
    this.checker = [this.checkUp, this.checkUpRight, this.checkRight,
                    this.checkDownRight, this.checkDown, this.checkDownLeft,
                    this.checkLeft, this.checkUpLeft];
  }

  shake(puzzleLength){
    let boardLength = puzzleLength;
    let board = this.getBoard(puzzleLength);
    let dictionary = this.dictionary;
    let result = this.getResultItems(dictionary);

    for(let rowBoard = 0; rowBoard < board.length; rowBoard++){
      for(let colBoard = 0; colBoard < board.length; colBoard++){
        for(let indexDict = 0; indexDict < board.length; indexDict++){
          if(board[rowBoard][colBoard] === dictionary[indexDict][0] && this.checkMatch(dictionary[indexDict],[rowBoard,colBoard],boardLength)){
            result[indexDict].count++;
          }
        }
      }
    }

    return result;
  }

  getBoard(length){
    let board = [];
    for(let row = 0; row < length; row++){
      for(let col = 0; col < length; col++){
        (board[row]) ? board[row].push(this.alphabets[Math.floor(Math.random()*(25-0+1) + 0)]) : board[row] = [this.alphabets[Math.floor(Math.random()*(25-0+1) + 0)]];
      }
    }

    return board;
  }

  getResultItems(dictionary){
    let dict = dictionary;
    let resultItems = [];
    for(let index = 0; index < dict.length; index++){
      resultItems.push({word:dict[index], count:0});
    }

    return resultItems;
  }

  getVisitArray(boardLength){
    let length = boardLength;
    let visitArray = [];
    for(let row = 0; row < length; row++){
      for(let col = 0; col < length; col++){
        (visitArray[row]) ? visitArray[row].push(false) : visitArray[row] = [false];
      }
    }
    return visitArray;
  }

  checkMatch(searchedWord,startBoardCoordinate,boardLength){
    let length = boardLength;
    let word = searchedWord;
    let currentPosition = startBoardCoordinate;
    let previousPosition = startBoardCoordinate;
    let checker = this.checker;
    let visited = this.getVisitArray(length);
    visited[currentPosition[0]][currentPosition[0]] = true;

    for(let indexHuruf = 1; indexHuruf < word.length; indexHuruf++){
      for(let checkerIndex = 0; checkerIndex < checker.length; checkerIndex++){
        if(this.checker[checkerIndex](word[indexHuruf],currentPosition),visited,length){
          switch(checkerIndex){
            case 0:
              visited[currentPosition[0]-1][currentPosition[1]] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]-1;
              currentPosition[1] = currentPosition[1];
              break;
            case 1:
              visited[currentPosition[0]-1][currentPosition[1]+1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]-1;
              currentPosition[1] = currentPosition[1]+1;
              break;
            case 2:
              visited[currentPosition[0]][currentPosition[1]+1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0];
              currentPosition[1] = currentPosition[1]+1;
              break;
            case 3:
              visited[currentPosition[0]+1][currentPosition[1]+1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]+1;
              currentPosition[1] = currentPosition[1]+1;
              break;
            case 4:
              visited[currentPosition[0]+1][currentPosition[1]] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]+1;
              currentPosition[1] = currentPosition[1];
              break;
            case 5:
              visited[currentPosition[0]+1][currentPosition[1]-1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]+1;
              currentPosition[1] = currentPosition[1]-1;
              break;
            case 6:
              visited[currentPosition[0]][currentPosition[1]-1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0];
              currentPosition[1] = currentPosition[1]-1;
              break;
            case 7:
              visited[currentPosition[0]-1][currentPosition[1]-1] = true;
              previousPosition = currentPosition;
              currentPosition[0] = currentPosition[0]-1;
              currentPosition[1] = currentPosition[1]-1;
              break;
          }
        }
      } if(previousPosition === currentPosition) return false;
    }
    return true;
  }

  // arrah mata angin -> up[row-1,col],upRight[row-1,col+1],right[row,col+1],downRight[row+1,col+1]
  //                     dow[row+1,col],downLeft[row+1,col-1],left[row,col-1],upLeft[row+1,col-1]

  checkUp(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row-1][col] !== 'undefined' && huruf === this.board[row-1][col] && !visited[row-1][col]){
      return true;
    }
    return false
  }

  checkUpRight(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row-1][col+1] !== 'undefined' && huruf === this.board[row-1][col+1] && !visited[row-1][col+1]){
      return true;
    }
    return false
  }

  checkRight(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row][col+1] !== 'undefined' && huruf === this.board[row][col+1] && !visited[row][col+1]){
      return true;
    }
    return false
  }

  checkDownRight(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row+1][col+1] !== 'undefined' && huruf === this.board[row+1][col+1] && !visited[row+1][col+1]){
      return true;
    }
    return false
  }

  checkDown(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row+1][col] !== 'undefined' && huruf === this.board[row+1][col] && !visited[row+1][col]){
      return true;
    }
    return false
  }

  checkDownLeft(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row+1][col-1] !== 'undefined' && huruf === this.board[row+1][col-1] && !visited[row+1][col-1]){
      return true;
    }
    return false
  }

  checkLeft(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row][col-1] !== 'undefined' && huruf === this.board[row][col-1] && !visited[row][col-1]){
      return true;
    }
    return false
  }

  checkUpLeft(text, coordinate, visitCoordinate,boardLength){
    let huruf = text;
    let row = coordinate[0];
    let col = coordinate[1];
    let visited = visitCoordinate;
    let length = boardLength;

    if(row < 0 || row >= length || col < 0 || col >= length) return false;

    if(typeof this.board[row-1][col-1] !== 'undefined' && huruf === this.board[row-1][col-1] && !visited[row-1][col-1]){
      return true;
    }
    return false
  }

}


let bogel = new boggle(kamus);
console.log(bogel.shake(3));
