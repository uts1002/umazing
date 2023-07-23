var startBtn = document.querySelector("#startBtn");
var sMain = document.querySelector("#main");
var sQna = document.querySelector("#qna");
var sResult = document.querySelector("#result");
var resultList = [];
var timer; // 전역 범위로 timer 변수 선언

let qIndex = 0;
startBtn.addEventListener("click", startTest);

window.addEventListener("resize", function () {
  var parentWidth = document.querySelector("#main").offsetWidth;
  var child = document.querySelector("#h1");
  child.style.fontSize = parentWidth / 20 + "px";
});

// 초기 로드 시에도 폰트 크기 조절
window.dispatchEvent(new Event("resize"));

//
//
//
//스타트버튼 누를때 이제 시작~

var allButtons = document.querySelectorAll("button");

function disableButtons() {
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = true; // 버튼 비활성화
  }
}
function enableButtons() {
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = false; // 버튼 활성화
  }
}

function startTest() {
  disableButtons();
  sMain.style.WebKitAnimation = "fadeOut 1s";
  sMain.style.animation = "fadeOut 1s";
  setTimeout(() => {
    sQna.style.WebKitAnimation = "fadeIn 1s";
    sQna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      sMain.style.display = "none";
      sQna.style.display = "flex";
    }, 450);
  }, 450);

  initializeProgress();
  goNext(qIndex);
  // sMain.style.display = "none";
  // sQna.style.display = "block";
}
function initializeProgress() {
  var statusbar = document.querySelector(".statusbar");
  var progressText = document.querySelector(".progress-text");

  var totalQuestions = qnaList.length;
  var currentQuestion = qIndex + 1;

  var progressPercent = (currentQuestion / totalQuestions) * 100;
  statusbar.style.width = progressPercent + "%";

  progressText.innerText = `${currentQuestion}/${totalQuestions}`;
}

function goNext(qIndex) {
  var q = document.querySelector(".q");
  q.innerHTML = qnaList[qIndex].q;

  // console.log(qnaList[qIndex].a);
  for (let i in qnaList[qIndex].a) {
    // console.log(qnaList[qIndex].a[i].answer);
    addAnswer(qnaList[qIndex].a[i].answer);
  }

  disableButtons();

  initializeProgress();
}

function addAnswer(aText) {
  var a = document.querySelector(".a");
  var answer = document.createElement("button");
  answer.classList.add("answerBtn");
  a.appendChild(answer);

  disableButtons();

  answer.innerHTML = aText;
  answer.addEventListener("click", function () {
    disableButtons();
    chooseAnswer(aText);
  });
}

function chooseAnswer(aIndex) {
  for (var i = 0; i < qnaList.length; i++) {
    var answers = qnaList[i].a;
    for (var j = 0; j < answers.length; j++) {
      if (answers[j].answer === aIndex) {
        var answerIndex = j;
        var selectedTypes = answers[answerIndex].type;
        resultList.push(...selectedTypes); // type 값을 resultList 배열에 추가
      }
    }
  }

  if (qIndex < qnaList.length - 1) {
    qIndex++; // 다음 질문으로 인덱스 증가
    sQna.style.WebKitAnimation = "fadeOut 0.5s";
    sQna.style.animation = "fadeOut 0.5s";

    clearTimeout(timer); // 타이머 중지
    setTimeout(function () {
      var q = document.querySelector(".q");
      var a = document.querySelector(".a");
      q.innerHTML = "";
      a.innerHTML = "";
      sQna.style.WebKitAnimation = "fadeIn 0.5s";
      sQna.style.animation = "fadeIn 0.5s";
      goNext(qIndex); // 다음 질문으로 넘어감
    }, 490);
  } else {
    resultLoad();
  }
  initializeProgress();
}

function resultLoad() {
  var q = document.querySelector(".q");
  var a = document.querySelector(".a");

  var sttbar = document.querySelector(".statusbar");
  var wrapsttbar = document.querySelector(".wrap-statusbar");
  var prgtext = document.querySelector(".progress-text");

  q.innerHTML = `<p>결과 분석중입니다.</p> <div class="loading-spinner"></div>`;
  a.innerHTML = "";

  sttbar.style.display = "none";
  wrapsttbar.style.display = "none";
  prgtext.style.display = "none";
  timer = setTimeout(() => {
    sQna.style.WebKitAnimation = "fadeOut 1s";
    sQna.style.animation = "fadeOut 1s";
    setTimeout(() => {
      sQna.style.display = "none";
      sResult.style.WebKitAnimation = "fadeIn 1s";
      sResult.style.animation = "fadeIn 1s";
      sResult.style.display = "flex";
    }, 990);
    enableButtons();
    resultShow();
  }, 3000);
}

function countOccurrences(arr, value) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      count++;
    }
  }
  return count;
}

function resultShow() {
  var counts = {};
  for (var i = 0; i < resultList.length; i++) {
    var element = resultList[i];
    if (counts[element]) {
      counts[element]++;
    } else {
      counts[element] = 1;
    }
  }

  var maxCount = 0;
  var mostFrequentElement;
  for (var element in counts) {
    if (counts[element] > maxCount) {
      maxCount = counts[element];
      mostFrequentElement = element;
    }
  }
  var philList = [
    "아리스토텔레스",
    "존 로크",
    "데이빗 흄",
    "칼 마르크스",
    "존 스튜어트 밀",
    "닉코스 카잔차키스",
    "르네 데카르트",
    "스피노자",
    "지그문트 프로이트",
  ];
  var finalAnswer = philList.indexOf(mostFrequentElement);
  var faName = infoList[finalAnswer].name;
  var faDesc = infoList[finalAnswer].desc;
  var faIsm = infoList[finalAnswer].ism;
  var faBook = infoList[finalAnswer].book;
  var faSimilar = infoList[finalAnswer].similar;
  var faImgUrl = infoList[finalAnswer].img;
  var faLink = infoList[finalAnswer].link;
  var resultBoxName = document.querySelector(".resultBoxName");
  var resultBoxDesc = document.querySelector(".resultBoxDesc");
  var resultBoxIsm = document.querySelector(".resultBoxIsm");
  var resultBoxBook = document.querySelector(".resultBoxBook");
  var resultBoxSimilar = document.querySelector(".resultBoxSimilar");
  resultBoxName.innerText = faName;
  resultBoxDesc.innerText = faDesc;
  resultBoxIsm.innerText = faIsm;
  resultBoxBook.innerText = faBook;
  resultBoxSimilar.innerText = faSimilar;
  var wikiLink = document.querySelector("#wikilink");
  wikiLink.setAttribute("href", faLink);
  var resultImg = document.querySelector("#resultImg");
  resultImg.src = faImgUrl;
}

var restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function () {
  location.reload(); // 페이지 새로고침
});
