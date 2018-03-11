var board = [ [ 'R', 'N', 'R', 'H', 'G', 'G', 'K', 'C', 'I' ],
              [ 'W', 'O', 'C', 'G', 'X', 'F', 'Y', 'T', 'H' ],
              [ 'P', 'A', 'S', 'O', 'T', 'O', 'D', 'T', 'H' ],
              [ 'C', 'T', 'U', 'J', 'J', 'I', 'E', 'L', 'K' ],
              [ 'E', 'C', 'Z', 'Y', 'H', 'Q', 'B', 'T', 'R' ],
              [ 'J', 'H', 'N', 'I', 'Z', 'D', 'Z', 'E', 'U' ],
              [ 'S', 'P', 'M', 'K', 'J', 'R', 'L', 'H', 'S' ],
              [ 'G', 'L', 'Y', 'I', 'R', 'Y', 'F', 'B', 'L' ],
              [ 'W', 'C', 'R', 'N', 'W', 'S', 'G', 'P', 'U' ] ]

var words = ['TOY', 'PAWN', 'APPLE'];

function findWords(){
    console.log('Words found: ');
    let arrResult = [];
    for(let wordCount = 0; wordCount<words.length; wordCount++){
        if(findWordsInBoard(words[wordCount])){
            arrResult.push(words[wordCount]);
        }
        // console.log(findWordsInBoard(words[wordCount]));
    }
    for(let counter= 0; counter<arrResult.length;counter++){
        console.log(arrResult[counter]);
    }
}

function check3by3 (row, column, word, wordCount){
    for(let count1 = row-1; count1<=row+1; count1++){
        for(let count2 = column-1; count2<=column+1; count2++){
            if(count1>=0 && count1<board.length && count2>=0 && count2 < board.length){
                console.log(`on board : ${board[count1][+count2]} mencari huruf ${word.charAt(wordCount)}`);
                debugger;
                
                if(wordCount === word.length-1){
                    return true;
                }else if(word.charAt(wordCount) === board[count1][count2]){
                    wordCount++;
                    return check3by3(count1, count2, word, wordCount);
                }
            }
        }
    }
    return false;
}

function findWordsInBoard(word){
    let exit = false;
    for(let counter =0; counter<board.length; counter++){
        for(let counter2=0; counter2<board.length; counter2++){
            if(word.charAt(0) === board[counter][counter2]){
                
                //Check kata sekeliling kata yg ditemukan dan di loop sebanyak panjang kata yg ingin dicari
                let wordCount = 1;
                exit = check3by3(counter, counter2, word, wordCount);
                if(exit === true){
                    return exit;
                }     
            }
        }
    }
    return exit;
}



findWords();