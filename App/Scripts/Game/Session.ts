import * as PIXI from 'pixi.js'
import { Config } from '../Configs';
import { Core } from '../Core';
import { Screens } from '../Screens';
import { Player } from './Player';
import { Platform } from './Prefabs/Platform';

const {Application: AppConfig} = Config.Main.PIXI
const { EnviromentBackgrounds } = Config.Sprites.Sheets;

// TODO: Ограничить максималку по x у platformSpeed
export class Session {
	private _platformHeightPercent: number = 20;
	private _mountainsContainer!: PIXI.Container;
	private _masterContainer!: PIXI.Container;
	private _speedContainer!: PIXI.Container;
	private _platformSpeed: number = 0;
	private _platformStorage: Platform[] = [];
	private _mountainsStorage: PIXI.Sprite[] = [];
	private _mouseHandler?: Types.Core.PIXIComponents.Button;
	private _maxSpeed: number = 20;
	private _isStared: boolean = false;
	private _player!: Player;
	private _isDestroyed: boolean = false;

	constructor(parent: PIXI.Container) {
		const mountainsContainer = new PIXI.Container();
		mountainsContainer.setParent(parent);
		this._mountainsContainer = mountainsContainer;

		const masterContainer = new PIXI.Container();
		masterContainer.setParent(parent);
		masterContainer.angle = 5;
		this._masterContainer = masterContainer;

		const speedContainer = new PIXI.Container();
		speedContainer.setParent(masterContainer);
		this._speedContainer = speedContainer;

		const mouseHandler = new Core.PIXIComponents.Button();
		mouseHandler.setParent(parent);
		mouseHandler.hitArea = new PIXI.Rectangle(0, 0, AppConfig.width, AppConfig.height);
		this._mouseHandler = mouseHandler;

		this.InstantiateStartEntities();

		this.OnUpdate();
		this.InstantiatePlayer();
		mouseHandler.OnButtonEvent.Subscribe(this.OnPlayerClick, this);
	}

	public OnPlayerClick(ev: Types.Core.PIXIComponents.EEventType): void {
		if (ev !== Core.PIXIComponents.Button.EEventType.PointerUp) return;
		if (!this._player) return;
		if (!this._isStared) return;
		
		this._player.OnJumpClick();
	}

	public Start(): void {
		if (this._isStared) return; 
		this._isStared = true;
		
		if (this._player) {
			this._player.maxSpeed = this._maxSpeed;
			this._player.currentSpeed = 1.01;
			this._player.targetSpeed = this._maxSpeed;
			this._player.lastSpeedUp = Date.now() + 7000;
			this._player.isActive = true;
		}
	}

	public Destroy(): void {
		if (this._mountainsContainer) this._mountainsContainer.destroy();
		if (this._masterContainer) this._masterContainer.destroy();
		if (this._speedContainer) this._speedContainer.destroy();
		if (this._player) this._player.destroy();
		if (this._mouseHandler) {
			this._mouseHandler.OnButtonEvent.Unsubscribe(this.OnPlayerClick, this);
			this._mouseHandler.destroy();
		}
		this._isDestroyed = true;
	}

	private InstantiatePlayer(): void {
		this._player = new Player();
		this._player.setParent(this._masterContainer);
		this._player.SetDefaultPosition({
			x: 250,
			y: AppConfig.height - AppConfig.height * this._platformHeightPercent * 0.01 + 5
		})
	}

	private OnUpdate(): void {
		if (this._isDestroyed) return;
		requestAnimationFrame(this.OnUpdate.bind(this));
		if (!this._isStared) return;
		this.CheckPlatforms();
		this.CheckMountains();
		this.CheckPlayerJump();

		if (this._player) {
			this._platformSpeed = this._player.currentSpeed;

			if (this._player.currentSpeed < 1 && this._player.isActive) {
				this._isStared = false;
				const openParams = {
					prevScreen: Screens.Manager.GetFromCache(Screens.List.Start)
				}
				Screens.Manager.OpenScreen<Types.Screens.List.EndGame>(
					Screens.List.EndGame, 
					openParams
				).then((screen: Types.Screens.List.EndGame) => {
					let {scoreCoins, scoreDistance} = this._player;
					scoreDistance = Math.floor(scoreDistance);
					const totalScore = scoreCoins * 5 + scoreDistance;

					screen.SetStats(
						totalScore,
						scoreCoins,
						scoreDistance,
						true
					)
				})
			}
		}

		this._masterContainer.angle = 5 / this._maxSpeed * this._platformSpeed;
		this._speedContainer.position.x -= this._platformSpeed;
		this._mountainsContainer.position.x -= this._platformSpeed / this._maxSpeed;
		this._speedContainer.position.y = 0;

		// this._platformSpeed = Core.Utils.Number.Lerp(this._platformSpeed, this._maxSpeed, 0.01);
	}

	private CheckPlayerJump(): void {
		if (!this._player) return;
		this._masterContainer.position.y = Math.max(
			this._player.currentJumpHeight - this._player.maxJumpHeight, 0
		)
	}

	private InstantiateStartEntities(): void {
		this.SpawnNewPlatform()
			.isRequireSpawnView = false;

		this.SpawnNewPlatform()
			.isRequireSpawnView = false;

		this.SpawnNewMountain();
		this.SpawnNewMountain();
		this.SpawnNewMountain();
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

	private CheckMountains(): void {
		if (this._mountainsStorage.length === 0) return;
		// checkFirst
		const leftPlatform = this._mountainsStorage[0];
		if (leftPlatform && 
			leftPlatform.getGlobalPosition().x < -Config.Main.PIXI.Game.mountainWidth
		) {
			this._mountainsStorage.shift();
			leftPlatform.destroy();
		}

		const rightPlatform = this._mountainsStorage[this._mountainsStorage.length - 1];
		if (rightPlatform && 
			rightPlatform.getGlobalPosition().x <= Config.Main.PIXI.Game.mountainWidth
		) {
			this.SpawnNewMountain();
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

		return platform;
	}

	private async SpawnNewMountain(): Promise<void> {
		const lastPlatform = this._mountainsStorage[this._mountainsStorage.length - 1];
		const y = AppConfig.height + 50;
		const x = lastPlatform ? (
				  	lastPlatform.position.x + 
					Config.Main.PIXI.Game.mountainWidth * lastPlatform.scale.x
				) : 0 
		
		const mountain = new PIXI.Sprite();
		mountain.setParent(this._mountainsContainer);
		mountain.anchor.set(0, 1);
		mountain.scale.set(0.5);
		mountain.position.set(x, y);
		this._mountainsStorage.push(mountain);
		
		const spriteSheetBackgrounds = await Core.ResourceLoader.Get(EnviromentBackgrounds.path);
		if (!spriteSheetBackgrounds.textures) return;
		mountain.texture = spriteSheetBackgrounds.textures[EnviromentBackgrounds.sprites.rocks];
	}
}