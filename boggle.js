class Boggle{
    constructor(num){
        this.board = this.buildBoard(num)
    }

    randomLetter(){
        return String.fromCharCode(Math.round(Math.random() * 25) + 65);
    }


    buildBoard(num){
        let result = [];
        for(let counter = 0; counter<num; counter++){
            let arrInside = [];
            for(let counter2 =0; counter2<num; counter2++){
                arrInside.push(this.randomLetter());
            }   
            result.push(arrInside);
        }

        return result;
    }

    showBoard(){
        console.log(this.board);
    }
}


let game = new Boggle(9);

game.showBoard();