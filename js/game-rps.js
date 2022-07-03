"use strict";

// PC의 가위, 바위, 보 선택을 위한 함수 (가위 : 0, 바위 : 1, 보 : 2)
const pcImage = document.getElementById("pc-image");

let timer = 0;
let selection = ['scissors', 'rock', 'paper'];
let lastPcSelection = '';
let pcSelection = '';

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
    pcImage.style.backgroundImage = `url(../resources/images/game-rps/${selection[pcSelection]}.png)`;
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

buttonWrapper.addEventListener("click", function(e) {
    let playerSelection = '';

    // 사용자가 선택한 버튼에 따라 사용자 선택 값 설정
    if (e.target === scissorsButton) {
        playerSelection = 0;
    } else if (e.target === rockButton) {
        playerSelection = 1;
    } else if (e.target === papersButton) {
        playerSelection = 2;
    }

    // setInterval 정지
    clearInterval(timer);

    // 대진 결과 판단 (사용자 패 : -1, 무 : 0, 사용자 승 : 1)
    let result = checkMatchResult(playerSelection, pcSelection);
    if (result !== 0) {
        calculateScore(result);
    }

    // 게임 재 시작
    timer = setInterval(changePcSelection, 300);
});

// 대진 결과를 판단하는 함수 (가위 : 0, 바위 : 1, 보 : 2)
function checkMatchResult(player, pc) {
    let result = player - pc;

    if (result === 0) {                              // 무승부인 경우
        return 0;
    } else if (result === -2 || result === 1) {       // 사용자가 승리한 경우
        return 1;
    } else if (result === -1 || result === 2) {       // 사용자가 패배한 경우
        return -1;
    }
}

// 점수 계산 함수
const bestScoreItem = document.getElementById("best-score");
const playerScoreItem = document.getElementById("score-player");
const pcScoreItem = document.getElementById("score-pc");

let bestScore = 0;
let playerScore = 0;
let pcScore = 0;

function calculateScore(result) {
    if (result === 1) {
        console.log('이김');
        playerScore += 10;
        playerScoreItem.innerText = playerScore;
    } else if (result === -1) {
        console.log('짐');
        pcScore += 10;
        pcScoreItem.innerText = pcScore;
    }
}

// 기본 값 세팅 및 가위바위보 게임 자동 시작

window.onload = function() {
    timer = setInterval(changePcSelection, 300);

    bestScoreItem.innerText = bestScore;
    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;
}