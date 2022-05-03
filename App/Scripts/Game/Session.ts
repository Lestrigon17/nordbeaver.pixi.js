import * as PIXI from 'pixi.js'
import { Config } from '../Configs';
import { Core } from '../Core';
import { Platform } from './Prefabs/Platform';

const {Application: AppConfig} = Config.Main.PIXI

// TODO: Ограничить максималку по x у platformSpeed
export class Session {
	private _scoreCoins: number = 0;
	private _scoreDistance: number = 0;
	private _platformHeightPercent: number = 20;
	private _masterContainer!: PIXI.Container;
	private _speedContainer!: PIXI.Container;
	private _platformSpeed: number = 0;
	private _platformStorage: Platform[] = [];

	constructor(parent: PIXI.Container) {
		const masterContainer = new PIXI.Container();
		masterContainer.setParent(parent);
		masterContainer.angle = 5;
		this._masterContainer = masterContainer;

		const speedContainer = new PIXI.Container();
		speedContainer.setParent(masterContainer);
		this._speedContainer = speedContainer;

		this.InstantiateStartPlatform();

		this.OnUpdate();
	}

	private OnUpdate(): void {
		requestAnimationFrame(this.OnUpdate.bind(this));
		this.CheckPlatforms();

		this._masterContainer.angle = 5 / 100 * this._platformSpeed;
		this._speedContainer.position.x -= this._platformSpeed;

		// this._platformSpeed = Core.Utils.Number.Lerp(this._platformSpeed, 100, 0.01);
	}

	private InstantiateStartPlatform(): void {
		this.SpawnNewPlatform();
		this.SpawnNewPlatform();
	}

	private CheckPlatforms(): void {
		// checkFirst
		const leftPlatform = this._platformStorage[0];
		if (leftPlatform.getGlobalPosition().x < -Config.Main.PIXI.Game.platformWidth) {
			this._platformStorage.shift();
			leftPlatform.destroy();
		}

		const rightPlatform = this._platformStorage[this._platformStorage.length - 1];
		if (rightPlatform.getGlobalPosition().x < Config.Main.PIXI.Game.platformWidth) {
			this.SpawnNewPlatform();
		}
	}

	private SpawnNewPlatform(): Platform {
		const lastPlatform = this._platformStorage[this._platformStorage.length - 1];
		const y = AppConfig.height - AppConfig.height * this._platformHeightPercent * 0.01;
		const x = lastPlatform ? lastPlatform.position.x + Config.Main.PIXI.Game.platformWidth : 0 

		let platform = new Platform();
		platform.setParent(this._speedContainer);
		platform.position.set(x, y);
		this._platformStorage.push(platform);
		console.log(platform.position.x, this._platformStorage.length);
		return platform;
	}
}