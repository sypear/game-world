"use strict";

const BG_COLOR = "#DEA5A4";
const COLOR_WHITE = "#FFF";

let turn = "PC"; // 게임 차례
let point = 0; // 사용자 획득 점수
let answerCount = 1; // 정답 개수
let answerArr = []; // 정답을 저장하는 배열
let playerSelectionCount = 0; // 사용자 선택 횟수
let isClick = false;

// 게임 시작
function startGame() {
    // 랜덤으로 정답 만들기
    createAnswer();
    
    // PC가 먼저 정답 선택
    selectAnswerOnPC();
}

// 게임 재시작
function restartGame() {
    initGame();
    initScreen();
    startGame();
}

// 게임 종료
function stopGame() {
    showGameResult();
}

// 게임 설정 초기화
function initGame() {
    turn = "PC";
    point = 0;
    answerCount = 1;
    answerArr = [];
    playerSelectionCount = 0;
}

// 게임 화면 초기화
function initScreen() {
    changeClickFlag(false);
    
    turnText.innerHTML = turn;
    pointText.innerHTML = point;
}

// 게임 턴 변경 후 화면 갱신
function changeTurn(changeValue) {
    turn = changeValue;
    turnText.innerHTML = turn;

    if (turn === "YOU") {
        turnText.classList.remove("blink");
        void turnText.offsetWidth;
        turnText.classList.add("blink");
    }

    // 눌려있는 버튼이 있다면 하얀색 배경으로 변경
    for (let i = 0; i < items.length; i++) {
        if (items[i].style.backgroundColor !== "rgb(255, 255, 255)") {
            items[i].style.backgroundColor = COLOR_WHITE;
        }
    }
}

// 점수 추가 후 화면 갱신
function addPoint(addValue) {
    point += addValue;
    pointText.innerHTML = point;
}

// 클릭 여부 변경
function changeClickFlag(flagValue) {
    let cursorStyle = "pointer";

    isClick = flagValue;

    if (isClick === false) {
        cursorStyle = "auto";
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.cursor = cursorStyle;
    }
}

// 정답 만들기
function createAnswer() {
    for (let i = 0; i < answerCount; i++) {
        answerArr.push(getRandom(9, 0));
    }
}

// PC가 정답 선택
const items = document.getElementsByClassName("item");

function selectAnswerOnPC() {
    let cnt = 0;

    let selectAnswerPromise = new Promise((resolve, reject) => {
        let selectAnswerTimer = setInterval(() => {
            // 배경색이 변하는 애니메이션 재시작을 위해 이미 bgChange 클래스가 부착되어 있다면 제거
            if (items[answerArr[cnt]].classList.contains("bgChange")) {
                items[answerArr[cnt]].classList.remove("bgChange");
                void items[answerArr[cnt]].offsetWidth;
            }

            items[answerArr[cnt++]].classList.add("bgChange");

            if (cnt === answerCount) {
                clearInterval(selectAnswerTimer);
    
                resolve();
            }
        }, 800);
    });

    selectAnswerPromise.then(() => {
        // selectAnswerPromise 성공인 경우 실행할 코드
        setTimeout(waitGameStart, 800);
    });
}

// 게임 시작 전 대기
function waitGameStart() {
    // 정답 아이템에 배경색이 변하는 애니메이션을 주기 위해 부착했던 bgChange 클래스 제거
    for (let i = 0; i < answerArr.length; i++) {
        if (items[answerArr[i]].classList.contains("bgChange")) {
            items[answerArr[i]].classList.remove("bgChange");
        }
    }

    changeClickFlag(true);
    changeTurn("YOU");
}

// 난수 생성
function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
}

// 사용자 클릭 이벤트
const itemWrapper = document.getElementsByClassName("item-wrapper")[0];

itemWrapper.addEventListener("click", function(e) {
    // isClick 값이 false면 클릭 이벤트가 발생하지 않도록 함
    if (isClick === false) {
        return;
    }

    let targetId = parseInt(e.target.dataset.id);

    checkCorrectAnswer(targetId);
});

function checkCorrectAnswer(targetId) {
    // 사용자가 선택한 블록의 id와 정답이 일치하면 맞은 것으로 판단
    if (targetId === answerArr[playerSelectionCount++]) {
        // 사용자의 선택 횟수가 정답 개수(PC의 선택값 개수)와 같아지면 전부 맞은 것으로 판단
        if (playerSelectionCount === answerCount) {
            clearStage();
        }
    } else {
        stopGame();
    }
}

// 스테이지 클리어
const stageClearImg = document.getElementsByClassName("stage-clear")[0];

function clearStage() {
    // 설정값 재설정
    answerCount++;
    answerArr = [];
    playerSelectionCount = 0;
    addPoint(10); //점수 추가

    // 클릭 이벤트가 발생하지 않도록 설정 및 커서 스타일 변경
    changeClickFlag(false);

    stageClearImg.classList.add("show");

    // 2초 후 다음 스테이지 시작
    setTimeout(() => {
        stageClearImg.classList.remove("show");
        changeTurn("PC"); // 턴 변경

        startGame();
    }, 2000);
}

// 게임 종료 시 출력 문구
const modal = document.getElementsByClassName("modal")[0];

function showGameResult() {
    let resultText = "";

    if (point <= 20) {
        resultText = "한 눈 팔면 안돼요!";
    } else if (point > 20 && point <= 40) {
        resultText = "집중력을 좀 더 높여볼까요?<br/>ฅʕ•ㅅ•ʔฅ<br/><br/>곰돌이가 당신을 응원합니다.";
    } else if (point > 40 && point <= 60) {
        resultText = "눈을 크게 뜨고 다시 해봅시다!<br/>Ꮚ•̀ꈊ•́Ꮚ<br/><br/>귀여운 양이 당신을 응원합니다.";
    } else if (point > 60 && point <= 80) {
        resultText = "조금만 더 힘내요!<br/>^   ^<br/>(◕ㅅ◕｡)<br/><br/>냥냥이가 당신을 응원합니다.";
    } else if (point > 80 && point <= 120) {
        resultText = "더 할 수 있어요!<br/>૮ฅ・ﻌ・აฅ<br/><br/>댕댕이가 당신을 응원합니다.";
    } else if (point > 120 && point <= 170) {
        resultText = "ㄴ(°0°)ㄱ<br/>상상도 못한 정체<br/><br/>엄청난 기억력을<br/>가지셨네요!";
    } else if (point > 170) {
        resultText = "(๑°ㅁ°๑)ﾉ<br/>어쩌면 당신의 지능,<br/>컴퓨터보다 좋을지도..";
    }

    modalTitle.innerHTML = `
    <h1 class="modal__content-title--result color-red">
        게임 종료!
    </h1>
    <span class="modal__content-title--stage">
        당신의 IQ : <strong>${point}</strong>
    </span>
    <p class="modal__content-title--desc">
        ${resultText}
    </p>
    `;

    modal.classList.add("show");
}

// 모달창 닫으면 게임 재시작
const modalTitle = document.getElementsByClassName("modal__content-title")[0];
const modalCloseButton = document.getElementsByClassName("modal__content-close-button")[0];

modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalCloseButton) {
        modal.classList.remove("show");
        restartGame();
    }
});

// isClick이 ture인 경우에만 CSS hover와 비슷한 효과를 주기 위해 JS로 구현
// 아이템 요소에 마우스 over 시
itemWrapper.addEventListener("mouseover", function(e) {
    if (isClick === false) {
        return;
    }

    if (e.target.classList.contains("item") === true) {
        e.target.style.backgroundColor = BG_COLOR;
    }
});

// 아이템 요소에 마우스 out 시
itemWrapper.addEventListener("mouseout", function(e) {
    if (isClick === false) {
        return;
    }

    if (e.target.classList.contains("item") === true) {
        e.target.style.backgroundColor = COLOR_WHITE;
    }
});

const turnText = document.getElementById("turn");
const pointText = document.getElementById("point");

window.onload = function() {
    turnText.innerHTML = turn;
    pointText.innerHTML = point;

    startGame();
}