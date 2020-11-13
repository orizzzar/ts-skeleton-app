class Instance {
    constructor(x, y, w, h, priority, storage) {
        this.ticksPassed = 0;
        this.storage = storage;
        this.storageKey = this.storage.add(this, priority);
    }
    destroy() {
        this.storage.remove(this.storageKey);
    }
    onHover() {
        console.log("hover instance");
    }
    onClick() {
        console.log("hover instance");
    }
    tick() {
        this.ticksPassed++;
    }
    draw() {
    }
}
class InstanceStorage {
    add(instance, priority) {
        let key = Symbol();
        this.stored.push({
            obj: instance,
            priority: priority,
            key: key
        });
        this.stored.sort((a, b) => (b.priority - a.priority));
        return key;
    }
    remove(key) {
        let array = [];
        for (let i = 0; i < this.stored.length; i++) {
            if (this.stored[i].key != key) {
                array.push(this.stored[i]);
            }
        }
        let success = array.length = this.stored.length;
        if (!success) {
            throw new Error("Somethins is wrong with InstanceStorage.p.remove(). "
                + array.length + " " + this.stored.length);
        }
    }
}
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
console.log("Typescript is working");
const instances = new InstanceStorage();
//# sourceMappingURL=app.js.map