import PIXI from 'pixi.js';
import TweenLite from 'gsap';
import config  from '../../config';
import utils  from '../../utils';
import Screen from '../../screenManager/Screen'
import Particle from '../elements/Particle'

export default class ParticleBuilderScreen extends Screen{
	constructor(label){
		super(label);
	}
	build(){
		super.build();

		this.backGround = new PIXI.Graphics();
		this.backGround.beginFill(0xF06103);
		this.backGround.drawRect(0,0,config.width, config.height);
		this.addChild(this.backGround)


		var teste1 = utils.createDotTexture({width:32, height:32});
		this.addChild(teste1)

		teste1.x = 100

		var teste2 = utils.createDotTexture({width:32, height:32, innerRadius:5, outerRadius:10});
		this.addChild(teste2)


		teste2.x = teste1.x + teste1.width

		teste1.y = 100
		teste2.y = 100

		var perlinContainer = new PIXI.Container();

		var teste3 = utils.perlinNoise({width:128, height:128, opacity:1});
		// var teste3 = utils.createNoiseTexture({width:128, height:128, opacity:1});
		perlinContainer.addChild(teste3)
		//teste3.x = teste2.x + teste2.width + 100


		var teste8 = utils.createDotTexture({width:128, height:128, innerRadius:0, outerRadius:128/2});
		this.addChild(teste8)
		teste8.x = 250
		teste8.y = 250

		var teste4 = utils.createDotTexture({width:128, height:128, innerRadius:0, outerRadius:128/2});
		perlinContainer.addChild(teste4)
		//teste4.x = teste3.x;
		//teste4.y = teste3.y;
		teste4.blendMode = PIXI.BLEND_MODES.MULTIPLY;

		// perlinContainer.x = 500;
		// perlinContainer.y = 300;

console.log(window.renderer);

		//window.renderer.generateTexture(perlinContainer);
		var teste = new PIXI.Sprite(perlinContainer.generateTexture(window.renderer));

		this.addChild(teste)
		teste.x = 500;
		teste.y = 300;
		//PIXI.CanvasRenderer.generateTexture(perlinContainer)

		//TweenLite.to(teste4, 5, {x:100})

		//perlinContainer.cacheAsBitmap = true;

		teste.blendMode = PIXI.BLEND_MODES.ADD;

		//this.addChild(perlinContainer)

		this.emiter = new PIXI.Container();
		this.particleList = [];

		
		// var teste5 = utils.perlinNoise({width:128, height:128});
		// this.addChild(teste5)

		this.cacheTexture = perlinContainer.generateTexture(window.renderer)//utils.perlinNoise({width:128, height:128});
		

		this.addChild(this.emiter)

		this.counter = 0;
	}

	update(delta){
		// console.log(this);
		this.updateParticle(delta);
		
		

	}

	createParticle(){
		this.counter = 0.01 *  Math.random();

		let params = {};
		params.sprite = new PIXI.Sprite(this.cacheTexture)
		//params.blendMode = PIXI.BLEND_MODES.NORMAL;
		let alpha = Math.random() *0.5 + 0.3;
		params.scale =  Math.random()*0.5 + 0.3;
		params.gravity = 0.008 + Math.random() * 0.05;
		params.velocity = {x:(Math.random() * 0.5 - 0.25)*5, y:(Math.random() * 0.5 + 0.5)*-1 - 2}
		params.alphaScale = [0,alpha,alpha,alpha,alpha,alpha,0]
		params.lifetime = 1 + Math.random() * 3;
		params.rotationSpeed = Math.random() *0.01 - 0.005//3 + Math.random() * 3;

		let particle = new Particle(params);
		particle.x = config.width/2;
		particle.y =200;
		this.particleList.push(particle);

		
		this.emiter.addChild(particle);
	}
	updateParticle(delta){
		if(this.counter < 0){
			this.createParticle();
		}else{
			this.counter -= delta;
		}
		for (var i = 0; i < this.particleList.length; i++) {
			this.particleList[i].update(delta)
		}
		for (var i = 0; i < this.particleList.length; i++) {
			if(this.particleList[i].kill){
				this.particleList.splice(i,1);
			}
		}
	}
	transitionIn(){

		super.transitionIn();

	}
}