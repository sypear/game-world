let cardImg = ['bear', 'camel', 'cat', 'chick', 'chicken', 'cockroach', 'cow', 'elephant', 'fish', 'frog', 'horse', 'kitty', 'koala', 'monkey', 'penguin', 'pig', 'porcupine', 'puffer-fish', 'rabbit', 'rat-head', 'shell', 'snail', 'snake', 'squid', 'tiger', 'whale'];

let boardRow = 6;
let boardSize = boardRow * 4;

let cardDeck = [];

function startGame() {
    // 카드 덱 생성
    cardDeck = makeCardDeck();

    // 카드 화면에 세팅
    settingCardDeck();

    // 전체 카드 보여줌
    showCardDeck();
}

// 카드 덱 생성
function makeCardDeck() {
    // 이미지는 26개인데 필요한 카드는 12개로 고정되어 있기 때문에 26개의 이미지 중 랜덤으로 12개를 뽑도록 구현
    let randomNumberArr = [];

    for (let i = 0; i < boardSize / 2; i++) {
        // 랜덤 값 뽑기
        let randomNumber = getRandom(26, 0);

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
    for (let i = 0; i < boardSize; i++) {
        cardDeck.push({card: cardImg[randomNumberArr[i]], isOpen: false});
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
    for (let i = 0; i < boardSize; i++) {
        gameBoard.innerHTML = gameBoard.innerHTML +
        `
            <div class="card" data-id="${i}" data-card="${cardDeck[i].card}">
                <div class="card__back"></div>
                <div class="card__front"></div>
            </div>
        `

        cardFront[i].style.backgroundImage = `url('img/game-cm/card-pack/${cardDeck[i].card}.png')`;
    }
}

// 전체 카드 보여주는 함수
function showCardDeck() {
    let cnt = 0;

    let showCardTimer = setInterval(function() {
        cardBack[cnt].style.transform = "rotateY(180deg)"
        cardFront[cnt++].style.transform = "rotateY(0deg)"

        if (cnt === cardDeck.length) {
            clearInterval(showCardTimer);

            setTimeout(function() {
                for (let i = 0; i < cardDeck.length; i++) {
                    cardBack[i].style.transform = "rotateY(0deg)"
                    cardFront[i].style.transform = "rotateY(-180deg)"
                }
            }, 5000);

            return;
        }
    }, 200);
}

// 카드 클릭 이벤트
gameBoard.addEventListener("click", function(e) {
    if (e.target.parentNode.className === "card") {
        let clickCardId = e.target.parentNode.dataset.id;

        if (cardDeck[clickCardId].isOpen === false) {
            // e.target == 카드 뒷면
            e.target.style.transform = "rotateY(180deg)";
            e.target.nextSibling.nextSibling.style.transform = "rotateY(0deg)";
            cardDeck[clickCardId].isOpen = true;
        } else {
            // e.target == 카드 앞면
            e.target.style.transform = "rotateY(-180deg)";
            e.target.previousSibling.previousSibling.style.transform = "rotateY(0deg)";
            cardDeck[clickCardId].isOpen = false;
        }
    }
});

window.onload = function() {
    startGame();
}