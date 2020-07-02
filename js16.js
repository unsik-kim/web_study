var arrayData = new Array();

function funcInput() {
  var strInput = document.getElementById("input").value;

  arrayData.push(strInput);

  funcUpdateArray();
}

function funcAlert(num, strInput = "") {
  var resultStr;
  switch (num) {
    case 1:
      resultStr = "요소 " + strInput + " shift";
      break;
    case 2:
      resultStr = "요소 " + strInput + " pop";
      break;
    case 3:
      resultStr = "reverse 완료";
      break;
    case 4:
      resultStr = "sort 완료";
      break;
  }
  alert(resultStr);
}

function funcShift() {
  funcAlert(1, arrayData.shift());
  funcUpdateArray();
}

function funcPop() {
  funcAlert(2, arrayData.pop());
  funcUpdateArray();
}

function funcReverse() {
  funcAlert(3, arrayData.reverse());
  funcUpdateArray();
}

function funcSort() {
  funcAlert(4, arrayData.sort());
  funcUpdateArray();
}

function funcUpdateArray() {
  var objOutput = document.getElementById("output");

  objOutput.innerHTML = arrayData;
}
