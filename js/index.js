"use strict";

// 스크롤 위치를 이전 위치로 복원하지 않도록 설정 (https://blog.coderifleman.com/2016/11/28/scroll-restoration-property-of-history/)
if (history.scrollRestoration) {
    window.history.scrollRestoration = "manual";
}

const introTitle = document.getElementsByClassName("intro__title")[0];
const introButton = document.getElementsByClassName("intro__button")[0];
const game = document.getElementById("game");

// 타이틀 문구 타이핑
const title = "Hello,\nGame\nWorld!";

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

// 웰컴 콘솔 메시지 🙋‍♀️
function welcome() {
    console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣤⣄⣀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠒⢀⡰⠊⠉⠉⠀⠀⠈⢿⣿⠇⠈⣹⣿⣿⣿⣿⣿⣷⣴⣿⣿⣶⣄⠀
S⠀Y⠀P⠀E⠀A⠀R⠀🍐⠀⢠⡡⠖⠋⠉⠘⠉⠉⠉⠓⢄⠀⠀⠀⠀⠸⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠋⠀⠀⠀⠀⠀⠀⣠⣤⣤⣸⠄⠀⢀⣀⣤⣀⡀⠀⠀⢿⣿⣿⣿⣿⣿⠉⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⠀⠀⠀⠀⢸⣿⣏⣻⣿⠀⣠⣭⣤⣄⠀⠈⠳⡄⠸⣿⣿⣿⣿⣿⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠋⠁⠸⣿⣍⣿⣿⠀⠀⠀⠁⣀⣀⠿⠿⢿⣿⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠁⠀⢀⠔⠊⢀⠀⠀⠀⠀⠙⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡤⢆⣘⣦⡀⠀⠀⠠⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠊⠀⠠⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡀⠁⠀⢸⣿⣿⣶⣤⡀⠀⠀⠀⠀⡠⠤⡀⠀⠀⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⣤⣾⣿⣿⣿⣿⣿⣷⣶⣤⣤⡇⠀⠺⣶⣶⣶⣦⣤⡀⠀⠀⠀⠀⠀⠠⠐⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣯⡁⠀⠀⠈⣿⣿⣿⣿⣷⡦⠠⠄⠐⠉⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⡿⠛⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠉⠉⡘⠀⠀⠈⢿⣿⣿⣿⣿⣿⡿⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⠍⠐⠊⠀⠀⠀⠀⠀⠛⡿⠿⠟⠛⠇
    `);
}

window.onload = function() {
    welcome();

    timer = setInterval(typingIntroTitle, 200);
}