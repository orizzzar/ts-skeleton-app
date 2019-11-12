class Animator {
    constructor(interval, callback) {
        this.animate = () => {
            this.callback();
            requestAnimationFrame(this.animate);
        };
        this.interval = interval;
        this.callback = callback;
    }
    start() {
        requestAnimationFrame(this.animate);
    }
}
class ImageRepository {
    constructor(basePath, asset_names) {
        this.assets = {};
        this.loadingAssets = new Array();
        this.basePath = basePath;
        asset_names.forEach((name) => {
            this.startLoadingImage(name);
        });
    }
    isLoading() {
        if (this.loadingAssets.length == 0) {
            return false;
        }
        for (let i = 0; i < this.loadingAssets.length; i++) {
            if (this.loadingAssets[i] != null) {
                return true;
            }
        }
        return false;
    }
    getImage(key) {
        return this.assets[key];
    }
    startLoadingImage(name) {
        let imageElement = new Image();
        imageElement.addEventListener("load", (event) => {
            const key = this.generateKeyFromSrc(imageElement.src);
            this.assets[key] = imageElement;
            delete this.loadingAssets[this.loadingAssets.indexOf(key)];
        });
        const src = this.generateURL(name);
        this.loadingAssets.push(this.generateKeyFromSrc(src));
        imageElement.src = src;
    }
    generateKeyFromSrc(src) {
        const start = this.basePath.substring(1);
        const index = src.indexOf(start) + start.length + 1;
        const key = src.substr(index, src.length - index - 4).split("/").join(".");
        return key;
    }
    generateURL(name) {
        return this.basePath + "/" + name;
    }
}
class Game {
    constructor(canvasId) {
        this.angle = 0;
        this.images = [
            "PNG/UI/buttonBlue.png",
            "PNG/UI/playerLife1_blue.png",
            "PNG/playerShip1_blue.png",
            "PNG/Meteors/meteorBrown_big1.png",
            "PNG/Meteors/meteorBrown_big2.png",
            "PNG/Meteors/meteorBrown_big3.png",
            "PNG/Meteors/meteorBrown_big4.png",
            "PNG/Meteors/meteorBrown_med1.png",
            "PNG/Meteors/meteorBrown_med3.png",
            "PNG/Meteors/meteorBrown_small1.png",
            "PNG/Meteors/meteorBrown_small2.png",
            "PNG/Meteors/meteorBrown_tiny1.png",
            "PNG/Meteors/meteorBrown_tiny2.png",
        ];
        this.asteroid_names = [
            "PNG.Meteors.meteorBrown_big1",
            "PNG.Meteors.meteorBrown_big2",
            "PNG.Meteors.meteorBrown_big3",
            "PNG.Meteors.meteorBrown_big4",
            "PNG.Meteors.meteorBrown_med1",
            "PNG.Meteors.meteorBrown_med3",
            "PNG.Meteors.meteorBrown_small1",
            "PNG.Meteors.meteorBrown_small2",
            "PNG.Meteors.meteorBrown_tiny1",
            "PNG.Meteors.meteorBrown_tiny2",
        ];
        this.asteroids = [];
        this.asteroid_x = [];
        this.asteroid_y = [];
        this.currentScreen = Game.LOAD_SCREEN;
        this.frameCounter = 0;
        this.keyListener = new KeyListener();
        this.animate = () => {
            this.frameCounter++;
            this.loop();
            requestAnimationFrame(this.animate);
        };
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
        const maxAsteroidsOnScreen = 5;
        for (let i = 0; i < maxAsteroidsOnScreen; i++) {
            const index = this.randomNumber(0, this.asteroid_names.length - 1);
            const x = this.randomNumber(0, this.canvas.width - 20);
            const y = this.randomNumber(0, this.canvas.height - 20);
            this.asteroids[i] = this.asteroid_names[index];
            this.asteroid_x[i] = x;
            this.asteroid_y[i] = y;
        }
        console.log(this.asteroid_x);
        console.log(this.asteroid_y);
        console.log(this.asteroids);
        this.repo = new ImageRepository("./assets/images/SpaceShooterRedux", this.images);
        this.startAnimation();
    }
    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        switch (this.currentScreen) {
            case Game.LOAD_SCREEN:
                this.loadscreen();
                break;
            case Game.START_SCREEN:
                this.startScreen();
                break;
            case Game.LEVEL_SCREEN:
                this.levelScreen();
                break;
            case Game.TITLE_SCREEN:
                this.titleScreen();
                break;
        }
    }
    loadscreen() {
        this.writeTextToCanvas("Loading...", 80, this.canvas.width / 2, this.canvas.height / 2);
        if (!this.repo.isLoading() && this.frameCounter > 60 * 1) {
            this.currentScreen = Game.START_SCREEN;
        }
    }
    startScreen() {
        let centerX = this.canvas.width / 2;
        let centerY = this.canvas.height / 2;
        this.writeTextToCanvas("Asteroids", 140, centerX, 150);
        this.writeTextToCanvas("PRESS PLAY OR HIT 'S' TO START", 40, centerX, centerY - 135);
        this.drawImage("PNG.UI.buttonBlue", centerX, centerY + 220);
        this.writeTextToCanvas("Play", 20, centerX, centerY + 229, 'center', 'black');
        const angle = this.frameCounter * Math.PI / 180;
        this.drawImage("PNG.Meteors.meteorBrown_big1", centerX, centerY + 60, angle);
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            this.currentScreen = Game.LEVEL_SCREEN;
        }
    }
    levelScreen() {
        const d = Math.PI / 180 * 1.3;
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.angle -= d;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.angle += d;
        }
        const lifeImageFileName = "PNG.UI.playerLife1_blue";
        let x = 30;
        let y = 30;
        for (let life = 0; life < this.lives; life++) {
            this.drawImage(lifeImageFileName, x, y);
            x += 50;
        }
        this.writeTextToCanvas(`Your score: ${this.score}`, 20, this.canvas.width - 100, 30, 'right');
        for (let i = 0; i < this.asteroids.length; i++) {
            this.drawImage(this.asteroids[i], this.asteroid_x[i], this.asteroid_y[i]);
        }
        const playerSpaceShipFileName = "PNG.playerShip1_blue";
        let img = this.repo.getImage(playerSpaceShipFileName);
        x = this.canvas.width / 2 - img.width / 2;
        y = this.canvas.height / 2 - img.height / 2;
        this.drawImage(playerSpaceShipFileName, x, y, this.angle);
        if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
            this.currentScreen = Game.TITLE_SCREEN;
        }
    }
    titleScreen() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        this.writeTextToCanvas(`${this.player} score is ${this.score}`, 80, x, y - 100);
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);
        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`;
            this.writeTextToCanvas(text, 20, x, y);
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.currentScreen = Game.START_SCREEN;
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    drawImage(name, x, y, angle = 0) {
        let img = this.repo.getImage(name);
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
        this.ctx.restore();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    startAnimation() {
        console.log('start animation');
        requestAnimationFrame(this.animate);
    }
}
Game.LOAD_SCREEN = 0;
Game.START_SCREEN = 1;
Game.LEVEL_SCREEN = 2;
Game.TITLE_SCREEN = 3;
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
class KeyListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
}
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_S = 83;
class MouseListener {
    constructor() {
        this.mouseDown = (ev) => {
            this.buttonDown = true;
        };
        this.mouseUp = (ev) => {
            this.buttonDown = false;
        };
        this.mouseMove = (ev) => {
            this.position = new Vector(ev.clientX, ev.clientY);
        };
        this.mouseEnter = (ev) => {
            this.inWindow = true;
        };
        this.mouseLeave = (ev) => {
            this.inWindow = true;
        };
        this.position = new Vector();
        this.inWindow = true;
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
    }
}
class Vector {
    constructor(x = 0, y = 0) {
        this._size = null;
        this._angle = null;
        this._x = x;
        this._y = y;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
    add(input) {
        return new Vector(this._x + input.x(), this._y + input.y());
    }
    subtract(input) {
        return new Vector(this._x - input.x(), this._y - input.y());
    }
    distance(input) {
        return this.subtract(input).size();
    }
    scale(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }
    size() {
        if (!this._size) {
            this._size = Math.sqrt(Math.pow(this._x, 2) +
                Math.pow(this._y, 2));
        }
        return this._size;
    }
    angle() {
        if (!this._angle) {
            this._size = Math.atan(this._y / this._x);
        }
        return this._angle;
    }
    mirror_X() {
        return new Vector(this._x, this._y * -1);
    }
    mirror_Y() {
        return new Vector(this._x * -1, this._y);
    }
}
//# sourceMappingURL=app.js.map