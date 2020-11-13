type DrawSpriteType = null | "box"

class Drawer {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    public draw(coords: InstanceCoords, sprite: DrawSpriteType) {
        if (sprite === "box") {
            this.sprBox(coords);
        } else {
            this.default(coords);
        }
    }

    private default(coords: InstanceCoords) {
        this.sprBox(coords);
    }

    private sprBox(coords: InstanceCoords) {
        console.log(coords);
    }

}