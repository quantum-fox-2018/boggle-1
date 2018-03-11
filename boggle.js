

function shake(num) {
  var array = [];
    for(var i = 0; i < num; i++) {
      var arrDalam = [];
      for(var j = 0; j < num; j++) {
        var alphabets = String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65));
        arrDalam.push(alphabets);
      }
      array.push(arrDalam);
    }
  return array;
}

function checkWords(words) {
  var arrDict = ['TES', 'LOG'];
  var boards = shake();
  console.log(boards);
  var arr = [];
  var arr2 = [];
  var arrAlp = [];
  var arridx = [];
  for(var i = 0; i < arrDict.length; i++) {
    for(var j = 0; j < boards.length; j++) {
      for(var k = 0; k < boards[j].length; k++) {
        if(arrDict[i].charAt(0) === boards[j][k]) {
          arridx.push(j);
          arridx.push(k);
          arr2.push(arridx);
          arridx = [];
        }
      }
    }
  }
  console.log(arr2);
}

console.log(checkWords());
