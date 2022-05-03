import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from "../../Core";
import { Logger } from '../../Logger';

const { Enviroment, EnviromentBackgrounds} = Config.Sprites.Sheets;

export class Platform extends Core.PIXIComponents.Base {
	public floorSprite?: PIXI.Sprite;
	public buldingLayer!: PIXI.Container;
	public backgroundLayer!: PIXI.Container;
	public foregroundLayer!: PIXI.Container;
	
	private _treesTexture: string[] = [
		Enviroment.sprites.trees[1],
		Enviroment.sprites.trees[2]
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

		this.backgroundLayer = new PIXI.Container();
		this.backgroundLayer.setParent(this);
		this.backgroundLayer.zIndex = 10;
		this.buldingLayer = new PIXI.Container();
		this.buldingLayer.setParent(this);
		this.buldingLayer.zIndex = 20;
		this.foregroundLayer = new PIXI.Container();
		this.foregroundLayer.setParent(this);
		this.foregroundLayer.zIndex = 50;

		this.CreateFloor();
		this.SpawnBackground(spriteSheet);
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
		floorSprite.zIndex = 11;
	}

	private SpawnBackground(spriteSheet: PIXI.LoaderResource): void {
		const treesCouns = Core.Utils.Number.RandomInteger(0, 5);
		console.log(treesCouns);

		for (let i = 0; i < treesCouns; i++) {
			const randomSprite = Core.Utils.Array.GetRandom(this._treesTexture)!;
			const randomPosition = Core.Utils.Number.RandomInteger(0, Config.Main.PIXI.Game.platformWidth);
			const tree = new PIXI.Sprite();
			tree.texture = spriteSheet.textures![randomSprite];
			tree.setParent(this.foregroundLayer);
			tree.anchor.set(0.5, 1);
			tree.scale.set(0.5);
			tree.position.set(randomPosition, 5);
		}
	}
}