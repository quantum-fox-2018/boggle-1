'use strict'
// looping sebanyak kotak boodle
class Boogle {
    constructor(str, dictionary){
        this.board = this.generateBoard(str)
        this.dictionaryWord = this.library(dictionary)
        this.result = [];
    }

    library(arr){  // kamus
        let arrWords = [];
        for(let i=0; i<arr.length; i++){
            arrWords.push(arr[i]);
        }
        return arrWords;
    }

    generateBoard(str){ 
        let idx = 0;
        let bigBoard = [];
        for(let i=0; i<4; i++){
            let board = [];
            for(let j=0; j<4; j++){
                board.push(str[idx])
                idx++;
            }
            bigBoard.push(board)
        }
        return bigBoard;
    }

    boardChecker(){
        // for(let i=0; i<this.board.length; i++){
        //     for(let j=0; j<this.board.length; j++){
        //         this.findWordsPossible(this.board[i][j])
        //     }
        // }
        this.findWordsPossible('M', [0,0]) // inject HARDCODE
    }

    findWordsPossible(char, coordinate){ // Char(M) =>  Malih,Macan,Mas,Monas
        // for(let i=0; i<this.dictionaryWord.length; i++){
        //     if(this.dictionaryWord[i][0] == char){
        //         // console.log('--> '+this.dictionaryWord[i])
        //         this.checkPerWords(this.dictionaryWord[i], coordinate)
        //     }
        // }
        this.checkPerWords('MALIH', coordinate); // HARDCODE
    }

    checkPerWords(word, coordinate){  // M, A, L, I, H
        // let successWord = [];
        // successWord.push(word[0])
        // for(let i=0; i<word.length; i++){
        //     if(i != word.length-1){
        //         var currentWord = word[i];
        //         var secondWord = word[i+1];
        //         this.check360(word[i], word[i+1], coordinate)
        //         // console.log('-->'+word[i], word[i+1])
        //     }
        // }
        // console.log('=>'+successWord)
        this.check360('M', 'O', [0,0])
    }

    check360(c, n, coordinate){ // current, next, coordinate
        // console.log('test')
                let x = coordinate[0];
                let y = coordinate[1];
                console.log('->'+this.board[x+=1][y-=0])
                console.log('->'+this.board[x+=1][y-=0])
                console.log('= '+x,y)
                // secondWord = n;
                coordinate = [x,y];
                // if(this.board[x-=1][y-=1] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // }else if(this.board[x-=1][y-=0] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x-=1][y+=1] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x-=0][y+=1] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x+=1][y+=1] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x+=1][y-=0] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x+=1][y-=1] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else if(this.board[x-=0][y-=0] == n){
                //     secondWord = n;
                //     coordinate = [x,y];
                // } else {
                //     return 'nihil';
                // }
    }
}


let board_string = ['M','K','U','R','O','A','S','B','N','T','I','L','A','S','C','D'];
let dictionary = ['MALIH','MACAN','MAS','KASUR','MONAS','KATA','RUSAK','BISA','BUSA','KURSI','UBI','ONTA'];

let boogle = new Boogle(board_string, dictionary);

console.log(boogle.board);
// console.log(boogle.dictionaryWord);
console.log(boogle.boardChecker())
// console.log('hasil = '+ boogle.result)

// console.log(boogle.check)