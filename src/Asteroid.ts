class Asteroid {

    private _xPos: number;
    private _yPos: number;
    private _xVel: number;
    private _yVel: number;

    private _img: HTMLImageElement;


    /**
     * Construct a new Asteroid object.
     * 
     * @param imgUrl url of the image to load 
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(imgUrl: string, xPos: number, yPos: number, xVel: number, 
        yVel: number) {
            this._xPos = xPos;
            this._yPos = yPos;
            this._xVel = xVel;
            this._yVel = yVel;
            this.loadImage(imgUrl);
    }
    
    /**
     * Let the asteroid move itself with its own given speed. It should also handle the offscreen
     * events correctly
     * 
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        if (
            this._xPos + this._img.width / 2 > canvas.width ||
            this._xPos - this._img.width / 2 < 0
          ) {
            this._xVel = -this._xVel;
          }
          if (
            this._yPos + this._img.height / 2 > canvas.height ||
            this._yPos - this._img.height / 2 < 0
          ) {
            this._yVel = -this._yVel;
          }
      
        // Use the velocity to change the position
        this._xPos += this._xVel;
        this._yPos += this._yVel;
    }

    /**
     * Let the asteroid draw itself on the correct position on the given 
     * CanvasRenderingContext2D.
     * 
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this._xPos - this._img.width / 2;
        const y = this._yPos - this._img.height / 2; // 219 is a nice spot for the button
    
        ctx.drawImage(this._img, x, y);
    }

    /**
     * Loads an image file into the DOM. The image is stored in the _img 
     * attribute of this class before it is loaded. This means that this._img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    private loadImage(source: string) {
        this._img = new Image();
        // Now, set the src to start loading the image
        this._img.src = source;
    }


}