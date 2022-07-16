"use strict";

const CARD_IMG = ['bear', 'camel', 'cat', 'chick', 'chicken', 'cockroach', 'cow', 'dolphin', 'elephant', 'fish', 'frog', 'horse', 'kitty', 'koala', 'monkey', 'penguin', 'pig', 'porcupine', 'puffer-fish', 'rabbit', 'rat-head', 'shell', 'snail', 'snake', 'squid', 'tiger', 'whale'];
const BOARD_SIZE = 24;

let stage = 1; // 게임 스테이지
let time = 60; // 남은 시간
let timer = 0;
let isFlip = false; // 카드 뒤집기 가능 여부

let cardDeck = [];

// 게임 시작
function startGame() {
    // 카드 덱 생성
    makeCardDeck();

    // 카드 화면에 세팅
    settingCardDeck();

    // 최초 1회 전체 카드 보여줌
    showCardDeck();
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
    stage = 1;
    time = 60;
    isFlip = false;
    cardDeck = [];
}

// 게임 화면 초기화
function initScreen() {
    gameBoard.innerHTML = '';
    playerTime.innerHTML = time;
    playerStage.innerHTML = stage;
    playerTime.classList.remove("blink");
    void playerTime.offsetWidth;
    playerTime.classList.add("blink");
}

// 스테이지 클리어
const board = document.getElementsByClassName("board")[0];
const stageClearImg = document.getElementsByClassName("stage-clear")[0];

function clearStage() {
    clearInterval(timer);

    // 20초 이하로는 빨라지지 않음
    if (stage <= 8) {
        time = 60 - (stage * 5); // 남은 시간 초기화 (스테이지 진행 시 마다 5초씩 감소)
    }
    stage++; // 스테이지 값 1 추가
    cardDeck = [];

    stageClearImg.classList.add("show");

    // 2초 후 다음 스테이지 시작
    setTimeout(() => {
        stageClearImg.classList.remove("show");
        initScreen();
        startGame();
    }, 2000);
}

// 게임 타이머 시작
function startTimer() {
    timer = setInterval(() => {
        playerTime.innerHTML = --time;

        if (time === 0) {
            clearInterval(timer);
            stopGame();
        }
    }, 1000);
}

// 카드 덱 생성
function makeCardDeck() {
    // 이미지는 27개인데 필요한 카드는 12개로 고정되어 있기 때문에 27개의 이미지 중 랜덤으로 12개를 뽑도록 구현
    let randomNumberArr = [];

    for (let i = 0; i < BOARD_SIZE / 2; i++) {
        // 랜덤 값 뽑기
        let randomNumber = getRandom(27, 0);

        // 중복 검사
        // cardDeckImgArr 안에 random 값이 없다면 cardDeckImgArr에 추가
        // cardDeckImgArr 안에 random 값이 있으면 인덱스 1 감소
        if (randomNumberArr.indexOf(randomNumber) === -1) {
            randomNumberArr.push(randomNumber);
        } else {
            i--;
        }
    }

    // 카드는 두 장씩 필요하므로 한 번 더 추가 (Spread operator와 push()를 이용)
    randomNumberArr.push(...randomNumberArr);

    // 카드 섞기
    shuffle(randomNumberArr);

    // 섞은 값으로 카드 세팅
    for (let i = 0; i < BOARD_SIZE; i++) {
        cardDeck.push({card: CARD_IMG[randomNumberArr[i]], isOpen: false, isMatch: false});
    }

    return cardDeck;
}

// 카드 섞기
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// 난수 생성
function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
}

// 카드 화면에 세팅
const gameBoard = document.getElementsByClassName("game__board")[0];
const cardBack = document.getElementsByClassName("card__back");
const cardFront = document.getElementsByClassName("card__front");

function settingCardDeck() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard.innerHTML = gameBoard.innerHTML +
        `
            <div class="card" data-id="${i}" data-card="${cardDeck[i].card}">
                <div class="card__back"></div>
                <div class="card__front"></div>
            </div>
        `;

        cardFront[i].style.backgroundImage = `url('img/game-cm/card-pack/${cardDeck[i].card}.png')`;
    }
}

// 전체 카드 보여주는 함수
function showCardDeck() {
    let cnt = 0;
    
    let showCardPromise = new Promise((resolve, reject) => {
        let showCardTimer = setInterval(() => {
            cardBack[cnt].style.transform = "rotateY(180deg)";
            cardFront[cnt++].style.transform = "rotateY(0deg)";

            if (cnt === cardDeck.length) {
                clearInterval(showCardTimer);

                resolve();
            }
        }, 200);
    });

    showCardPromise.then(() => {
        // showCardPromise 성공인 경우 실행할 코드
        setTimeout(hideCardDeck, 2000);
    })
}

// 전체 카드 숨기는 함수
function hideCardDeck() {
    for (let i = 0; i < cardDeck.length; i++) {
        cardBack[i].style.transform = "rotateY(0deg)";
        cardFront[i].style.transform = "rotateY(-180deg)";
    }

    // 전체 카드 숨기고 0.1초 뒤 isFlip = true, 게임 타이머 시작
    // 바로 클릭이 가능하도록 할 때(isFlip = true 값을 바로 줬을 때) 에러가 나는 경우가 있어 0.1초 후 부터 카드 뒤집기가 가능하도록 설정
    setTimeout(() => {
        isFlip = true;

        // 게임 타이머 시작
        startTimer();
    }, 100);
}

// 카드 클릭 이벤트
gameBoard.addEventListener("click", function(e) {
    if (isFlip === false) {
        return;
    }

    if (e.target.parentNode.className === "card") {
        let clickCardId = e.target.parentNode.dataset.id;

        if (cardDeck[clickCardId].isOpen === false) {
            openCard(clickCardId);
        }
    }
});

// 카드 오픈
function openCard(id) {
    // 화면에서 앞면으로 보이도록 스타일 조정
    cardBack[id].style.transform = "rotateY(180deg)";
    cardFront[id].style.transform = "rotateY(0deg)";

    // 선택한 카드의 open 여부를 true로 변경
    cardDeck[id].isOpen = true;

    // 선택한 카드가 첫 번째로 선택한 카드인지, 두 번째로 선택한 카드인지 판별하기 위해 오픈한 카드의 index를 저장하는 배열 요청
    let openCardIndexArr = getOpenCardArr(id);

    // 두 번째 선택인 경우 카드 일치 여부 확인
    // 일치 여부 확인 전까지 카드 뒤집기 불가(isFlip = false)
    if (openCardIndexArr.length === 2) {
        isFlip = false;
        
        checkCardMatch(openCardIndexArr);
    }
}

// 오픈한 카드의 index를 저장하는 배열 반환
function getOpenCardArr(id) {
    let openCardIndexArr = [];

    // 반복문을 돌면서 isOpen: true이고 isMatch: false인 카드의 인덱스를 배열에 저장
    cardDeck.forEach((element, i) => {
        if (element.isOpen === false || element.isMatch === true) {
            return;
        }

        openCardIndexArr.push(i);
    });

    return openCardIndexArr;
}

// 카드 일치 여부 확인
function checkCardMatch(indexArr) {
    let firstCard = cardDeck[indexArr[0]];
    let secondCard = cardDeck[indexArr[1]];

    if (firstCard.card === secondCard.card) {
        // 카드 일치 처리
        firstCard.isMatch = true;
        secondCard.isMatch = true;

        matchCard(indexArr);
    } else {
        // 카드 불일치 처리
        firstCard.isOpen = false;
        secondCard.isOpen = false;

        closeCard(indexArr);
    }
}

// 카드 일치 처리
function matchCard(indexArr) {
    // 카드를 전부 찾았으면 스테이지 클리어
    if (checkClear() === true) {
        clearStage();
        return;
    }

    // 바로 클릭 시 에러가 나는 경우가 있어 0.1초 후 부터 카드 뒤집기가 가능하도록 설정
    setTimeout(() => {
        isFlip = true;
    }, 100);
}

// 카드를 전부 찾았는지 확인하는 함수
function checkClear() {
    // 카드를 전부 찾았는지 확인
    let isClear = true;

    cardDeck.forEach((element) => {
        // 반복문을 돌면서 isMatch: false인 요소가 있다면 isClear에 false 값을 저장 후 반복문 탈출
        if (element.isMatch === false) {
            isClear = false;
            return;
        }
    });

    return isClear;
}

// 카드 불일치 처리
function closeCard(indexArr) {
    // 0.8초 동안 카드 보여준 후 닫고, 카드 뒤집기가 가능하도록 설정
    setTimeout(() => {
        for (let i = 0; i < indexArr.length; i++) {
            cardBack[indexArr[i]].style.transform = "rotateY(0deg)";
            cardFront[indexArr[i]].style.transform = "rotateY(-180deg)";
        }

        isFlip = true;
    }, 800);
}

// 게임 종료 시 출력 문구
const modal = document.getElementsByClassName("modal")[0];

function showGameResult() {
    let resultText = "";

    if (stage > 0 && stage <= 2) {
        resultText = "한 번 더 해볼까요?";
    } else if (stage > 2 && stage <= 4) {
        resultText = "조금만 더 해봐요!";
    } else if (stage > 4 && stage <= 5) {
        resultText = "짝 맞추기 실력이 대단해요!";
    } else if (stage > 5 && stage <= 7) {
        resultText = "기억력이 엄청나시네요!";
    } else if (stage > 7 && stage <= 9) {
        resultText = "당신의 두뇌,<br/>어쩌면<br/>컴퓨터보다 좋을지도..";
    } else if (stage > 9 && stage <= 11) {
        resultText = "여기까지 온 당신,<br/>혹시 '포토그래픽 메모리'<br/>소유자신가요?";
    } else if (stage > 11) {
        resultText = "탈인간의 능력을 가지셨습니다!!! 🙀";
    }

    modalTitle.innerHTML = `
    <h1 class="modal__content-title--result color-red">
        게임 종료!
    </h1>
    <span class="modal__content-title--stage">
        기록 : <strong>STAGE ${stage}</strong>
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

// 기본 값 세팅 및 다른 색깔 찾기 게임 자동 시작
const playerTime = document.getElementById("player-time");
const playerStage = document.getElementById("player-stage");

window.onload = function() {
    playerTime.innerHTML = time;
    playerStage.innerHTML = stage;

    startGame();
}