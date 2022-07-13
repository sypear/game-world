// 게임 상태 관리에 필요한 변수 초기화
let stage = 1; // 게임 스테이지
let time = 15; // 남은 시간
let paletteRow = 2; // 팔레트 행
let paletteSize = paletteRow ** 2; // 팔레트 아이템 전체 갯수 (행의 제곱)
let targetIndex = 0;
let targetOpacity = 0.4; // 타겟 아이템 opacity
let color = {}; // 팔레트 아이템 색상 (red, green, blue 값을 저장하는 object)

let timer = 0; // 타이머

// 게임 시작
const modal = document.getElementsByClassName("modal")[0];

function startGame() {
    createPlatteItem();

    timer = setInterval(() => {
        playerTime.innerHTML = --time;

        // 시간 초과
        if (time <= 0) {
            playerTime.innerHTML = 0;

            // 타이머 종료
            clearInterval(timer);

            // 결과 모달 출력
            showGameResult();
            modal.classList.add("show");

            // 게임 설정 값 초기화
            resetSettings();
        }
    }, 1000);
}

// 팔레트 아이템 생성
function createPlatteItem() {
    // 랜덤으로 타겟 아이템 생성
    targetIndex = createTargetItem(paletteSize);
    // 팔레트 아이템 세팅
    settingPlatteItem();
}

// 타겟 생성
function createTargetItem(paletteSize) {
    return Math.floor(Math.random() * paletteSize);
}

// 팔레트 아이템 세팅
const palette = document.getElementsByClassName("palette")[0];
const paletteItem = document.getElementsByClassName("palette-item");

function settingPlatteItem() {
    // html 추가
    for (let i = 0; i < paletteSize; i++) {
        if (i === targetIndex) {
            palette.innerHTML = palette.innerHTML +
            `
                <div class="palette-item" id="target"></div>
            `;
        } else {
            palette.innerHTML = palette.innerHTML +
            `
                <div class="palette-item"></div>
            `;
        }
    }

    // 아이템 크기 세팅
    let itemSize = 100 / paletteRow;

    // 랜덤 색상 생성
    color = createColor(color);

    // 아이템 크기, 색상 적용
    for (let i = 0; i < paletteItem.length; i++) {
        // 크기 적용
        paletteItem[i].style.width = `${itemSize}%`;
        paletteItem[i].style.height = `${itemSize}%`;

        // 색상 적용
        let opacity = 1;

        if (paletteItem[i].id === "target") {
            opacity = targetOpacity;
        }

        paletteItem[i].style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${opacity}`;
    }
}

// 랜덤 색상 생성
function createColor(color) {
    // 너무 어둡거나 너무 밝은 색이 나오지 않도록 범위를 100 ~ 200으로 지정
    color.red = Math.floor(Math.random() * 100) + 100;
    color.green = Math.floor(Math.random() * 100) + 100;
    color.blue = Math.floor(Math.random() * 100) + 100;

    return color;
}

// 아이템 클릭 이벤트
palette.addEventListener("click", function(e) {
    if (e.target.className === "palette-item") {
        if (e.target.id === "target") {
            selectTargetItem();
        } else {
            selectWrongItem();
        }
    }
});

// 정답 처리
function selectTargetItem() {
    changeSettingsForSelectTargetItem();
    createPlatteItem();
}

// 사용자가 정답을 맞춘 경우 설정 값 변경
function changeSettingsForSelectTargetItem() {
    // 화면 초기화
    palette.innerHTML = '';
    
    // targetIndex, color는 팔레트 아이템 생성 시 랜덤 값으로 재생성되기 때문에 따로 리셋 처리 하지 않음
    stage++;
    time = 15;
    
    // stage가 2씩 올라갈 때마다 팔레트 사이즈 증가
    if (stage % 2 === 1) {
        paletteRow++;
        paletteSize = paletteRow ** 2;
    }

    // opacity 값 0.03씩 증가 (0.93 이상으로는 증가하지 않음)
    if (targetOpacity < 0.96) {
        // 2진수로 실수 계산 시 오차가 생기기 때문에 소수점 셋째자리에서 반올림하도록 처리
        targetOpacity = +(targetOpacity + 0.03).toFixed(2);
    }

    // 화면 갱신
    playerTime.innerHTML = time;
    playerStage.innerHTML = stage;
}

// 오답 처리
function selectWrongItem() {
    // 3초를 뺀 값이 0보다 작은 경우에도 0으로 고정
    if (time - 3 < 0) {
        time = 0;
    } else {
        time = time - 3;
    }

    // 오답 선택 시 애니메이션
    palette.classList.add("vibration");

    setTimeout(function() {
        palette.classList.remove("vibration");
    }, 400);

    // 화면 갱신
    playerTime.innerHTML = time;
}

// 설정 값 초기화
function resetSettings() {
    stage = 1;
    time = 15;
    paletteRow = 2;
    paletteSize = paletteRow ** 2;
    targetIndex = 0;
    targetOpacity = 0.6;
    color = {};
}

// 게임 종료 시 출력 문구
function showGameResult() {
    let resultText = "";

    if (stage > 0 && stage <= 5) {
        resultText = "한 번 더 해볼까요?"
    } else if (stage > 5 && stage <= 10) {
        resultText = "조금만 더 해봐요!"
    } else if (stage > 10 && stage <= 15) {
        resultText = "색깔 찾기 능력이 대단해요!"
    } else if (stage > 15 && stage <= 20) {
        resultText = "엄청난 눈을 가지셨네요!"
    } else if (stage > 20 && stage <= 30) {
        resultText = "다른 색깔 찾기의<br/>신이시군요!"
    }  else if (stage > 30) {
        resultText = "여기까지 온 당신,<br/>혹시 '절대색감'이신가요?"
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
}

// 모달 창 닫기
const modalTitle = document.getElementsByClassName("modal__content-title")[0];
const modalCloseButton = document.getElementsByClassName("modal__content-close-button")[0];

modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalCloseButton) {
        modal.classList.remove("show");

        // 모달창 닫으면 화면 초기화 후 게임 재시작
        palette.innerHTML = '';
        playerTime.innerHTML = time;
        playerStage.innerHTML = stage;
        
        startGame();
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