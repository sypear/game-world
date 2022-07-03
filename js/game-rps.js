"use strict";

// PC의 가위, 바위, 보 선택을 위한 함수 (가위 : 0, 바위 : 1, 보 : 2)
const pcImage = document.getElementById("pc-image");

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
            pcImage.src = "./../img/game-rps/scissors.png";
            pcImage.alt = "컴퓨터 선택: 가위";
            break;

        case 1:
            pcImage.src = "./../img/game-rps/rock.png";
            pcImage.alt = "컴퓨터 선택: 바위";
            break;

        case 2:
            pcImage.src = "./../img/game-rps/paper.png";
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
const buttonWrapper = document.getElementsByClassName("board__button-wrapper")[0];
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
    // Interval 정지
    clearInterval(timer);

    // 대진 결과 판단 (사용자 패 : 0, 무 : 1, 사용자 승 : 2)
    let result = checkMatchResult(playerSelection, pcSelection);

    // 대진 결과 화면에 출력
    showMatchResult(result, playerSelection, pcSelection);

    // 화면에 모달 창 출력
    modal.classList.add("show");

    // 모달 종료 시 게임 재시작
    restartGameAfterExitModal();
}

// 대진 결과를 판단하는 함수 (가위 : 0, 바위 : 1, 보 : 2)
function checkMatchResult(player, pc) {
    let result = player - pc;

    if (result === 0) {                              // 무승부인 경우
        return 1;
    } else if (result === -2 || result === 1) {       // 사용자가 승리한 경우
        return 2;
    } else if (result === -1 || result === 2) {       // 사용자가 패배한 경우
        return 0;
    }
}

// 대진 결과를 화면에 출력하는 함수
const modal = document.getElementsByClassName("modal")[0];
const modalTitle = document.getElementsByClassName("modal__content-title")[0];

const bestScoreItem = document.getElementById("best-score");
const playerScoreItem = document.getElementById("score-player");
const pcScoreItem = document.getElementById("score-pc");
const test = document.getElementsByClassName("modal__content-title--result")[0];

let bestScore = 0;
let playerScore = 0;
let pcScore = 0;

function showMatchResult(result, player, pc) {
    // 화면에 점수 갱신
    if (result !== 1) {
        calculateScore(result);
    }

    // 대진 결과 대입
    let colorList = ["color-red", "color-green", "color-blue"];
    let resultList = ["패배", "무승부", "승리"];
    let rpsList = ["✌", "✊", "✋"];

    modalTitle.innerHTML = `
        <h1 class="modal__content-title--result ${colorList[result]}">
            ${resultList[result]}
        </h1>
        <p class="modal__content-title--desc">
            PC : ${rpsList[pc]}<br />
            Player : ${rpsList[player]}
        </p>
    `;
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

        if (time == 0) {
            modal.classList.remove("show");
            restartGame();
        }
    }, 1000);
}

// 5초 되기 전에 사용자가 수동으로 모달 창을 종료하는 경우
const modalCloseButton = document.getElementsByClassName("modal__content-close-button")[0];

modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalCloseButton) {
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

    // 게임 재시작
    timer = setInterval(changePcSelection, 300);
}

// 기본 값 세팅 및 가위바위보 게임 자동 시작
window.onload = function() {
    timer = setInterval(changePcSelection, 300);

    // bestScoreItem.innerText = bestScore;
    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;
}