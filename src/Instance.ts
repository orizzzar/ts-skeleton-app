interface InstanceCoords {
    x: number;
    y: number;
    w: number;
    h: number;
}

class Instance {
    private coords: InstanceCoords;

    private storage: InstanceStorage;
    private storageKey: Symbol;

    private drawer: Drawer;
    private sprite: DrawSpriteType = null; // Change to SpriteType type

    private ticksPassed = 0;

    public constructor(coords: InstanceCoords, priority: number, storage: InstanceStorage) {
        this.coords = coords;
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
        this.drawer.draw(this.coords, this.sprite);
    }


}