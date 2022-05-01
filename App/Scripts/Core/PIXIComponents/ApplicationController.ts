import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Logger } from '../../Logger';

export class ApplicationController {
	public static get instance(): PIXI.Application {
		return this._instance;
	}

	private static _instance: PIXI.Application;

	public static Instantiate(): void {
		if (this._instance) {
			Logger.LogThrow(new Error("PIXI Application already instantiated!"));
			return;
		}

		this._instance = new PIXI.Application(Config.Main.PIXI.Application);
		document.body.appendChild(this._instance.view);
	}
}