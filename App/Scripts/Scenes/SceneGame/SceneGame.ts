
import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from '../../Core';
import { Game } from '../../Game';
import { Screens } from '../../Screens';
import { BaseScene } from "../BaseScene";
import { GameUI } from './GameUI';

const { Application } = Config.Main.PIXI;
const { Characters, Enviroment, EnviromentBackgrounds } = Config.Sprites.Sheets;

export class SceneGame extends BaseScene {
	private _logo?: PIXI.Sprite;
	private _resourceList: string[] = [
		Config.Sprites.Sheets.UI.path
	]

	protected OnBeforeLoadScene(): Promise<void> {
		return new Promise((resolve, reject) => {
			Core.ResourceLoader.GetList(this._resourceList)
				.then(() => resolve());
		})
	}

	protected async OnLoad(): Promise<void> {
		this.sortableChildren = true;

		const spriteSheetEnv = await Core.ResourceLoader.Get(Enviroment.path);
		if (!spriteSheetEnv.textures) return;

		const background = new PIXI.Sprite();
		background.texture = spriteSheetEnv.textures[Enviroment.sprites.backlayer.gradient];
		background.setParent(this);
		background.width = Application.width;
		background.height = Application.height;
		background.zIndex = -10;

		const sun = new PIXI.Sprite();
		sun.texture = spriteSheetEnv.textures[Enviroment.sprites.backlayer.sun];
		sun.setParent(this);
		sun.position.set(300, 200);
		sun.anchor.set(0.5);
		sun.scale.set(0.7);
		sun.zIndex = -1;

		const gameUI = new GameUI();
		gameUI.setParent(this);
		gameUI.zIndex = 999;
	}

	protected OnStart(): void {
		Game.Manager.LoadGame(); 
		Screens.Manager.OpenScreen( Screens.List.Start );
		Game.EntityController.Init();
	}

	private UpdateLoop(dt: number): void {
	}
}