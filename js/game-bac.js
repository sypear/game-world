const LAST_ROUND = 9;
const ANSWER_SIZE = 4;

let answer = [];
let round = 1;
let isPlay = true;
let isStopScreen = false;

function startGame() {
    // 정답 생성
    createAnswer();
}

function stopGame(isWin) {
    isPlay = false;

    showGameResult(isWin);
    stopScreen();
}

function restartGame() {
    initGame();
    initScreen();
    startGame();
}

function initGame() {
    answer = [];
    round = 1;
    isPlay = true;
}

function initScreen() {
    for (let i = 0; i < LAST_ROUND; i++) {
        // 스코어 보드 초기화
        recordList[i].getElementsByTagName("td")[0].innerHTML = '';
        recordList[i].getElementsByTagName("td")[1].innerHTML = '';
    }

    if (isStopScreen === true) {
        for (let i = 0; i < ANSWER_SIZE; i++) {
            formInput[i].readOnly = false;
            formInput[i].style.backgroundColor = "#FFF";
        }
    
        formButton.disabled = false;
        formButton.style.cursor = "pointer";
        formButton.style.backgroundColor = "#FFF";
    }

    for (let i = 0; i < ANSWER_SIZE; i++) {
        formInput[i].value = '';
    }
    formInput[0].focus();
}

// 게임 종료 후 재시작 전까지 게임 진행할 수 없도록 화면 조정
function stopScreen() {
    isStopScreen = true;

    for (let i = 0; i < ANSWER_SIZE; i++) {
        formInput[i].readOnly = true;
        formInput[i].style.backgroundColor = "#CCC";
    }

    formButton.disabled = true;
    formButton.style.cursor = "auto";
    formButton.style.backgroundColor = "#CCC";
}

// 정답 생성(4자리 수)
function createAnswer() {
    for (let i = 0; i < ANSWER_SIZE; i++) {
        let randomNumber = getRandom(10, 0);

        if (answer.indexOf(randomNumber) === -1) {
            answer.push(randomNumber);
        } else {
            i--;
        }
    }
}

// 게임 재시작 버튼 클릭 이벤트
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
    restartGame();
});

// 확인 버튼 클릭 이벤트
const formButton = document.getElementById("bat-form-button");
const formInput = document.getElementsByClassName("form__input");

formButton.addEventListener("click", function() {
    if (isPlay === false) {
        console.log("응아니야");
        return;
    }

    let userInputArr = [];

    for (let i = 0; i < ANSWER_SIZE; i++) {
        userInputArr.push(parseInt(formInput[i].value));
    }

    console.log("입력 : " + userInputArr);
    console.log("정답 : " + answer);

    let result = checkUserInput(userInputArr);

    // 화면에 기록 갱신
    showRecord(userInputArr, result);

    // 게임 진행 체크
    checkGameProgress(result);
});

// 입력값 체크
function checkUserInput(userInputArr) {
    // 아웃인 경우
    if (checkUserOut(userInputArr) === true) {
        return "out";
    }

    // 아웃이 아닌 경우
    return checkHit(userInputArr);
}

// 아웃인지 체크
function checkUserOut(userInputArr) {
    for (let i = 0; i < ANSWER_SIZE; i++) {
        if (answer.indexOf(userInputArr[i]) !== -1) {
            return false;
        };
    }

    return true;
}

// 볼인지 스트라이크인지 체크
function checkHit(userInputArr) {
    let result = { ball: 0, strike: 0 };

    for (let i = 0; i < ANSWER_SIZE; i++) {
        if (answer.indexOf(userInputArr[i]) !== -1) {
            // 볼인지 스트라이크인지 체크
            if (answer.indexOf(userInputArr[i]) === i) {
                result.strike++;
            } else {
                result.ball++;
            }
        }
    }

    return result;
}

// 게임 진행 체크
function checkGameProgress(result) {
    if (result.strike === 4) {
        stopGame(true);
        return;
    }

    if (round === LAST_ROUND) {
        stopGame(false);
        return;
    }

    moveNextRound();
}

// 화면에 기록 갱신
const recordList = document.getElementById("record-list").getElementsByTagName("tr");

function showRecord(userInputArr, result) {
    let userInputRecord = recordList[round-1].getElementsByTagName("td")[0];
    let hitRecord = recordList[round-1].getElementsByTagName("td")[1];

    // 사용자 입력값 출력
    for (let i = 0 ; i < ANSWER_SIZE; i++) {
        if (i === ANSWER_SIZE - 1) {
            userInputRecord.innerHTML = userInputRecord.innerHTML + userInputArr[i];
        } else {
            userInputRecord.innerHTML = userInputRecord.innerHTML + userInputArr[i] + ",&nbsp;";
        }
    }

    // 결과 출력
    if (result === "out") {
        hitRecord.innerHTML = hitRecord.innerHTML + "아웃";
        return;
    }

    hitRecord.innerHTML = hitRecord.innerHTML + `${result.ball}볼, ${result.strike}스트라이크`;
}

// 다음 라운드로 이동
function moveNextRound() {
    round++;
}

// 난수 생성
function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
}

// info 모달창 열기
const infoButton = document.getElementById("info-button");

infoButton.addEventListener("click", function() {
    infoModal.classList.add("show");
});

// info 모달창 닫기
const infoModal = document.getElementById("info-modal");
const infoModalCloseButton = document.getElementById("info-modal-close-button");

infoModal.addEventListener('click', function(e) {
    if (e.target === infoModal || e.target === infoModalCloseButton) {
        infoModal.classList.remove("show");
    }
});

// 게임 종료 시 결과 출력
const gameResultImg = document.getElementsByClassName("game-result")[0];

function showGameResult(isWin) {
    if (isWin === true) {
        gameResultImg.style.backgroundImage = `url('../img/common/win.png')`;
    } else {
        gameResultImg.style.backgroundImage = `url('../img/common/lose.png')`;
    }

    gameResultImg.classList.add("show");

    // 2초 후 결과 출력 애니메이션 제거 및 재시작 버튼 깜빡이도록 설정
    setTimeout(() => {
        gameResultImg.classList.remove("show");
        restartButton.classList.add("blink");
    }, 2000);
}

window.onload = function() {
    startGame();
};