import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from "../../Core";
import { Logger } from '../../Logger';
import { Balloon } from '../Entities/Balloon';
import { Coin } from '../Entities/Coin';
import { Jumper } from '../Entities/Jumper';
import { Stopper } from '../Entities/Stopper';
import { Builder } from './Builder';

const { Enviroment, EnviromentBackgrounds} = Config.Sprites.Sheets;

export class Platform extends Core.PIXIComponents.Base {
	public floorSprite?: PIXI.Sprite;
	public buldingLayer!: PIXI.Container;
	public backgroundLayer!: PIXI.Container;
	public foregroundLayer!: PIXI.Container;
	public isRequireSpawnView: boolean = true;

	private _spriteSheet?: PIXI.LoaderResource;
	
	private _treesTexture: string[] = [
		Enviroment.sprites.trees[1],
		Enviroment.sprites.trees[2]
	]

	private _foregroundTextures: string[] = [
		Enviroment.sprites.checkPoint,
		Enviroment.sprites.foreground.pillar,
		Enviroment.sprites.foreground.directionPlate,
	]

	protected OnLoad(): void {
		this.sortableChildren = true;
		Core.ResourceLoader.Get(Enviroment.path)
			.then(this.CreateView.bind(this));
	}

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Can not load sprites from", Enviroment.path);
			return;
		} 
		this._spriteSheet = spriteSheet;

		this.backgroundLayer = new PIXI.Container();
		this.backgroundLayer.setParent(this);
		this.backgroundLayer.zIndex = 10;

		this.buldingLayer = new PIXI.Container();
		this.buldingLayer.setParent(this);
		this.buldingLayer.zIndex = 20;

		this.foregroundLayer = new PIXI.Container();
		this.foregroundLayer.setParent(this);
		this.foregroundLayer.zIndex = 50;
		this.foregroundLayer.sortableChildren = true;

		this.CreateFloor();
		this.CreateClouds();
		if (this.isRequireSpawnView) {
			this.SpawnBackground();
			this.CreateBuilding();
			this.CreateCoins();
			this.CreateJumper();
			this.CreateStoppers();
		}
	}

	private CreateBuilding(): void {
		const building = Builder.CreateBuilding();
		building.setParent(this.buldingLayer);
		const position = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth/2);
		building.position.set(position, 5); 
	}

	private SpawnBackground(): void {
		const spriteSheet = this._spriteSheet;
		if (!spriteSheet || !spriteSheet.textures) return;

		const treesCount = Core.Utils.Number.RandomInteger(0, 6);
		const backgroundCount = Core.Utils.Number.RandomInteger(0, 3);
		const foregroundCount = Core.Utils.Number.RandomInteger(0, 3);

		// trees
		for (let i = 0; i < treesCount; i++) {
			const randomSprite = Core.Utils.Array.GetRandom(this._treesTexture)!;
			const randomPosition = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth);
			const tree = new PIXI.Sprite();
			tree.texture = spriteSheet.textures![randomSprite];
			tree.setParent(this.backgroundLayer); 
			tree.anchor.set(0.5, 1);
			tree.scale.set(0.7);
			tree.position.set(randomPosition, 5);
		}

		// foreground
		for (let i = 0; i < foregroundCount; i++) {
			const randomSprite = Core.Utils.Array.GetRandom(this._foregroundTextures)!;
			const randomPosition = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth);
			const tree = new PIXI.Sprite();
			tree.texture = spriteSheet.textures![randomSprite];
			tree.setParent(this.foregroundLayer); 
			tree.anchor.set(0.5, 1);
			tree.scale.set(0.6);
			tree.position.set(randomPosition, 5);
		}

		// fenses
		for (let i = 0; i < backgroundCount; i++) {
			const randomSprite = Enviroment.sprites.foreground.fense!;
			const randomPosition = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth);
			const fense = new PIXI.Sprite();
			fense.texture = spriteSheet.textures![randomSprite];
			fense.setParent(this.backgroundLayer); 
			fense.anchor.set(0.5, 1);
			fense.scale.set(0.5);
			fense.angle = -5
			fense.position.set(randomPosition, 20);
		}
	}

	private async CreateFloor(): Promise<void> {
		const spriteSheet = await Core.ResourceLoader.Get(EnviromentBackgrounds.path);
		if (!spriteSheet.textures) {
			Logger.LogError("Can not load sprites from", EnviromentBackgrounds.path);
			return;
		}

		const floorSprite = new PIXI.Sprite();
		floorSprite.texture = spriteSheet.textures[EnviromentBackgrounds.sprites.platform];
		floorSprite.setParent(this);
		floorSprite.anchor.set(0, 0);
		floorSprite.zIndex = 21;
	}

	private async CreateClouds():  Promise<void> {
		const spriteSheet = await Core.ResourceLoader.Get(Enviroment.path);
		if (!spriteSheet.textures) {
			Logger.LogError("Can not load sprites from", Enviroment.path);
			return;
		}

		let count = Core.Utils.Number.RandomInteger(0, 5);
		
		for (let i = 0; i < count; i++) {
			let xPos = Core.Utils.Number.RandomInteger(100, Config.Main.PIXI.Game.platformWidth - 100);
			let yPos = Core.Utils.Number.RandomInteger(-450, -600);

			const cloud = new PIXI.Sprite();
			// @ts-ignore
			cloud.texture = spriteSheet.textures[Enviroment.sprites.clouds[`${1 + (i % 2)}`]];
			cloud.setParent(this.foregroundLayer);
			cloud.scale.set(0.5)
			cloud.position.set(xPos, yPos);
			cloud.anchor.set(0, 0);
			cloud.zIndex = 999;
		}
		
	}

	private CreateCoins(): void {
		let coinsCount = Core.Utils.Number.RandomInteger(0, 5);
		let startPosition = Core.Utils.Number.RandomInteger(100, Config.Main.PIXI.Game.platformWidth - 100);

		for (let i = 0; i < coinsCount; i++) {
			const coin = new Coin();
			coin.setParent(this.foregroundLayer);
			coin.position.set(startPosition + 55 * i, -5);
			coin.zIndex = 10
		}
	}
	private CreateJumper(): void {
		let isRequire = Core.Utils.Number.RandomInteger(0, 3);
		if (!isRequire) return;
		let startPosition = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth / 2);

		const jumper = new Jumper();
		jumper.setParent(this.foregroundLayer);
		jumper.position.set(startPosition, 10);

		let spawnBallon = Core.Utils.Number.RandomInteger(0, 2);
		if (spawnBallon) {
			this.CreateBallon(startPosition);
		}
	}

	private CreateBallon(posX: number): void {
		const ballon = new Balloon();
		ballon.setParent(this.foregroundLayer);
		ballon.scale.set(0.8)
		ballon.position.set(posX + 100, -150);

		let coinsCount = Core.Utils.Number.RandomInteger(3, 8);

		for (let i = 0; i < coinsCount; i++) {
			const coin = new Coin();
			coin.setParent(this.foregroundLayer);
			coin.position.set(posX + 225 + 55 * i, -250 -5*i);
		}
	}

	private CreateStoppers(): void {
		let count = Core.Utils.Number.RandomInteger(0, 3);

		for (let i = 0; i < count; i++) {
			let position = Core.Utils.Number.RandomInteger(
								Config.Main.PIXI.Game.platformWidth / 2, 
								Config.Main.PIXI.Game.platformWidth
							);

			const stopper = new Stopper();  
			stopper.setParent(this.foregroundLayer);
			stopper.position.set(position, 10);
			stopper.zIndex = 20;
		}
	}
}