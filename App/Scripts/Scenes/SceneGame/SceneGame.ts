
import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from '../../Core';
import { Game } from '../../Game';
import { Screens } from '../../Screens';
import { BaseScene } from "../BaseScene";

const { Application } = Config.Main.PIXI;
const { Characters, Enviroment } = Config.Sprites.Sheets;

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
		const spriteSheet = await Core.ResourceLoader.Get(Enviroment.path);
		if (!spriteSheet.textures) return;

		const background = new PIXI.Sprite();
		background.texture = spriteSheet.textures[Enviroment.sprites.backlayer.gradient];
		background.setParent(this);
		background.width = Application.width;
		background.height = Application.height;

		const sun = new PIXI.Sprite();
		sun.texture = spriteSheet.textures[Enviroment.sprites.backlayer.sun];
		sun.setParent(this);
		sun.position.set(300, 200);
		sun.anchor.set(0.5);
		sun.scale.set(0.7)
	}

	protected OnStart(): void {
		// this.UpdateLoop(0);

		// Screens.Manager.OpenScreen( Screens.List.Start );
		Game.Manager.LoadGame(); 
		Screens.Manager.OpenScreen( Screens.List.Start );
	}

	private UpdateLoop(dt: number): void {
		// requestAnimationFrame(this.UpdateLoop.bind(this));
	}
}