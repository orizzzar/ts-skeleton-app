class Ticker {
    constructor(stepFunction, interval = 1000) {
        this.stepFunction = stepFunction;
        this.interval = interval;
    }
    isRunning() {
        return this.timerId != null;
    }
    toggle() {
        if (this.isRunning()) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        else {
            this.timerId = setInterval(() => {
                if (this.stepFunction) {
                    this.stepFunction();
                }
            }, this.interval);
        }
    }
}
//# sourceMappingURL=app.js.map