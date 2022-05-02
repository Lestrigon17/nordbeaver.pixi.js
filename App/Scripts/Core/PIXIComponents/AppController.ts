import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Logger } from '../../Logger';

export class AppController {
	public static get persistNode(): typeof AppController._persistNode {
		return this._persistNode;
	}
	public static get instance(): typeof AppController._instance {
		return this._instance;
	}

	private static _instance: PIXI.Application;
	private static _persistNode: PIXI.Container;

	public static Instantiate(): void {
		if (this._instance) {
			Logger.LogThrow(new Error("PIXI Application already instantiated!"));
			return;
		}

		this._instance = new PIXI.Application(Config.Main.PIXI.Application);
		document.body.appendChild(this._instance.view);

		this._instance.stage.sortableChildren = true;

		const persistNode = new PIXI.Container();
		persistNode.zIndex = 9999;
		persistNode.setParent(this._instance.stage);
		this._persistNode = persistNode;
	}
}