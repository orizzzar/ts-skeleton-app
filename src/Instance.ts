
class Instance {
    private x: number;
    private y: number;
    private w: number;
    private h: number;
    private sprite: String; // Change to SpriteType type

    private storage: InstanceStorage;
    private storageKey: Symbol;

    private ticksPassed = 0;

    public constructor(x: number, y: number, w: number, h: number, priority: number, storage: InstanceStorage) {
        this.storage = storage;
        this.storageKey = this.storage.add(this, priority);
    }

    public destroy() {
        this.storage.remove(this.storageKey);
    }

    public onHover() {
        console.log("hover instance");
   }

   public onClick() {
        console.log("hover instance");
    }

    public tick() {
        this.ticksPassed++;
    }

    public draw() {

    }


}