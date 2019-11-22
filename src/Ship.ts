/// <reference path="GameEntity.ts"/>

/**
 * Class representing a Ship Game Entity.
 */
class Ship extends GameEntity {


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
    ) {
        super(img, pos, new Vector(), -0.5 * Math.PI);
    }
    
    /**
     * Let this ship listen to the suer input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        // Default velocity should be 0 when user has no keys down
        let vel = 0;

        // Determine velocity by user input
        if ( input.isKeyDown(UserInput.KEY_RIGHT) ) {
            this.angle += 0.1;
        } else if ( input.isKeyDown(UserInput.KEY_LEFT) ) {
            this.angle -= 0.1;
        }

        if ( input.isKeyDown(UserInput.KEY_UP) ) {
            vel = 6;
        } else if ( input.isKeyDown(UserInput.KEY_DOWN) ) {
            vel = -6;
        }

        // Set the new velocity vector
        this.vel = Vector.fromSizeAndAngle(vel, this.angle);
    }

    /**
     * Let the ship move with its own given speed. It should also handle the offscreen
     * events correctly.
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        super.move(canvas);

        const minX = this.img.width / 2;
        const maxX = canvas.width - minX;
        // Move right if we're not at the right canvas border
        if ( this.pos.x < minX) {
            this.pos = new Vector(minX, this.pos.y);
        } else if ( this.pos.x > maxX ) {
            this.pos = new Vector(maxX, this.pos.y);
        }

        const minY = this.img.height / 2;
        const maxY = canvas.height - minY;
        // Move left if we're not at the left canvas border
        if ( this.pos.y < minY) {
            this.pos = new Vector(this.pos.x, minY);
        } else if ( this.pos.y > maxY ) {
            this.pos = new Vector(this.pos.x, maxY);
        }
    }

}
