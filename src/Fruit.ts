class Fruit {
  protected readonly _name: string;
  protected readonly _lifespan: number;
  protected _xPos: number;
  protected _yPos: number;
  protected _image: HTMLImageElement;

  /**
   * Constructor to construct an Apple object
   * @param {string} name - name of the Apple object ('apple)
   * @param {number} lifespan - lifespan of the Apple object
   * @param {number} xPos - x coordinates on canvas
   * @param {number} yPos - y coordinates on canvas
   * @param {string} imageSource - image source url
   */
  public constructor(
    name: string,
    lifespan: number,
    xPos: number,
    yPos: number,
    imageSource: string
  ) {
    this._lifespan = lifespan;
    this._name = name;
    this._xPos = xPos;
    this._yPos = yPos;
    this._image = this.loadNewImage(imageSource);
  }

  //getters and setters

  public get lifespan(): number {
    return this._lifespan;
  }

  public get name(): string {
    return this._name;
  }

  public get xPos(): number {
    return this._xPos;
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this._image, this._xPos, this._yPos);
  }
  
  public move(canvas:HTMLCanvasElement) {
      console.log('moving some fruit');
  }

  /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
