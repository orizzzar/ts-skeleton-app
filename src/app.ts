/**
 * TODO
 * 1. [done] refactor the Fruit interface
 * 2. [done] make the kiwi and apple smaller
 * 3. [done] spawn within the screen borders
 * 4. for debug purpose add start and stop animation based on key's //https://css-tricks.com/using-requestanimationframe/
 * 5. [done] add Chrome support (for now only firefox seem to work)
 * 6. [done] click detection is not properly set up
 * 7. [done[ add current score to the screen
 * 8. [done] if apple is clicked score-- and if kiwi is clicked score++
 */

// interface Fruit {
//   alive: number;
//   xPos: number;
//   yPos: number;
//   image: HTMLImageElement;
// }
class Game {
  private fruits: any[];
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private counter: number;
  private score: number;

  /**
   * Constructor method to construct an instance of the Game Class
   * @param {HTMLCanvasElement} canvasId - canvas in the DOM
   */
  public constructor(canvasId: HTMLCanvasElement) {
    // Construct all of the canvas
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // Set the context of the canvas
    this.ctx = this.canvas.getContext("2d");

    this.fruits = [];

    // add some kiwis
    for (let index = 0; index < this.randomNumber(3, 10); index++) {
      this.fruits.push(this.fruitFactory("./assets/kiwi-sm.png", 'kiwi'));
    }

    // add an apple
    this.fruits.push(this.fruitFactory("./assets/apple-sm.png", 'apple'));

    // add an mouse event
    document.addEventListener("click", this.mouseHandler);

    // set the counter to 0
    this.counter = 0;
    this.score = 0;
    this.loop();
  }
  /**
   * Method for the Game Loop
   */
  private loop = () => {
    this.draw();
    this.counter++;

    // for loop to delete an element from the fruit array if it is not alive anymore
    for (let i = 0; i < this.fruits.length; i++) {
      if (this.counter >= this.fruits[i].alive) {
        this.fruits.splice(i, 1); // remove an element from the kiwi array
      }
    }

    // in the first loop no images are loaded
    requestAnimationFrame(this.loop);
  };

  /**
   * Method to create a Fruit object
   * @param source - string for image url
   * @return Fruit - returns a fruit object
   * 
   * The fruit object has the following attributes:
   * - name of the fuit object
   * - alive: amount of seconds a fruit object is visible on the screen (based on counter and frame per seconds)
   * - xPos: x position on the canvas
   * - yPos: y position on the canvas
   * - image: an HTMLimageElement of the kiwi or apple
   */
  private fruitFactory(source: string, name: string): any {
    return {
      name: name,
      alive: this.randomNumber(0, 350),
      xPos: this.randomNumber(0, this.canvas.width - 200),
      yPos: this.randomNumber(0, this.canvas.height - 200),
      image: this.loadNewImage(source)
    };
  }

  /**
   * Method to handle the mouse event
   * @param {MouseEvent} event - mouse event
   */
  private mouseHandler = (event: MouseEvent) => {
    console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

    // simple click detection
    this.fruits.forEach(element => {
      if (
        event.clientX >= element.xPos &&
        event.clientX < element.xPos + element.image.width &&
        event.clientY >= element.yPos &&
        event.clientY <= element.yPos + element.image.height
      ) {
        //check to see if element is an apple or an kiwi
        //if(element.)
        if(element.name == 'kiwi' ){
          this.score++;
        }
        else if (element.name == 'apple'){
          this.score--;
        }
      }
    });
  };

  /**
   * Method to load an image
   * @param source
   * @return HTMLImageElement - returns an image
   */
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Method to draw fruit to the canvas
   */
  private draw() {
    // when there are elements in the fruit array
    if (this.fruits.length != 0) {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw each fruit
      this.fruits.forEach(element => {
        // Ternary operator to check if starting position are not negative.
        this.ctx.drawImage(
          element.image,
          element.xPos,
          element.yPos
        );
      });
      //write the current score
      this.writeTextToCanvas(
        `Score is: ${this.score}`,
        40,
        100,
        40
      );
    } else {
      // if there are no elements in the fruit array left draw game over.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas(
        "Game over",
        60,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      // draw the end score
      this.writeTextToCanvas(
        `Uw score is: ${this.score}`,
        40,
        this.canvas.width / 2,
        this.canvas.height / 2 + 50
      );
    }
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

// Initialize the game after the DOM is loaded.
let init = () => {
  const KiwiWars = new Game(
    document.getElementById("canvas") as HTMLCanvasElement
  );
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
