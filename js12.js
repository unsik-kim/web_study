function change() {
  var inputString = document.getElementById("text").value; // 입력 문자열 가져옴

  var colorSelect = document.getElementById("color"); // 색상 선택
  var color;
  for (var i = 0; i < colorSelect.options.length; i++) {
    if (colorSelect.options[i].selected == true) {
      color = colorSelect.options[i].value;
      inputString = inputString.fontcolor(color);
      break;
    }
  }

  var sizeSelect = document.getElementById("size"); // 사이즈 선택
  var size;
  for (var i = 0; i < sizeSelect.options.length; i++) {
    if (sizeSelect.options[i].selected == true) {
      size = sizeSelect.options[i].value;
      inputString = inputString.fontsize(size);
      break;
    }
  }

  var optionSelect = document.getElementsByName("option"); // 옵션 선택
  for (var i = 0; i < optionSelect.length; i++) {
    if (optionSelect[i].checked == true) {
      var option = optionSelect[i].value;
      switch (option) {
        case "1":
          inputString = inputString.strike(); // 취소선
          break;
        case "2":
          inputString = inputString.fontsize(null); // 폰트사이즈 삭제
          inputString = inputString.big(); // 크게
          break;
        case "3":
          inputString = inputString.fontsize(null);
          inputString = inputString.small(); // 작게
          break;
        case "4":
          inputString = inputString.bold(); // 두껍게
          break;
        case "5":
          inputString = inputString.italics(); // 기울임
          break;
        case "6":
          inputString = inputString.fontsize(null);
          inputString = inputString.sup(); // 위첨자
          break;
        case "7":
          inputString = inputString.fontsize(null);
          inputString = inputString.sub(); // 아래첨자
          break;
        case "8":
          inputString = inputString.toLowerCase(); // 소문자로
          break;
        case "9":
          inputString = inputString.toUpperCase(); // 대문자로
          break;
      }
    }
  }

  var str = inputString;
  document.getElementById("output").innerHTML = str;
}
