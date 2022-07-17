// info 모달창 열기
const inofMenu = document.getElementsByClassName("menu__nav-info")[0];

inofMenu.addEventListener("click", function() {
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