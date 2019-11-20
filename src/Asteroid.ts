/**
 * Class representing an Asteroid Game Entity.
 */
class Asteroid {

    private pos: Vector;
    private vel: Vector;
    private img: HTMLImageElement;

    /**
     * Construct a new Asteroid object.
     *
     * @param imgUrl url of the image to load
     * @param pos coordinates of its starting position
     * @param vel the velocity vector
     */
    public constructor(
        img: HTMLImageElement,
        pos: Vector,
        vel: Vector,
    ) {
        this.img = img;
        this.pos = pos;
        this.vel = vel;
    }

    /**
     * Let the asteroid move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        if (
            this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.x - this.img.width / 2 < 0
        ) {
            this.vel = this.vel.mirror_Y();
        }
        if (
            this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0
        ) {
            this.vel = this.vel.mirror_X();
        }

        // Use the velocity to change the position
        this.pos = this.pos.add(this.vel);
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }

}
