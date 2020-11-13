class MouseHandler {

    private storage: InstanceStorage;
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLCanvasElement, storage: InstanceStorage) {
        this.canvas = canvas;
        this.storage = storage;
        canvas.addEventListener('click', this.click());
        canvas.addEventListener('mousemove', this.hover());
    }

    public hover() {

    }

    public click() {
        
    }

}