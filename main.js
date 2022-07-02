"use strict";

const introTitle = document.getElementsByClassName("intro__title")[0];
const introButton = document.getElementsByClassName("intro__button")[0];
const game = document.getElementsByClassName("game")[0];

// 타이틀 문구 타이핑
const title = "Hello,\nGame World!";

let cnt = 0;
let timer = 0;

function typingIntroTitle() {
    let character = title[cnt++];

    if (character === "\n") {
        introTitle.innerHTML = introTitle.innerHTML + "<br/>";
    } else {
        introTitle.innerHTML = introTitle.innerHTML + character;
    }

    if (cnt === title.length) {
        clearInterval(timer);
        introButton.classList.add("show");

        return;
    }
}

// 버튼 클릭 시 게임 목록으로 이동
introButton.addEventListener('click', () => {
    game.scrollIntoView({behavior: "smooth"});
});

window.onload = function() {
    timer = setInterval(typingIntroTitle, 200);
}