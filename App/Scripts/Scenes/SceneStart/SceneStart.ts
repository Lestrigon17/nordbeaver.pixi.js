import FontFaceObserver from 'fontfaceobserver';
import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { BaseScene } from "../BaseScene";
import { Logger } from '../../Logger';
import { Manager } from '../Manager';
import { SceneGame } from '../SceneGame/SceneGame';
import { Core } from '../../Core';

const { Application } = Config.Main.PIXI; 
const { Characters } = Config.Sprites.Sheets;

export class SceneStart extends BaseScene {
	private _logo?: PIXI.Sprite;

	private _resourceList: string[] = [
		Characters.path
	]

	protected OnBeforeLoadScene(): Promise<void> {
		return new Promise((resolve, reject) => {
			Core.ResourceLoader.GetList(this._resourceList)
				.then(() => resolve());
		})
	}

	protected OnStart(): void {
		this.ShowLogo();
		this.UpdateLoop(0);

		// Load sounds
		Core.SoundPlayer.Init()
			.then(() => {
				let font = new FontFaceObserver('Krabuler', {});
				return font.load();
			})
			.then(() => {
				Manager.LoadScene(SceneGame);
			})
	}

	private ShowLogo(): void {
		Core.ResourceLoader.Get(Characters.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) {
					Logger.LogError("Invalid spritesheed", Characters.path)
					return;
				}

				const logo = new PIXI.Sprite( spriteSheet.textures[Characters.sprites.mi_bunny_idle_03] );

				this.addChild(logo);
				this._logo = logo;
				logo.anchor.set(0.5);
				logo.position.set(Application.width / 2, Application.height / 2);
				logo.scale.set(0.5, 0.5);
			})
	}

	private UpdateLoop(dt: number): void {
		requestAnimationFrame(this.UpdateLoop.bind(this));
		if (!this._logo) return;

		//					  angle							 speed
		this._logo.rotation = (1 / 360 * 90) * Math.sin(dt * 0.005)
	}
}