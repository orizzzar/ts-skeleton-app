/// <reference path="Fruit.ts" />

class Apple extends Fruit {
  private _xVel: number;
  private _yVel: number;
  
  /**
   * Constructor to construct an Apple object
   * @param {string} name - name of the Apple object ('apple)
   * @param {number} lifespan - lifespan of the Apple object
   * @param {number} xPos - x coordinates on canvas
   * @param {number} yPos - y coordinates on canvas
   * @param {string} imageSource - image source url
   * @param {number} xVel - velocity on the x-axis
   * @param {number} yVel - verlocity on the y-axis
   */
  public constructor(
    name: string,
    lifespan: number,
    xPos: number,
    yPos: number,
    imageSource: string,
    xVel: number,
    yVel: number
  ) {
    super(name, lifespan, xPos, yPos, imageSource);
    this._xVel = xVel;
    this._yVel = yVel;
  }

  // getters and setters
  public get xVel(): number {
    return this._xVel;
  }

  public get yVel(): number {
    return this._yVel;
  }

  public draw() {}

  /**
   * Method to move an apple
   */
  public move(canvas:HTMLCanvasElement) {
    //check to see if the apple is within the screen
    // moving an apple
    if (this.xPos + this.image.width > canvas.width || this.xPos < 0) {
      this._xVel = -this._xVel;
    }
    if (this.yPos + this.image.height > canvas.height || this.yPos < 0) {
      this._yVel = -this._yVel;
    }
    this._xPos += this._xVel;
    this._yPos += this._yVel;
  }
}
