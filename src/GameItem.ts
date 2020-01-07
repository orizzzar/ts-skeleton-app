abstract class GameItem {
    protected img: HTMLImageElement;
    protected xPos: number;
    protected yPos: number;

    public constructor(imgSrc: string, xPos: number, yPos: number) {
        this.img = new Image();
        this.img.src = imgSrc;

        this.xPos = xPos;
        this.yPos = yPos;
    }

    /**
     * Draws the GameItem to a given CanvasRenderingContext
     *
     * @param {CanvasRenderingContext2D} ctx - Context to render on
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }

    /**
     * Get the height of the image
     *
     * @returns {number} The height of the image
     */
    public getImgHeight(): number {
        return this.img.height;
    }

    /**
     * Get the width of the image
     *
     * @returns {number} The width of the image
     */
    public getImgWidth(): number {
        return this.img.width;
    }

    /**
     * Get the xPos
     *
     * @returns {number} The x-position of the item
     */
    public getXPos(): number {
        return this.xPos;
    }

    /**
     * Get the yPos
     *
     * @returns {number} The x-position of the item
     */
    public getYPos(): number {
        return this.yPos;
    }
}
