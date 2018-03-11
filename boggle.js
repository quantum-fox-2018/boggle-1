const data = require('./data').words;

class Boggle {
  constructor() {
    this.board = [];
    this.kamus = [];
  }

  isiKamus(arr) {
    for(let i in arr) {
      this.kamus.push(arr[i]);
    }
  }

  acakHuruf() {
    let kemungkinanHuruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let index = Math.floor(Math.random() * kemungkinanHuruf.length);
    return kemungkinanHuruf[index];
  }

  shake(num) {
    let hurufAcak;
    for(let i = 0; i < num; i++) {
      this.board.push([]);
      for(let j = 0; j < num; j++) {
        hurufAcak = this.acakHuruf();
        this.board[i].push(hurufAcak);
      }
    }
    return this.board;
  }

  checkKemungkinan(index) {
    let cek = this.kamus[index].charAt(0);
    let kemungkinan = [];
    let tmpIndex;
    for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] == cek) {
          kemungkinan.push([i, j]);
        }
      }
    }
    return kemungkinan;
  }

  checkJumlahVisit(arr) {
    let jumlah = 0;
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr[i].length; j++) {
        if(arr[i][j] == 1) {
          jumlah++;
        }
      }
    }
    return jumlah;
  }

  checkBatas(row, col, rowCheck, colCheck) {
    let batasRow = [row-1, row, row+1];
    let batasCol = [col-1, col, col+1]
    let cekRow = batasRow.indexOf(rowCheck);
    let cekCol = batasCol.indexOf(colCheck);
    if(cekRow !== -1 && cekCol !== -1) {
      return true;
    }
    return false;
  }

  checkVisit() {
    let visited = [];
    for(let i = 0; i < this.board.length; i++) {
      visited.push([]);
      for(let j = 0; j < this.board[i].length; j++) {
        visited[i].push(0);
      }
    }
    return visited;
  }

  solve(check) {
    let hasil = [];
    let kemungkinanIndex0;
    let posisiSekarang;
    let visited;
    let isFind;
    let isFindKata;
    for(let i = 0; i < this.kamus.length; i++) {
      kemungkinanIndex0 = this.checkKemungkinan(i);
      for(let j = 0; j < kemungkinanIndex0.length; j++) {
        isFindKata = false;
        visited = this.checkVisit();
        let row = kemungkinanIndex0[j][0];
        let col = kemungkinanIndex0[j][1];
        visited[row][col] = 1;
        posisiSekarang = [row, col];
        for(let k = 1; k < this.kamus[i].length; k++) {
          isFind = false;
          for(let l = 0; l < this.board.length; l++) {
            for(let m = 0; m < this.board[l].length; m++) {
              if(this.kamus[i].charAt(k) == this.board[l][m]) {
                if(this.checkBatas(posisiSekarang[0], posisiSekarang[1], l, m)) {
                  if(visited[l][m] == 0) {
                    posisiSekarang = [l, m];
                    visited[l][m] = 1;
                    isFind = true;
                    break;
                  }
                }
              }
            }
            if(isFind) {
              break;
            }
          }
        }
        let jumlahVisit = this.checkJumlahVisit(visited);
        if(jumlahVisit === this.kamus[i].length) {
          hasil.push(this.kamus[i]);
          isFindKata = true;
        }
        if(isFindKata) {
          break;
        }
      }
    }
    console.log(hasil);
  }
}

var game = new Boggle();

game.isiKamus(data);
game.shake(5);
console.log(game.board);
game.solve();
