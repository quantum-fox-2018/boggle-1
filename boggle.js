"use strict"

const dictionary = ['KICK', 'KIND', 'EDIT', 'IN', 'NOTE'];
const DIRECTIONS = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
];


class Boggle {
    constructor() {
        this.board = this.generateBoards();
        this.visited = [];
        this.startingPoint = [];
        this.foundWords = [];
    }

    generateBoards() {
        let row = [];
        let board = [];
        for (let i = 0; i < 4; i++) {
            board[i] = [];
            for (let j = 0; j < 4; j++) {
                board[i].push(
                    String.fromCharCode(65 + Math.floor(Math.random() * 26))
                );
            }
        }
        return board;
    }

    checkStartingPoint(word) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === word[0]) {
                    this.startingPoint.push([i, j]);
                }
            }
        }

    }

    startSolve(word) {
        this.checkStartingPoint(word)
        var startingPoint = this.startingPoint

        for (let i = 0; i < startingPoint.length; i++) {
            let count = this.solveWord(startingPoint[i], word, 1)
            if (count == word.length) {
                this.foundWords.push(word)
                break;
            }
        }
    }

    checkVisited(coor) {
        for (let i = 0; i < this.visited.length; i++) {
            if (coor[0] == this.visited[i][0] && coor[1] == this.visited[i][1]) {
                return false
            }
        }
        return true
    }

    solveWord(coor, word, count = 1) {
        if (this.checkVisited(coor)) {
            this.visited.push(coor)
        } 

        if (count < word.length) {
            let validDirections = []
            let board = this.board
            let directions = DIRECTIONS
    
            for (let i = 0; i < directions.length; i++) {
                let row = coor[0] + directions[i][0]
                let col = coor[1] + directions[i][1]
                let newCoor = [row, col]
                if (row >= 0 && row <= 3 && 
                    col >= 0 && col <= 3 &&
                    this.checkVisited(newCoor)) {
                    validDirections.push(newCoor)
                }
            }
    
            for (let i = 0; i < validDirections.length; i++) {
                let row = validDirections[i][0]
                let col = validDirections[i][1]
                if (board[row][col] == word[count] && !this.visited.includes([row, col])) {
                    count++
                    return this.solveWord([row, col], word, count)
                }
                if (i == validDirections.length - 1 && board[row][col] != word[count]) {
                    count--
                    try {
                        let newCoor = this.visited[this.visited.length - 2]
                        return this.solveWord(newCoor, word, count)
                    } catch (error) {
                        return;
                    }
                }
            }
        } else {
            return count;
        }
    }

    solve(arrayOfWord) {
        for (let i = 0; i < arrayOfWord.length; i++) {
            this.startingPoint = []

            this.visited = []
            try {
                this.startSolve(arrayOfWord[i])
            } catch(error) {
                continue;
            }
        }
        let wordCount = this.foundWords.length;
        console.log(
            wordCount + ' word' + (wordCount > 1 ? 's found' : ' found')
        );
        this.foundWords.forEach(word => {
            console.log(word);
        });
    }
}

var boggleSolver = new Boggle();

boggleSolver.solve(dictionary);