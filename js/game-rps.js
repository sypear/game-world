"use strict";

// 게임 기본 스피드 0.3초로 설정
let speed = 300;

// 게임 회차 및 승패 정보 저장
let count = 0;
let winCount = 0;
let drawCount = 0;
let loseCount = 0;
let playerScore = 0;
let pcScore = 0;

let playerLife = 3;

let timer = 0;
let lastPcSelection = "";
let pcSelection = "";

function changePcSelection() {
    // 생성된 난수를 PC의 선택 값으로 설정
    // 이전 값과 동일하지 않은 경우에만 PC가 선택하도록 구현
    while (true) {
        pcSelection = getRandom();

        if (pcSelection !== lastPcSelection) {
            lastPcSelection = pcSelection; // 다음 순서에 비교값으로 사용하기 위하여 저장
            break;
        }
    }

    // 화면 이미지 변경
    switch (pcSelection) {
        case 0:
            pcImage.src = "img/game-rps/scissors.png";
            pcImage.alt = "컴퓨터 선택: 가위";
            break;

        case 1:
            pcImage.src = "img/game-rps/rock.png";
            pcImage.alt = "컴퓨터 선택: 바위";
            break;

        case 2:
            pcImage.src = "img/game-rps/paper.png";
            pcImage.alt = "컴퓨터 선택: 보";
            break;

        default:
    }
}

// 난수 생성 함수
function getRandom() {
    return parseInt(Math.random() * 3); // (max - min) + min : max는 3, min은 0
}

// 사용자가 가위 바위 보 버튼 클릭 시 결과 출력 및 점수 추가
const buttonWrapper = document.getElementsByClassName("game__button-wrapper")[0];
const scissorsButton = document.getElementById("scissors-button");
const rockButton = document.getElementById("rock-button");
const papersButton = document.getElementById("paper-button");

let closeTimerState = 0;

buttonWrapper.addEventListener("click", function(e) {
    let playerSelection = "";

    // 사용자가 선택한 버튼에 따라 사용자 선택 값 설정
    if (e.target === scissorsButton) {
        playerSelection = 0;
    } else if (e.target === rockButton) {
        playerSelection = 1;
    } else if (e.target === papersButton) {
        playerSelection = 2;
    } else {
        return;
    }

    rockPaperSissors(playerSelection);
});

// 가위 바위 보 메인 계산 함수
function rockPaperSissors(playerSelection) {
    // 게임 카운트 +1
    count++;

    // Interval 정지
    clearInterval(timer);

    // 대진 결과 판단 (사용자 패 : 0, 무 : 1, 사용자 승 : 2)
    let result = checkMatchResult(playerSelection, pcSelection);

    // 대진 결과 화면에 출력
    showMatchResult(result, playerSelection, pcSelection);

    // 기회가 없으면 게임 종료
    if (playerLife === 0) {
        initGame();
    }

    // 모달 종료 시 게임 재시작
    restartGameAfterExitModal();
}

// 대진 결과를 판단하는 함수 (가위 : 0, 바위 : 1, 보 : 2)
function checkMatchResult(player, pc) {
    let result = player - pc;

    if (result === 0) {                              // 무승부인 경우
        drawCount++;
        return 1;
    } else if (result === -2 || result === 1) {       // 사용자가 승리한 경우
        winCount++;
        return 2;
    } else if (result === -1 || result === 2) {       // 사용자가 패배한 경우
        loseCount++;
        return 0;
    }
}

// 대진 결과를 화면에 출력하는 함수
const modal = document.getElementsByClassName("modal")[0];
const modalTitle = document.getElementsByClassName("modal__content-title")[0];

const playerScoreItem = document.getElementById("score-player");
const pcScoreItem = document.getElementById("score-pc");

function showMatchResult(result, player, pc) {
    // 화면에 점수 갱신
    if (result !== 1 || result !== null) {
        calculateScore(result);
    }

    // 남은 기회 갱신 (이기면 +1, 지면 -1)
    if (result === 0) {
        playerLife -= 1;
    } else if (result === 2) {
        playerLife += 1;
    }
    playerLifeItem.innerText = playerLife;

    // 모달에 대진 결과 대입
    if (playerLife > 0) {
        showRoundResult(result, player, pc);
    } else {
        showGameResult();
    }
}

// 한 라운드 종료 시 출력 문구
function showRoundResult(result, player, pc) {
    let colorList = ["color-red", "color-green", "color-blue"];
    let heartList = ["./img/common/broken-heart.png", "", "./img/common/heart.png"]
    let resultList = ["패배", "무승부", "승리"];
    let rpsList = ["✌", "✊", "✋"];

    modalTitle.innerHTML = `
        <h1 class="modal__content-title--result ${colorList[result]}">
            ${resultList[result]}!<br />
        </h1>
        <figure class="modal__content-title--result-life">
            <img class="modal__content-title--result-life-img" src="${heartList[result]}" onerror="this.style.display='none'" />
        </figure>
        <p class="modal__content-title--desc">
            PC : ${rpsList[pc]}<br />
            Player : ${rpsList[player]}
        </p>
    `;

    const resultLifeItem = document.getElementsByClassName("modal__content-title--result-life")[0];

    resultLifeItem.style.animation = "blinkingEffect 400ms 6 alternate";

    modal.classList.add("show");
}

// 게임 종료 시 출력 문구
function showGameResult() {
    time = 10;

    modalTitle.innerHTML = `
    <h1 class="modal__content-title--result color-red">
        게임 종료!
    </h1>
    <span class="modal__content-title--score">
        점수 : <strong>${playerScore}</strong>점
    </span>
    <p class="modal__content-title--desc">
        총 ${count}번의 대결 동안<br />
        <span class="color-blue">${winCount}번</span>의 승리<br />
        <span class="color-red">${loseCount}번</span>의 패배<br />
        <span class="color-green">${drawCount}번</span>의 무승부가<br />
        있었습니다.
    </p>
    `;

    modal.classList.add("show");
}

// 점수 계산 후 화면에 갱신하는 함수
function calculateScore(result) {
    if (result === 2) {
        playerScore += 10;
        playerScoreItem.innerText = playerScore;
    } else if (result === 0) {
        pcScore += 10;
        pcScoreItem.innerText = pcScore;
    }
}

// 5초 동안 결과를 출력하는 모달 창이 닫히면 게임을 재시작 하는 함수
const timeRemain = document.getElementById("time-remain");

let closeTimer = 0;
let time = 5;

function restartGameAfterExitModal() {
    timeRemain.innerText = time;

    closeTimer = setInterval(() => {
        timeRemain.innerText = --time;

        if (time === 0) {
            modal.classList.remove("show");
            restartGame();
        }
    }, 1000);
}

// 5초 되기 전에 사용자가 수동으로 모달 창을 종료하는 경우
const modalCloseButton = document.getElementsByClassName("modal__content-close-button")[0];
const modalLayer = document.getElementsByClassName("modal-layer")[0];

modal.addEventListener('click', function(e) {
    if (e.target === modalLayer || e.target === modalCloseButton) {
        modal.classList.remove("show");
        restartGame();
    }
});

// 게임을 재시작 하는 함수
function restartGame() {
    // 결과 모달 출력 타이머 종료
    clearInterval(closeTimer);

    // 결과 모달 time 초기화
    time = 5;

    // 컴퓨터의 마지막 선택 값 재설정
    changePcSelection();

    // 화면 초기화
    playerLifeItem.innerText = playerLife;
    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;

    // 게임 회차에 따라 스피드 빠르게 조절 (20회차 이상 부턴 속도 고정)
    if (count <= 20) {
        speed = speed - 10;
    }

    // 게임 재시작
    timer = setInterval(changePcSelection, speed);
}

// 게임 중단 버튼 클릭
const stopButton = document.getElementById("stop-button");

stopButton.addEventListener("click", function() {
    // 게임 종료 문구 준비
    showGameResult();

    // Interval 정지
    clearInterval(timer);

    // 게임 종료 (게임 설정 초기화)
    initGame();

    // 모달 종료 시 게임 재시작
    restartGameAfterExitModal();
});

// 게임에 필요한 설정 값 초기화 함수
function initGame() {
    speed = 300;
    playerLife = 3;
    playerScore = 0;
    pcScore = 0;
    count = 0;
    winCount = 0;
    drawCount = 0;
    loseCount = 0;
}

// 기본 값 세팅 및 가위바위보 게임 자동 시작
const playerLifeItem = document.getElementById("player-life");
const pcImage = document.getElementById("pc-image");

window.onload = function() {
    timer = setInterval(changePcSelection, speed);

    playerLifeItem.innerText = playerLife;
    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;
}