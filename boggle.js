function board(num) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var arrBoard=[];
	for (var i = 0; i < num; i++){
		arrBoard.push([]);
		for(var j = 0; j < num; j++){
			arrBoard[i].push(alphabet[Math.floor(Math.random() * 26)]);
		}
	}
	return arrBoard;
}

function solve(words,num){

  var boggle = board(num)
  var arrFound = []

  for (var counter = 0; counter < words.length; counter++) {

    for (var i = 0; i < num; i++) {
      for (var j = 0; j < num; j++) {
        if (boggle[i][j] === words[counter][0]) {

          var coori = i
          var coorj = j
          var potong0 = words[counter].slice(1)

          var cek = checkKeliling(coori,coorj,potong0,boggle)

          if (checkKeliling(coori,coorj,potong0,boggle) === true) {
            boggle[i][j] = words[counter][0]
            arrFound.push(words[counter])
            break;
          }
          else if (checkKeliling(coori,coorj,potong0,boggle) === false) {
            boggle[coori][coorj] = words[counter][0]
          }
        }
      }

      if(cek === true) {
        break
      }
    }
  }

  console.log(boggle);
  if (arrFound.length > 0) {

    console.log(arrFound.length +  ' kata ditemukan :');
    for (var i = 0; i < arrFound.length; i++) {
      console.log(arrFound[i]);
    }
  }
  else{
    console.log('Tidak menemukan kata');
  }
}

function checkKeliling(coori,coorj,potong0,boggle) {

  var atasi = coori + 1
  var bawahi = coori - 1

  var atasj = coorj + 1
  var bawahj = coorj - 1

  var words = potong0

  if (potong0.length > 0) {

    if (bawahi < 0) {
      bawahi = coori
    }
    else if (atasi > boggle.length-1) {
      atasi = coori
    }

    if (bawahj < 0){
      bawahj = coorj
    }
    else if (atasj > boggle.length-1) {
      atasj = coorj
    }

    for (var i = bawahi; i <= atasi; i++){
      for (var j = bawahj; j <= atasj; j++){

        if (potong0[0] === boggle[i][j]) {

          var coori = i
          var coorj = j

          var potong0 = words.slice(1)

          var cek = checkKeliling(coori,coorj,potong0,boggle)

          if (cek === true) {
            boggle[coori][coorj] = words[0]
            return true
          }
          else if (cek === false) {
            boggle[i][j] = words[0]
          }
        }
      }
    }
  }

  else {
    return true;
  }

  cek = false
  return cek;

}

var data = ["ABA","ABAD","ABADI","ABAH","ABAI","ABAL","AKUSTIKA","AKUT","AKWAL","AL","ALA","ALABANGKA","ALABIO","ALAF","ALAH",
"DENYUT","DEODORAN","DEOKNUMISASI","DEONTOLOGI","DEP","DEPA","DEPAK","DEPALATALISASI","DEPAN","DEPANG","DEPAP","DEPARPOLISASI","DEPARTEMEN","DEPARTEMENTAL","DEPARTEMENTALISASI","DEPENDEN","DEPENDENSI","DEPERSONALISASI","DEPERSONIFIKASI","DEPIGMENTASI","DEPILASI","DEPLESI","DEPO","DEPOLARISASI","DEPOLITISASI",
"DEPONIR","DEPOPULASI","DEPORTASI","DEPOSAN","DEPOSIT","DEPOSITO","DEPOT","DEPRESI","DEPRESIASI","DEPRESOR","DEPROK","DEPROTONASI","DEPUN","DEPUS","DEPUTASI","DEPUTI","DERA","DERAGEM","DERAI","DERAJAH","DERAJANG","DERAJAT",]

// var boggle = new boggle(data, length)

solve(data , 20);
// console.log(board(6))
