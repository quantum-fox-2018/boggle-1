const data = require('./data').words;

class boggle {
  constructor(indexI, indexJ, kamus) {
    this.abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // this.randomWords = 'DGHIALPSYEUTEORN';
    // this.randomWords = 'DLHIAGPSYEUTEORN';
    this.board = [];
    this.kamus = kamus;
    // this.currWords = this.kamus[this.kamus.length-1];
    this.wordResult = [];

    // // buat testting tanpa random
    // let index = 0;
    // for(let i = 0; i < indexI; i++){
    //     let tempBoard = [];
    //     for(let j = 0; j < indexJ; j++){
    //         tempBoard.push(this.randomWords[index]);
    //         index++;
    //     }
    //     this.board.push(tempBoard);
    // }


    //kalo random words
    for(let i = 0; i < indexI; i++){
      let tempBoard = [];
      for(let j = 0; j < indexJ; j++){
          let randomAbjad = this.randomWord();
          tempBoard.push(randomAbjad);
      }
      this.board.push(tempBoard);
    }

    // return this.board;
    // this.cekKamus = this.cekKamus();

  }

  cekKamus(){
      // let words = this.currWords;
      let words = this.kamus;
      let board = this.board;
      let result = this.wordResult;
      // console.log(board);
      for (let h = 0; h < words.length; h++) {
          let TempWord = '';
          let tempKord = [];
          let nextKord = ''; //kordinat dari kata selanjutnyas
          for(let i = 0; i < words[h].length; i++){
              for(let j = 0; j < board.length; j++){
                  for(let k = 0; k < board[j].length; k++){
                      if(words[h][i] == board[j][k]){
                          if(words[h][i] != TempWord[i]){
                              let currAbjadPos = this.cekAround(j, k, words[h], tempKord);

                              if(nextKord == ''){
                                  if(currAbjadPos.indexOf(words[h][i+1]) != -1 ){
                                    // console.log(words[h][i+1]+' '+currAbjadPos.indexOf(words[h][i+1]));
                                    TempWord += board[j][k];
                                    tempKord.push(''+j+k);
                                    // console.log(words[h][i]+': '+currAbjadPos);
                                    if(currAbjadPos[i+1] != undefined){
                                      // nextKord = currAbjadPos[i+1][0]+''+currAbjadPos[i+1][1];
                                      let nexIndex = currAbjadPos.indexOf(words[h][i+1])+1;
                                      nextKord = currAbjadPos[nexIndex];
                                      // console.log(nextKord);
                                    }

                                    // console.log(board[j][k], this.cekAround(j, k, words[h], tempKord));
                                  }
                              }else if(nextKord == ''+j+k){
                                  // console.log('Masuk sini :'+board[j][k]);
                                  if(currAbjadPos.indexOf(words[h][i+1]) != -1 ){
                                    // console.log(words[h][i+1]+' '+currAbjadPos.indexOf(words[h][i+1]));
                                    TempWord += board[j][k];
                                    tempKord.push(''+j+k);
                                    // console.log(words[h][i]+': '+currAbjadPos);
                                    if(currAbjadPos[i+1] != undefined){
                                      // nextKord = currAbjadPos[i+1][0]+''+currAbjadPos[i+1][1];
                                      let nexIndex = currAbjadPos.indexOf(words[h][i+1])+1;
                                      nextKord = currAbjadPos[nexIndex];
                                      // console.log(nextKord);
                                    }

                                    // console.log(board[j][k], this.cekAround(j, k, words[h], tempKord));
                                  }

                                  if(words[h][i] == words[h][words[h].length-1]
                                    && TempWord.length == (words[h].length-1) ){

                                    TempWord += board[j][k];
                                  }
                              }

                          }
                      }

                  }
              }
              //cek kalo huruf depan dari words / kamus ga ada looping langsung berhenti
              if(TempWord[0] !== words[h][0]){
                  break;
              }
          }

          // console.log(TempWord);
          if(TempWord == words[h]){
              // console.log(tempKord);
              result.push(TempWord);
          }
      }



      return result;
  }

  tesBox() {
    let board = this.board;

    for(let i = 0; i < board.length; i++){

        for(let j = 0; j < board[i].length; j++){

            console.log(board[i][j], this.cekAround(i, j));

        }

    }

  }

  randomWord(){
    let randomNum = Math.floor(Math.random() * 25);
    let abjad = this.abjad;
    return abjad[randomNum];
  }

  nextKord(){

  }

  //untuk mengecek di sekitar current words
  cekAround(indexI, indexJ, words, fisitedKord){
    let boxArr = [];
    let board = this.board;

    let firstI = indexI-1;
    let firstJ = indexJ-1;
    let iMaxLen = indexI+1;
    let jMaxLen = indexJ+1;

    //kalo first Index ga ada / -1
    if(firstI < 0){
        firstI = indexI;
    }else if ((indexI+1) >= board.length) {
        iMaxLen = board.length-1;
    }

    if(firstJ < 0){
        firstJ = indexJ;
    }else if ((indexJ+1) >= board[indexI].length) {
        jMaxLen = board[indexI].length-1;
    }

    for(let i = firstI; i <= iMaxLen; i++){
        for(let j = firstJ; j <= jMaxLen; j++){
            if((''+i+j) != (''+indexI+indexJ)){
                if(fisitedKord.indexOf(''+i+j) == -1){
                    boxArr.push(board[i][j]);
                    boxArr.push(''+i+j);
                }

            }

        }
    }

    // console.log(indexI, indexJ);
    return boxArr;
  }
}

var kamus = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'GLAD', 'HIP', 'LEO']; //'SUPER', 'TURN', 'GLAD'
var bogg = new boggle(6, 6, data);

// console.log(bogg);

console.log(bogg.board);

console.log(bogg.cekKamus());
