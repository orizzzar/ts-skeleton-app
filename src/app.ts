window.addEventListener('load', init);

let word = 'APPLE';

// DOM Elements
const wordElement = document.getElementById('word') as HTMLDivElement;
const buttonsElement = document.getElementById('buttons') as HTMLDivElement;

function init(ev: Event) {
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

function buttonClickHandler(event: Event) {

}