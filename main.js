var validationOption = true;

//다음 주소찾기 API JS파일 불러옴
document.write(
  '<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>'
);

//다음 주소찾기 API JS 코드 시작
https: function daumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수s
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        //document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        //document.getElementById("sample6_extraAddress").value = "";
      }


      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("inputPostcode").value = data.zonecode;
      document.getElementById("inputAddress").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("intputDetailAddress").focus();
    },
  }).open();
}
//다음 주소찾기 API JS 코드 끝

// 정규표현식 사용 옵션 체크
function checkValidationOption(value) {
  validationOption = value;
  console.log("validationOption : " + validationOption);
}

function validationId() {
  var inputStr = document.getElementById("inputId").value;
  if (inputStr == "") {
    alert("아이디 입력은 필수사항입니다.")
    return false;
  }

  // 1번 옵션 - 정규표현식 사용
  if (validationOption) {
    //console.log(inputStr);
    var exceptWord = /[^a-zA-Z0-9]/; // 공백 및 특수문자 정규식
    var regexpValue = /^[a-zA-Z][a-zA-Z0-9]{3,11}/; //첫글자 영문 대소문자, 4자~12자의 영문 대소문자 숫자

    //정규식 확인
    if (exceptWord.test(inputStr)) {
      console.log("validationId : False");
      alert("특수문자 및 공백은 입력이 불가능합니다.");
      return false;
    } else {
      console.log("validationId : " + regexpValue.test(inputStr));
      if (!regexpValue.test(inputStr)) {
        alert("첫글자 영문 대소문자, 4자~12자의 영문 대소문자 숫자로 입력하세요")
        return false;
      }
    }
  }
  // 2번 옵션 정규표현식 미사용
  else if (!validationOption) {
    //function makeStrArray(startWord, endWord) 
    //function checkString(strValue, strForCheck, startIndex, endIndex, lengthMin, lengthMax)

    var regexpValue = makeStrArray("a", "z") + makeStrArray("A", "Z") + makeStrArray("0", "9");

    //정규식 확인
    // 특수문자 및 공백 확인
    if (!checkString(inputStr, regexpValue, 0, -1, -1, -1)) {
      console.log("validationId : False");
      alert("특수문자 및 공백은 입력이 불가능합니다.");
      return false;
    } else {
      //글자수 확인
      if (!(inputStr.length >= 4 && inputStr.length <= 12)) {
        alert("4자~12자의 영문 대소문자 숫자로 입력하세요3")
        return false;
      }

      var checkValue = checkString(inputStr, makeStrArray("a", "z") + makeStrArray("A", "Z"), 0, 0, -1, -1);
      console.log("validationId : " + checkValue);
      // 첫글자 영문 대소문자 확인
      if (!checkValue) {
        alert("첫글자 영문 대소문자로 입력하세요1")
        return false;
      }
      checkValue = checkString(inputStr, regexpValue, 1, -1, -1, -1);
      //나머지 확인
      if (!checkValue) {
        alert("첫글자 영문 대소문자, 4자~12자의 영문 대소문자 숫자로 입력하세요2")
        return false;
      }

    }

  }

  return true;
}

function validationPwd() {
  var inputStr = document.getElementById("inputPwd1").value;
  if (inputStr == "") {
    alert("비밀번호 입력은 필수사항입니다.");
    return false;
  }

  // 1번 옵션 - 정규표현식 사용
  if (validationOption) {
    var exceptWord = /[^a-zA-Z0-9]/; // 공백 및 특수문자 정규식
    var regexpValue = /[a-zA-Z0-9]{4,12}/; //4자~12자의 영문 대소문자 숫자
    if (exceptWord.test(inputStr)) {
      console.log("validationPwd : False");
      alert("특수문자 및 공백은 입력이 불가능합니다.");
      return false;
    } else {
      console.log("validationPwd : " + regexpValue.test(inputStr));
      if (!regexpValue.test(inputStr)) {
        alert("4자~12자의 영문 대소문자 숫자로 입력하세요")
        return false;
      }
    }
  }
  // 2번 옵션 - 정규표현식 미사용
  else if (!validationOption) {
    //function makeStrArray(startWord, endWord)
    //function checkString(strValue, strForCheck, startIndex, endIndex, lengthMin, lengthMax)

    var regexpValue = makeStrArray("a", "z") + makeStrArray("A", "Z") + makeStrArray("0", "9");

    //정규식 확인
    // 특수문자 및 공백 확인
    if (!checkString(inputStr, regexpValue, 0, -1, -1, -1)) {
      console.log("validationId : False");
      alert("특수문자 및 공백은 입력이 불가능합니다.");
      return false;
    } else {
      //글자수 확인
      if (!(inputStr.length >= 4 && inputStr.length <= 12)) {
        alert("4자~12자의 영문 대소문자 숫자로 입력하세요3")
        return false;
      }
      checkValue = checkString(inputStr, regexpValue, 1, -1, -1, -1);
      //나머지 확인
      if (!checkValue) {
        alert("첫글자 영문 대소문자, 4자~12자의 영문 대소문자 숫자로 입력하세요2")
        return false;
      }

    }
  }

  return true;
}

function checkPwd() {
  var oriPwd = document.getElementById("inputPwd1").value;
  var confirmPwd = document.getElementById("inputPwd2").value;
  var correctPwd = false;

  if (confirmPwd == "") {
    alert("비밀번호확인 입력은 필수사항입니다.");
    return false;
  }

  if (oriPwd == confirmPwd) {
    correctPwd = true;
  }
  else {
    alert("비밀번호가 같지 않습니다.")
    return false;
  }
  console.log("checkPwd : " + correctPwd);

  return true;
}

function validationMail() {
  var inputStr = document.getElementById("inputMail").value;
  if (inputStr == "") {
    alert("이메일 입력은 필수사항입니다.");
    return false;
  }

  //정규식 사용
  if (validationOption) {
    var exceptWord = /[^a-zA-Z0-9@._\-]/; // 공백 및 특수문자 정규식
    var regexpValue = /([\w_\-]+)@([\w_\-]+)(\.[\w_\-]+)+$/; //4자~12자의 영문 대소문자 숫자
    if (exceptWord.test(inputStr)) {
      alert("잘못된 이메일 형식입니다.");
      console.log("validationMail : False");
      return false;
    } else {
      console.log("validationMail : " + regexpValue.test(inputStr));
      if (!regexpValue.test(inputStr)) {
        alert("잘못된 이메일 형식입니다.")
        return false;
      }
    }
  }
  //정규식 미사용 
  else if (!validationOption) {
    var exceptWord = makeStrArray("a", "z") + makeStrArray("A", "Z") + makeStrArray("0", "9") + "@._-"; // 공백 및 특수문자
    var regexpValue = makeStrArray("a", "z") + makeStrArray("A", "Z") + makeStrArray("0", "9") + "-_"; //영문 대소문자 숫자 -_ 문자
    var middleIndex = new Array();
    if (!checkString(inputStr, exceptWord, 0, -1, -1, -1)) {
      alert("잘못된 이메일 형식입니다.");
      console.log("validationMail : False");
      return false;
    } else {
      if (inputStr.indexOf("@") == inputStr.indexOf("@")) {
        middleIndex[0] = inputStr.indexOf("@");
      }
      else {
        alert("잘못된 이메일 형식입니다.");
        return false;
      }

      if (!checkString(inputStr, regexpValue, 0, middleIndex[0] - 1, 1, -1)) {
        alert("잘못된 이메일 형식입니다.");
        return false;
      } else {
        while (true) {
          middleIndex[1] = inputStr.indexOf(".", middleIndex[0] + 2);
          if (checkString(inputStr, regexpValue, middleIndex[0] + 1, middleIndex[1] - 1, -1, -1)) {
            if (inputStr.indexOf(".", middleIndex[1] + 1)) {
              middleIndex[0] = middleIndex[1];
              continue;
            }
            else {
              if (!checkString(inputStr, regexpValue, middleIndex[0] + 1, -1, -1, -1)) {
                alert("잘못된 이메일 형식입니다.");
                return false;
              }
              else {
                break;
              }
            }
          }
        }
      }
    }
  }


  return true;
}

function validationName() {
  var inputStr = document.getElementById("inputName").value;
  if (inputStr == "") {
    alert("이름 입력은 필수사항입니다.");
    return false;
  }

  if (validationOption) {
    var regexpValue = /^[가-힣]{2,10}$/; // 한글 정규식

    if (!regexpValue.test(inputStr)) {
      alert("잘못된 이름 형식입니다.");
      return false;
    }
    console.log("validationName : " + regexpValue.test(inputStr));
  }
  else if (!validationOption) {
    var regexpValue = makeStrArray("가", "힇"); // 한글 정규식

    if (inputStr.length >= 2 && inputStr.length <= 10) {
      if (!checkString(inputStr, regexpValue, 0, -1, -1, -1)) {
        alert("잘못된 이름 형식입니다.");
        console.log("validationName : false");
        return false;
      }
    }
    else {
      alert("잘못된 이름 형식입니다.");
      console.log("validationName : false");
      return false;
    }

  }


  return true;
}///////////

function validationAddress() {
  var inputPostcode = document.getElementById("inputPostcode").value;
  var inputAddress = document.getElementById("inputAddress").value;
  var intputDetailAddress = document.getElementById("intputDetailAddress").value;


  if ((inputPostcode == "") || (inputAddress == "")) {
    alert("주소 입력은 필수사항입니다.");
    console.log("checkAddress : false");
    return false;
  }

  if (validationOption) {
    var regexpValue = /[0-9]{5}/;
    if (!regexpValue.test(inputPostcode)) {
      alert("잘못된 우편번호 형식입니다.");
      return false;
    }
  }
  else if (!validationOption) {
    var regexpValue = makeStrArray("0", "9");
    if (checkString(inputPostcode, regexpValue, 0, -1, 5, 5)) {
      alert("잘못된 우편번호 형식입니다.");
      return false;
    }
  }


  console.log("checkAddress : true");
  return true;

}

function validationRegNumber() {
  var regNumber1 = document.getElementById("inputRegNum1").value;
  var regNumber2 = document.getElementById("inputRegNum2").value;

  if (regNumber1 == "" || regNumber2 == "") {
    alert("주민번호 입력은 필수사항입니다.");
    return false;
  }

  var regNumber3 = regNumber1 + regNumber2;

  //console.log("regNumber3" + " : " + regNumber3);

  var regNumber = new Array();

  for (var i = 0; i < 13; i++) {
    regNumber[i] = parseInt(regNumber3[i]);
    //console.log(i + " : " + regNumber[i]);
  }
  //0 1 2 3 4 5  6 7  |  8 9 10 11 12
  //A B C D E F  G H  |  I J K  L  M
  //2 3 4 5 6 7  8 9     2 3 4  5

  var sum = 0;
  for (var i = 2; i < 10; i++) {
    sum += i * regNumber[i - 2];
    //console.log(i + " * " + regNumber[i - 2] + " = " + i * regNumber[i - 2]);
    //console.log("sum : " + sum);
  }

  for (var i = 2; i < 6; i++) {
    sum += i * regNumber[i + 6];
    //console.log(sum);
  }

  var confirmValue = (11 - (sum % 11)) % 11;
  //console.log(confirmValue);

  var centuryValue;

  if (regNumber3[6] == 9 || regNumber3[6] == 0) {
    centuryValue = "18";

  }
  else if (regNumber3[6] == 1 || regNumber3[6] == 2) {
    centuryValue = "19";
  }
  else if (regNumber3[6] == 3 || regNumber3[6] == 4) {
    centuryValue = "20";
  }
  else if (regNumber3[6] == 5 || regNumber3[6] == 6) {
    centuryValue = "19";
  }
  else if (regNumber3[6] == 7 || regNumber3[6] == 8) {
    centuryValue = "20";
  }

  if (confirmValue == regNumber[12]) {
    console.log("validationRegNumber : True");
    document.getElementById("inputYear").value = centuryValue + regNumber1.slice(0, 2);
    document.getElementById("inputMonth").value = regNumber1.slice(2, 4);
    document.getElementById("inputDay").value = regNumber1.slice(4, 6);
  } else {
    alert("잘못된 주민번호 입니다.")
    console.log("validationRegNumber : False");
    return false;
  }

  return true;
}


function checkHoby() {
  var subject = document.getElementsByName("hobby");

  var count = 0;

  console.log("subject.length : ", subject.length);
  for (var i = 0; i < subject.length; i++) {
    if (subject[i].type == "checkbox" && subject[i].checked) {
      count++;
    }
  }

  //console.log(count);

  if (count == 0) {
    alert("관심분야를 1개 이상 선택하세요.")
    return false;
    console.log("checkHoby : False");
  } else {
    console.log("checkHoby : True");
  }
  return true;
}

function validationIntroduce() {
  var regexpStr = document.getElementById("inputIntroduce").value.length;
  console.log(regexpStr);

  if (regexpStr < 10) {
    alert("자기소개를 10자 이상 입력하세요.");
    console.log("validationIntroduce : false");
    return false;
  }
  console.log("validationIntroduce : true");
  return true;
}

function checkAllInput() {
  if (!validationId())
    return false;
  else if (!validationPwd())
    return false;
  else if (!checkPwd())
    return false;
  else if (!validationMail())
    return false;
  else if (!validationName())
    return false;
  else if (!validationAddress())
    return false;
  else if (!validationRegNumber())
    return false;
  else if (!checkHoby())
    return false;
  else if (!validationIntroduce())
    return false;
  else
    return true;
}


function makeStrArray(startWord, endWord) {
  startWordAscii = startWord.charCodeAt([0]);
  endWordAscii = endWord.charCodeAt([0]);
  console.log("makeStrArray : " + startWordAscii);
  console.log("makeStrArray : " + endWordAscii);

  var resultString = "";

  for (var i = startWordAscii; i < endWordAscii; i++) {
    resultString += String.fromCharCode(i);
  }

  console.log("makeStrArray : " + resultString);
  return resultString;
}

function checkString(strValue, strForCheck, startIndex, endIndex, lengthMin, lengthMax) {
  var resultArray = new Array();
  var count = 0;
  var countMax = 0;

  console.log("checkString : " + "strValue - " + strValue);
  console.log("checkString : " + "strForCheck - " + strForCheck);
  console.log("checkString : " + "strValue.length - " + strValue.length);
  if (endIndex == -1) {
    endIndex = strValue.length;
    console.log("checkString : " + "endIndex - " + endIndex);
  }
  else {
    endIndex += 1;
  }

  if (lengthMin == -1) {
    lengthMin = (endIndex - startIndex);
    console.log("checkString : " + "lengthMin - " + lengthMin);
  }

  if (lengthMax == -1) {
    lengthMax = (endIndex - startIndex);
    console.log("checkString : " + "lengthMax - " + lengthMax);
  }

  for (var i = startIndex; i < endIndex; i++) {
    for (var j = 0; j < strForCheck.length; j++) {
      if (strValue[i] == strForCheck[j]) {
        ++count;
        if (count > countMax) {
          countMax = count;
        }
        break;
      }
    }
  }
  console.log("checkString : " + "count - " + count);
  console.log("checkString : " + "countMax - " + countMax);


  if ((countMax >= lengthMin) && (countMax <= lengthMax)) {
    console.log("checkString : ture");
    return true;
  }
  else {
    console.log("checkString : false");
    return false;
  }



}