var submit = document.querySelectorAll(".submit");
var tryNum = 1;
function getRandomAnswer() {
  var answerList = [
    ["ㅅ", "ㅣ", "ㄱ", "ㅅ", "ㅏ"],
    ["ㄱ", "ㅏ", "ㅁ", "ㅅ", "ㅏ"],
    ["ㅋ", "ㅔ", "ㅇ", "ㅣ", "ㅋ"],
    ["ㅌ", "ㅐ", "ㅅ", "ㅣ", "ㄱ"],
    ["ㅇ", "ㅕ", "ㄹ", "ㅡ", "ㅁ"],
    ["ㅇ", "ㅓ", "ㅁ", "ㅁ", "ㅏ"],
    ["ㅁ", "ㅓ", "ㄱ", "ㅇ", "ㅣ"],

    ["ㄱ", "ㅏ", "ㅁ", "ㅈ", "ㅏ"],
    // 다른 리스트들도 추가할 수 있음
  ];

  // 0 이상 답의길이 미만의 랜덤 정수를 구합니다.
  var randIndex = Math.floor(Math.random() * answerList.length);

  // 랜덤으로 선택된 답을 반환합니다.
  return answerList[randIndex];
}
// getRandomAnswer 함수를 호출하여 랜덤한 답을 얻습니다.
var randAnswer = getRandomAnswer();
console.log(randAnswer);

function submitClick() {
  var input = document.querySelectorAll(".input");
  var 답 = randAnswer;
  var answerCount = 0;
  document.querySelector(".tryNum").innerText = "시도횟수 : " + tryNum;
  console.log(답);
  for (i in 답) {
    if (input[i].value == 답[i]) {
      answerCount++;
      console.log(answerCount);
      input[i].style.background = "green";
    } else if (답.includes(input[i].value)) {
      input[i].style.background = "yellow";
    } else {
      input[i].style.background = "gray";
    }
    input[i].classList.remove("input");
  }
  if (answerCount == 5) {
    document.querySelector(".tryNum").innerText =
      "정답입니다!!!! 시도횟수: " + tryNum;

    var templateBtn = `<br/><button class="btn-two red rounded" onclick="regame()">다시하기</button><button class="btn-two yellow rounded" onclick="regame">공유하기</button>`;

    document
      .querySelector(".content")
      .insertAdjacentHTML("beforeend", templateBtn);
  } else {
    tryNum++;

    var template = `<div class="inputs">
          <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
          <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
          <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
          <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
          <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
          </div>`;
    document
      .querySelector(".content")
      .insertAdjacentHTML("beforeend", template);
  }
}
// submit.addEventListener("click", function () {
//   var input = document.querySelectorAll(".input");
//   var 답 = randAnswer;
//   var answerCount = 0;
//   document.querySelector(".tryNum").innerText = "시도횟수 : " + tryNum;
//   console.log(답);
//   for (i in 답) {
//     if (input[i].value == 답[i]) {
//       answerCount++;
//       console.log(answerCount);
//       input[i].style.background = "green";
//     } else if (답.includes(input[i].value)) {
//       input[i].style.background = "yellow";
//     } else {
//       input[i].style.background = "gray";
//     }
//     input[i].classList.remove("input");
//   }
//   if (answerCount == 5) {
//     document.querySelector(".tryNum").innerText =
//       "정답입니다!!!! 시도횟수: " + tryNum;

//     var templateBtn = `<br/><button class="btn-two red rounded" onclick="regame()">다시하기</button><button class="btn-two yellow rounded" onclick="regame">공유하기</button>`;

//     document
//       .querySelector(".content")
//       .insertAdjacentHTML("beforeend", templateBtn);
//   } else {
//     tryNum++;

//     var template = `<div class="inputs">
//           <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
//           <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
//           <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
//           <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
//           <input type="text" class="input" maxlength="1" oninput="checkKorean(this)"/>
//           </div>`;
//     document
//       .querySelector(".content")
//       .insertAdjacentHTML("beforeend", template);
//   }
// });
function regame() {
  location.reload();
}
function checkKorean(inputElement) {
  // 입력값을 가져옵니다.
  const inputValue = inputElement.value;

  // 한글 정규식을 사용하여 입력값이 한글인지 검사합니다.
  const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
  if (!koreanRegex.test(inputValue)) {
    // 한글이 아닌 경우, 입력값에서 한글이 아닌 문자를 제거합니다.
    inputElement.value = inputValue.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
  } else {
    // 입력값이 한글인 경우에만 다음 input 요소로 포커스를 이동합니다.
    if (inputValue.length === inputElement.maxLength) {
      const inputs = document.querySelectorAll(".input");
      const currentIndex = Array.from(inputs).indexOf(inputElement);
      if (currentIndex !== -1 && currentIndex + 1 < inputs.length) {
        inputs[currentIndex + 1].focus();
      }
    }
  }
}
