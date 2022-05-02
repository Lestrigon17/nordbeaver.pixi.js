
import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from '../../Core';
import { Screens } from '../../Screens';
import { BaseScene } from "../BaseScene";

const { Application } = Config.Main.PIXI;
const { Characters } = Config.Sprites.Sheets;

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

	protected OnStart(): void {
		// this.UpdateLoop(0);

		// Screens.Manager.OpenScreen( Screens.List.Start );
		Screens.Manager.OpenScreen<Types.Screens.List.EndGame>( Screens.List.EndGame )
			.then(screen => {
				screen.SetStats(10, 25, true);
			})
	}

	private UpdateLoop(dt: number): void {
		// requestAnimationFrame(this.UpdateLoop.bind(this));
	}
}