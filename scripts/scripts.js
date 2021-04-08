const modalOverlay = document.querySelector('.modal-overlay');
const link = document.querySelector('.linkCrieConta');

link.addEventListener("click", function () {
    modalOverlay.classList.add('active');
    modalOverlay.querySelector("iframe").src = "./novaConta/novaConta.html";
});

document.querySelector('.close-modal').addEventListener("click", function () {
    modalOverlay.classList.remove('active');
    modalOverlay.querySelector("iframe").src = "";
});

