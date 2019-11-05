class Game {
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ];
        this.startScreen();
    }
    startScreen() {
        this.ctx.font = "140px Minecraft";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Asteroids", this.canvas.width / 2, 150);
        this.ctx.font = "40px Minecraft";
        this.ctx.fillText("PRESS PLAY TO START", this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.loadImage("./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png", this.writeStartButton);
        this.loadImage("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png", this.writeAsteroidImage);
    }
    writeStartButton(img) {
        this.ctx.drawImage(img, this.canvas.width / 2 - 111, this.canvas.height / 2 + 219);
        this.ctx.font = "20px Minecraft";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Play", this.canvas.width / 2, this.canvas.height / 2 + 245);
    }
    writeAsteroidImage(img) {
        this.ctx.drawImage(img, this.canvas.width / 2 - 50, this.canvas.height / 2 + 40);
    }
    levelScreen() {
    }
    titleScreen() {
    }
    loadImage(source, callback) {
        let imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map