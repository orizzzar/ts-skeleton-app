/// <reference path="GameEntity.ts"/>

/**
 * Base class of all Game Entities that must draw an image
 */
class LivesField extends GameEntity {

    private lifeImages: GameImageEntity[];

    constructor(resources: ResourceRepository) {
        const life = resources.getImage('playerLife1');
        
        super(new Vector())
    }    
    
    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
   public draw(ctx: CanvasRenderingContext2D) {

   }

   /**
    * Let this game entity draw debug info about itself on the correct 
    * position on the given CanvasRenderingContext2D.
    *
    * @param ctx The CanvasRenderingContext2D to draw to
    */
   public drawDebugInfo(ctx: CanvasRenderingContext2D) {
       ctx.save();
       ctx.strokeStyle = '#ffffb3';
       ctx.beginPath();
       // Draw center crosshair
       ctx.moveTo(this.pos.x-50,this.pos.y);
       ctx.lineTo(this.pos.x+50,this.pos.y);
       ctx.moveTo(this.pos.x,this.pos.y-50);
       ctx.lineTo(this.pos.x,this.pos.y+50);
       ctx.stroke();
       // Draw position info
       ctx.font = 'courier 12px';
       ctx.fillStyle = '#ffffb3';
       ctx.fillText(`pos: ${this.pos}`, this.pos.x + 3, this.pos.y - 3);
       
       ctx.restore();
   }


}

