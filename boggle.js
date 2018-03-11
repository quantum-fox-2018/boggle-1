function board(size) {

    let boardRandom = []
    let abjad = 'abcdefghijklmnopqrstuvwxyz'

    for (let i = 0; i < size; i++) {
        
        let tempBoard = []
        for (let j = 0; j < size; j++) {
            
            tempBoard.push(abjad[Math.floor(Math.random()*26)])        
        }// end of col

        boardRandom.push(tempBoard)
    }// end of row
    
    return boardRandom
}// end of board

function solve(words, size) {

    let boardGame = board(size)
    let arr = []

    for
}

board(6)
solve(['tea','sugar'])