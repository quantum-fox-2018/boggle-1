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
            arrResult.push(word[wordCount]);
        }
        // console.log(findWordsInBoard(words[wordCount]));
    }
    for(let counter= 0; counter<arrResult.length;counter++){
        console.log(arrResult[counter]);
    }
}

function findWordsInBoard(word){
    for(let counter =0; counter<board.length; counter++){
        for(let counter2=0; counter2<board.length; counter2++){
            console.log(`on board : ${board[counter][counter2]} banding dengan ${word.charAt(0)}`);
            if(word.charAt(0) === board[counter][counter2]){
                let indexSaver = [];
                let failedAttempt = [];
                indexSaver.push(counter, counter2);
                
                //Check kata sekeliling kata yg ditemukan dan di loop sebanyak panjang kata yg ingin dicari
                let wordCount =0;

                for(let count1 = 0; count1<3; count1++){
                    for(let count2 = 0; count2<3; count2++){
                        if(counter+count1>=0 && counter+count1<board.length && counter2+count2>=0 && counter2+count2 < board.length){
                            console.log(`on board : ${board[counter+count1][counter2+count2]} banding dengan ${word.charAt(wordCount)}`);
                            debugger;

                            if(counter+count1 === failedAttempt[0] && counter2+count2 === failedAttempt[1]){
                                continue;
                            }else if(word.charAt(wordCount+1) === undefined){
                                return true;
                            }else if(word.charAt(wordCount+1) === board[counter+count1][counter2+count2]){
                                indexSaver.push(counter+count1, counter2+count2);
                                wordCount++;
                                failedAttempt.push(counter+count1, counter2+count2);
                                counter = counter-count1;
                                counter2-=2;
                            }else if(counter+count1 === counter+1 && column === counter2+1){
                                counter = indexSaver[0];
                                counter2 = indexSaver[1];
                                wordCount =0;
                                indexSaver = [];
                            }
                        }
                    }
                }
                
            }
        }
    }
    return false;
}



findWords();