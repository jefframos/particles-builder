import PIXI from 'pixi.js';

export default class Particle extends PIXI.Container {
	/**
		params.particleSrc
		params.blendMode
		params.tint
		params.scale
		params.scaleIncrease
		params.velocity
		params.alphascale
		params.lifetime
	**/
    constructor(params) {

    	super();

         // this.sprite = PIXI.Sprite.fromFrame('additiveTriangleParticle.jpg');
        // this.sprite = PIXI.Sprite.fromFrame('additiveHardParticle.jpg');
        this.sprite = params.sprite?params.sprite:(PIXI.Sprite.fromFrame(params.particleSrc?params.particleSrc:'additiveParticle.png'));
        this.sprite.blendMode = params.blendMode != undefined ?params.blendMode:PIXI.BLEND_MODES.ADD;
        this.sprite.anchor.set(0.5);
        this.sprite.tint = params.tint?params.tint:0xFFFFFF
        this.scale.set(params.scale != undefined ?params.scale:2.5);
        this.addChild(this.sprite);
        this.alpha = 1;
        this.scaleIncrease = params.scaleIncrease != undefined?params.scaleIncrease:{x:0,y:0};
        this.kill = false;
        this.velocity = params.velocity?params.velocity:{x:(Math.random()-0.5)/2, y:-Math.random()*1.2}
        this.alphaScale = params.alphaScale != null?params.alphaScale:[0,0.2,0];
        this.maxLifetime = params.lifetime?params.lifetime:2;
        this.rotationSpeed = params.rotationSpeed?params.rotationSpeed:0;
        this.life = this.maxLifetime;
        this.nlife = 0;
        this.gravity = params.gravity?params.gravity:0;

    }

    update ( dt ) {
    	this.sprite.rotation += this.rotationSpeed;
    	this.life -= dt;
    	this.nlife = this.life / this.maxLifetime;
    	this.velocity.y +=this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.nAlpha = this.updateAlphaScale(1-this.nlife);
        if(this.nAlpha)
        	this.alpha = this.nAlpha//!this.nAlpha?1:this.nAlpha

        this.scale.x += this.scaleIncrease.x;
        this.scale.y += this.scaleIncrease.y;

        // console.log(this.parent);
        if(this.life < 0){
            this.kill = true;
            if(this.parent)
                this.parent.removeChild(this);
        }
    }
	updateAlphaScale ( nTime ) {
		let tempId = Math.floor(nTime * this.alphaScale.length)

		//console.log(tempId);
		if(this.alphaScale.length <= 1 || tempId >= this.alphaScale.length - 1){
			return false;
		}
		let tempValue = this.alphaScale[tempId]
		let transition = this.alphaScale[tempId + 1] - tempValue

		let mtime = 1/ this.alphaScale.length
		let time = nTime - (tempId * mtime)
		let startvalue = tempValue;
		let changevalue = this.alphaScale[tempId + 1] - startvalue;

		let ret = changevalue*time/ mtime + startvalue
		return ret;
	}

}
