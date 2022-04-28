
import * as PIXI from 'pixi.js';
import { Config } from '../../Config';
import { BaseScene } from "../BaseScene";
import * as Core from "../../Core/Core";
import { ConfigSprites } from '../../ConfigSprites';
import { Logger } from '../../Logger';
import { ApplicationController } from '../../PIXI/ApplicationController';

const { Application } = Config.PIXI; 

const { Characters } = ConfigSprites.Sheets;

export class SceneGame extends BaseScene {
	private _logo?: PIXI.Sprite;

	protected OnBeforeLoadScene(): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1234)
		})
	}

	protected OnLoad(): void {
		this.UpdateLoop(0);
	}

	private ShowLogo(): void {
		// Core.ResourceLoader.Load(Characters.path)
		// 	.then((spriteSheet) => {
		// 		if (!spriteSheet.textures) {
		// 			Logger.LogError("Invalid spritesheed", Characters.path)
		// 			return;
		// 		}

		// 		const logo = new PIXI.Sprite( spriteSheet.textures[Characters.sprites.mi_bunny_idle_03] );

		// 		this.addChild(logo);
		// 		this._logo = logo;
		// 		logo.anchor.set(0.5);
		// 		logo.position.set(Application.width / 2, Application.height / 2);
		// 		logo.scale.set(0.5, 0.5)
		// 	})
	}

	private UpdateLoop(dt: number): void {
		requestAnimationFrame(this.UpdateLoop.bind(this));
		if (!this._logo) return;

		//					  angle							 speed
		this._logo.rotation = (1 / 360 * 90) * Math.sin(dt * 0.005)
	}
}