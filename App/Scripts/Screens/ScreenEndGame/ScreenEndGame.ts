import * as PIXI from "pixi.js";
import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Logger } from "../../Logger";
import { BaseScreen } from "../BaseScreen";
import { Star } from "./Star";

const { UI: UISprites, UIBackgrounds_1, UIBackgrounds_0 } = Config.Sprites.Sheets

export class ScreenEndGame extends BaseScreen {
	public background!: PIXI.Sprite;
	public backgroundUnderLayer!: PIXI.Sprite;
	public titleLabel?: PIXI.Text;

	public scoreCoinsLabel?: PIXI.Text;
	public scoreDistanceLabel?: PIXI.Text;
	public recordOverlay?: PIXI.Sprite;
	public recordContainer?: PIXI.Container;

	private _scoreCoins: number = 0;
	private _scoreDistance: number = 0;
	private _isRecord: boolean = false;

	private _angleStarStep: number = 115;
	private _starsRadius: number = 400;

	private _labelsStyle: Partial<PIXI.TextStyle> = {
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowBlur: 0,
		dropShadowAngle: 90,
		dropShadowDistance: 3,
		fontFamily: "Krabuler"
	}

	public SetStats(coins: number = 0, distance: number = 0, isRecord: boolean = false): void {
		this._scoreCoins = coins;
		this._scoreDistance = distance;
		this._isRecord = isRecord;

		if (this.scoreCoinsLabel) this.scoreCoinsLabel.text = `${coins}`;
		if (this.scoreDistanceLabel) this.scoreDistanceLabel.text = `${distance} M`;
		if (this.recordContainer) this.SetRecordVisability(isRecord);
	}

	protected OnFirstInitialize(): Promise<void> {
		this.sortableChildren = true;

		return new Promise((resolve) => {
			Core.ResourceLoader.Get(UIBackgrounds_1.path)
				.then((res) => {
					this.CreateBackground(res);
					return Core.ResourceLoader.Get(UISprites.path);
				})
				.then((res) => {
					this.CreateView(res);
					resolve()
				}); 
		})
	}

	protected OnUpdate(deltaTime: number): void {
		if (this.recordOverlay) {
			this.recordOverlay.angle += 1;
			// info: скорее всего Date.now это пиздец по производительности, но dt приходит кривой.
			// todo: придумать что то вменяемое, заменить "магинеческие" числа на переменные
			this.recordOverlay.scale.set( 0.6 + 0.1 * Math.sin(Date.now() / 500) );
			if (this.recordOverlay.angle >= 360) {
				this.recordOverlay.angle = 0;
			}
		}
	}

	private SetRecordVisability(state: boolean): void {
		if (!this.recordContainer) return;
		this.recordContainer.renderable = state;
	}

	private CreateBackground(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UIBackgrounds_1.path);
			return;
		}

		const background = new PIXI.Sprite( spriteSheet.textures[UIBackgrounds_1.sprites.background] );
		background.setParent(this);
		background.anchor.set(0.5);
		background.scale.set(0.6);

		this.background = background;

		this.CreateRecordOverlay();
	}

	private CreateRecordOverlay(): void {
		const recordContainer = new PIXI.Container();
		recordContainer.zIndex = -1;
		recordContainer.setParent(this);
		this.recordContainer = recordContainer;

		const backlayer = new PIXI.Sprite();
		backlayer.setParent(recordContainer);
		backlayer.zIndex = -1;
		backlayer.anchor.set(0.5);
		backlayer.scale.set(0.7);

		Core.ResourceLoader.Get(UIBackgrounds_0.path)
			.then((spriteSheet) => {
				if (spriteSheet && spriteSheet.textures) {
					backlayer.texture = spriteSheet.textures[UIBackgrounds_0.sprites.rays];
				}
			})

		this.recordOverlay = backlayer;
	}

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UISprites.path);
			return;
		}

		this.CreateButtonClose(spriteSheet);
		this.CreateHeader(spriteSheet);
		this.CreateUnkownScore(spriteSheet);
		this.CreateCoinsScore(spriteSheet);
		this.CreateDistanceScore(spriteSheet);
		this.CreateStars();
	}

	private CreateHeader(spriteSheet: PIXI.LoaderResource): void {
		const titleBackground = new PIXI.Sprite();
		titleBackground.setParent(this);
		titleBackground.texture = spriteSheet.textures![UISprites.sprites.screenTitleBackground];
		titleBackground.anchor.set(0.5, 0);
		titleBackground.scale.set(this.background.scale.x);
		titleBackground.position.set(0, -this.background.height / 2 + 5);

		const title = new PIXI.Text(Config.Phrases.yourPoints);
		title.setParent(this);
		title.pivot.set(0.5);
		title.scale.set(0.5);
		title.style.fontSize = "75px";
		title.style.fontFamily = "Krabuler";
		title.style.lineHeight = titleBackground.height;
		title.position.set(-title.width / 2, -this.background.height / 2 + 5);
		
		this.titleLabel = title;
	}

	private CreateUnkownScore(spriteSheet: PIXI.LoaderResource): void {
		const scoreLabel = new PIXI.Text("75");
		scoreLabel.setParent(this);
		scoreLabel.pivot.set(0.5);
		scoreLabel.scale.set(0.5);
		scoreLabel.style.fontSize = "250px";
		scoreLabel.style.fill = "#06eb62", 
		scoreLabel.style = {...scoreLabel.style, ...this._labelsStyle};
		scoreLabel.position.set(-scoreLabel.width / 2, -this.background.height / 2 + 65);
	}

	private CreateCoinsScore(spriteSheet: PIXI.LoaderResource): void {
		const posY = 200;

		const scoreLabel = new PIXI.Text(`${this._scoreCoins}`);
		scoreLabel.setParent(this);
		scoreLabel.anchor.set(0.5);
		scoreLabel.scale.set(0.5);
		scoreLabel.style.fontSize = "125px";
		scoreLabel.style.fill = "#f9bf36", 
		scoreLabel.style = {...scoreLabel.style, ...this._labelsStyle};
		scoreLabel.position.set(
			0, 
			-this.background.height / 2 + posY + scoreLabel.height
		);

		const scoreIcon = new PIXI.Sprite();
		scoreIcon.setParent(this);
		scoreIcon.scale.set(0.7);
		scoreIcon.anchor.set(0.5);
		scoreIcon.texture = spriteSheet.textures![UISprites.sprites.scoreCoinsIcon];
		scoreIcon.position.set(-125, -this.background.height / 2 + posY + scoreIcon.height);

		this.scoreCoinsLabel = scoreLabel;
	}

	private CreateDistanceScore(spriteSheet: PIXI.LoaderResource): void {
		const posY = 300;

		const scoreLabel = new PIXI.Text(`${this._scoreDistance}`);
		scoreLabel.setParent(this);
		scoreLabel.anchor.set(0.5);
		scoreLabel.scale.set(0.5);
		scoreLabel.style.fontSize = "125px";
		scoreLabel.style.fill = "#9ac6ff", 
		scoreLabel.style = {...scoreLabel.style, ...this._labelsStyle};
		scoreLabel.position.set(
			0, 
			-this.background.height / 2 + posY + scoreLabel.height
		);

		const scoreIcon = new PIXI.Sprite();
		scoreIcon.setParent(this);
		scoreIcon.scale.set(0.6);
		scoreIcon.anchor.set(0.5);
		scoreIcon.texture = spriteSheet.textures![UISprites.sprites.ScoreDistanceIcon];
		scoreIcon.position.set(-125, -this.background.height / 2 + posY + scoreIcon.height);

		this.scoreDistanceLabel = scoreLabel;
	}

	private CreateButtonClose(spriteSheet: PIXI.LoaderResource): void {
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteConfig = UISprites.sprites.buttonOk;
		button.spriteSheet = spriteSheet;
		button.zIndex = 2;
		button.scale.set(this.background.scale.x);
		button.position.set(0, this.background.height / 2 - 65);
		
		this.buttonClose = button;
	}

	private CreateStars(): void {
		if (!this.recordContainer) return;

		let angle = 1 / 360 * -360;

		for (let i = 0; i < 5; i++) {
			angle += 1 / 360 * this._angleStarStep;
			const x = this._starsRadius * Math.cos(angle);
			const y = this._starsRadius * Math.sin(angle);

			this.CreateStar(x, y)
		}

		angle = 1 / 360 * -360;

		for (let i = 0; i < 5; i++) {
			angle += 1 / 360 * this._angleStarStep;
			const x = -this._starsRadius * Math.cos(angle);
			const y = this._starsRadius * Math.sin(angle);

			this.CreateStar(x, y)
		}
	}

	private CreateStar(posX: number, posY: number): void {
		const star = new Star();
		star.setParent(this.recordContainer!);
		star.position.set(posX, posY);
	}
}