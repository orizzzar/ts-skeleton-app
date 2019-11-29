/// <reference path="Fruit.ts" />

class Kiwi extends Fruit {
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
    super(name, lifespan, xPos, yPos, imageSource);
  }

  public draw() {}
  public move() {
    console.log("moving");
  }
}
