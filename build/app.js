window.addEventListener('load', init);
let word = 'APPLE';
const wordElement = document.getElementById('word');
const buttonsElement = document.getElementById('buttons');
function init(ev) {
    createButtons();
}
function createButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    for (const letter of alphabet) {
        const newButtonElement = document.createElement('div');
        newButtonElement.innerHTML = letter;
        newButtonElement.classList.add('button');
        newButtonElement.addEventListener('click', buttonClickHandler);
        buttonsElement.append(newButtonElement);
    }
}
function buttonClickHandler(event) {
}
//# sourceMappingURL=app.js.map