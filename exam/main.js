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
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}
//다음 주소찾기 API JS 코드 끝

function validationId() {
  var regexpStr = document.getElementById("inputId").value;
  if (regexpStr == "") {
    return 0;
  }
  console.log(regexpStr);
  var exceptWord = /[^a-zA-Z0-9]/; // 공백 및 특수문자 정규식
  var regexpValue = /^[a-zA-Z][a-zA-Z0-9]{3,11}/; //첫글자 영문 대소문자, 4자~12자의 영문 대소문자 숫자
  if (exceptWord.test(regexpStr)) {
    console.log("validationId : False");
  } else {
    console.log("validationId : " + regexpValue.test(regexpStr));
  }
}

function validationPwd() {
  var regexpStr = document.getElementById("inputPwd1").value;
  if (regexpStr == "") {
    return 0;
  }
  var exceptWord = /[^a-zA-Z0-9]/; // 공백 및 특수문자 정규식
  var regexpValue = /[a-zA-Z0-9]{4,12}/; //4자~12자의 영문 대소문자 숫자
  if (exceptWord.test(regexpStr)) {
    console.log("validationPwd : False");
  } else {
    console.log("validationPwd : " + regexpValue.test(regexpStr));
  }
}

function checkPwd() {
  var oriPwd = document.getElementById("inputPwd1").value;
  var confirmPwd = document.getElementById("inputPwd2").value;
  var correctPwd = false;

  if (oriPwd == confirmPwd) {
    correctPwd = true;
  }

  console.log("checkPwd : " + correctPwd);
}

function validationMail() {
  var regexpStr = document.getElementById("inputMail").value;
  if (regexpStr == "") {
    return 0;
  }
  var exceptWord = /[^a-zA-Z0-9@._\-]/; // 공백 및 특수문자 정규식
  var regexpValue = /([\w_\-]+)@([\w_\-]+)(\.[\w_\-]+)+$/; //4자~12자의 영문 대소문자 숫자
  if (exceptWord.test(regexpStr)) {
    console.log("validationMail : False1");
  } else {
    console.log("validationMail : " + regexpValue.test(regexpStr));
  }
}

function validationName() {
  var regexpStr = document.getElementById("inputName").value;
  if (regexpStr == "") {
    return 0;
  }
  var regexpValue = /^[가-힣]{2,4}$/; // 한글 정규식

  console.log("validationName : " + regexpValue.test(regexpStr));
}

function validationRegNumber() {
  var regNumber1 = document.getElementById("inputRegNum1").value;
  var regNumber2 = document.getElementById("inputRegNum2").value;

  var regNumber3 = regNumber1 + regNumber2;

  console.log("regNumber3" + " : " + regNumber3);

  var regNumber = new Array();

  for (var i = 0; i < 13; i++) {
    regNumber[i] = parseInt(regNumber3[i]);
    console.log(i + " : " + regNumber[i]);
  }
  //0 1 2 3 4 5  6 7  |  8 9 10 11 12
  //A B C D E F  G H  |  I J K  L  M
  //2 3 4 5 6 7  8 9     2 3 4  5

  var sum = 0;
  for (var i = 2; i < 10; i++) {
    sum += i * regNumber[i - 2];
    console.log(i + " * " + regNumber[i - 2] + " = " + i * regNumber[i - 2]);
    console.log("sum : " + sum);
  }

  for (var i = 2; i < 6; i++) {
    sum += i * regNumber[i + 6];
    console.log(sum);
  }

  var confirmValue = (11 - (sum % 11)) % 11;
  console.log(confirmValue);

  if (confirmValue == regNumber[12]) {
    console.log("validationRegNumber : True");
    document.getElementById("inputYear").value = regNumber1.slice(0, 2);
    document.getElementById("inputMonth").value = regNumber1.slice(2, 4);
    document.getElementById("inputDay").value = regNumber1.slice(4, 6);
  } else {
    console.log("validationRegNumber : False");
  }
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

  console.log(count);

  if (count == 0) {
    console.log("checkHoby : False");
  } else {
    console.log("checkHoby : True");
  }
}

function validationIntroduce() {
  var regexpStr = document.getElementById("inputIntroduce").value;
  console.log(regexpStr);
  var regexpValue = /[\w]{30,}/;

  console.log("validationIntroduce : " + regexpValue.test(regexpStr));
}
