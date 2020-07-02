var arrayData = new Array();

function funcInput() {
  var strInput = document.getElementById("input").value;
  var number = parseInt(strInput);

  if (isNaN(number) == false) {
    arrayData.push(number);
  } else {
    alert("숫자만 입력하시오!");
  }
  funcUpdateArray(number);
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
  arrayData.sort(function (a, b) {
    // 오름차순
    return a - b;
  });
  funcAlert(4);
  funcUpdateArray();
}

function funcUpdateArray() {
  var objOutput = document.getElementById("output");

  objOutput.innerHTML = arrayData;
}
