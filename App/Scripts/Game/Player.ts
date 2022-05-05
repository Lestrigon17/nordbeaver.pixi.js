import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
import { Core } from "../Core";

const { Characters } = Config.Sprites.Sheets
const { Lerp } = Core.Utils.Number;

export enum EPlayerState {
	Jump,
	InFall,
	OnGround
}

export class Player extends Core.PIXIComponents.Base {
	public static EPlayerState = EPlayerState;
	// Score
	public scoreDistance: number = 0;
	public scoreCoins: number = 0;
	public playerSprite!: PIXI.Sprite;

	//  Speed
	public currentSpeed: number = 0;
	public targetSpeed = 10;
	public maxSpeed = 10;

	public lastSpeedUp: number = 0;
	public speedUpTime: number = 5000;

	// Jump
	public currentJumpHeight: number = 0;
	public targetJumpHeight: number = 0;
	public maxJumpHeight: number = 250;

	public jumpHeightSpeed: number = 0.03;
	public fallHeightSpeedStart: number = 0.001;
	public jumpTime: number = 1000; // milliseconds

	public get state(): EPlayerState {
		return this._state;
	}

	public isActive: boolean = false;

	private _state: EPlayerState = EPlayerState.OnGround;
	private _defaultPosition?: PIXI.IPointData;
	private _currentLerpJump = 0.1;
	private _fallTime: number = 0;
	private _scoreDistanceLabel?: PIXI.Text;

	private _OnKeyUpBounded?: (key: DocumentEventMap["keyup"]) => void;

	public SmallJump(): void {
		this.AddTargetJumpHeight(150);
		this.Jump();
	}

	public BigJump(): void {
		this.AddTargetJumpHeight(225);
		this.Jump();
	}

	public BackToGround(): void {
		// if (this._state === EPlayerState.OnGround) return;
		this.SetTargetJumpHeight(0);
		this._fallTime = 0;
		this._currentLerpJump = 0.5;
		this._state = EPlayerState.InFall;
	}

	private Jump(): void {
		this._state = EPlayerState.Jump;
		this._currentLerpJump = this.jumpHeightSpeed;
		this._fallTime = Date.now() + this.jumpTime;
	}

	private AddTargetJumpHeight(height: number) {
		this.SetTargetJumpHeight(this.currentJumpHeight + height);
	}

	private SetTargetJumpHeight(height: number) {
		this.targetJumpHeight = height;
	}

	public SetDefaultPosition(position: PIXI.IPointData): void {
		this._defaultPosition = position;
		this.position.set(position.x, position.y);
	}

	public OnJumpClick(): void {
		if (!this.isActive) return;
		
		if (this._state !== EPlayerState.OnGround) {
			this.BackToGround();
			return;
		}
		this.SmallJump();
	}

	public SpeedUp(): void {
		this.currentSpeed = this.maxSpeed;
		this.targetSpeed = this.maxSpeed;
		this.lastSpeedUp = Date.now() + this.speedUpTime;
	}

	public Kill(): void {
		this.currentSpeed = 0;
		this.targetSpeed = 0;
		this.angle = 90;
	}

	protected OnLoad(): void {
		this.playerSprite = new PIXI.Sprite();
		this.playerSprite.setParent(this);
		this.LoadView();

		this._OnKeyUpBounded = (key: DocumentEventMap["keyup"]) => {
			if (key.code !== "Space") return;
			this.OnJumpClick()
		};
		document.addEventListener("keyup", this._OnKeyUpBounded!);
	}

	protected OnDestroy(): void {
		document.removeEventListener("keyup", this._OnKeyUpBounded!);
	}

	protected OnUpdate(deltaTime: number): void {
		if (!this._defaultPosition) return;
		if (!this.isActive) return;
		// Speed
		if (this.lastSpeedUp < Date.now()) {
			this.targetSpeed = 0;
		}

		this.scoreDistance += 0.02 / this.maxSpeed * this.currentSpeed;

		if (this._scoreDistanceLabel) {
			this._scoreDistanceLabel.text = `${Math.floor(this.scoreDistance)}m`;
		}

		this.currentSpeed = Lerp( this.currentSpeed, this.targetSpeed, 0.005 );

		// Jumps
		if (this._fallTime < Date.now() && this._state === EPlayerState.Jump) {
			this._state = EPlayerState.InFall;
			this.SetTargetJumpHeight(0);
			this._currentLerpJump = this.fallHeightSpeedStart;
		}
		
		if (this._state === EPlayerState.Jump) {
			this._currentLerpJump = Lerp(
				this._currentLerpJump,
				0.0001,
				0.0001
			)
		} 

		if (this._state !== EPlayerState.OnGround) {
			this.currentJumpHeight = Lerp(
				this.currentJumpHeight,
				this.targetJumpHeight,
				this._currentLerpJump
			);

			this.position.set(
				this.position.x,
				this._defaultPosition.y - this.currentJumpHeight
			);
		}
		
		if (this._state === EPlayerState.InFall) {
			const onGround = this.position.y >= this._defaultPosition.y - 2;
			if (onGround) {
				this._state = EPlayerState.OnGround;
			}

			this._currentLerpJump = Lerp(
				this._currentLerpJump,
				3,
				0.0001
			)
		}
	}

	private async LoadView(): Promise<void> {
		const spriteSheet = await Core.ResourceLoader.Get(Characters.path);
		if (!spriteSheet.textures) return;
		
		this.playerSprite.texture = spriteSheet.textures[Characters.sprites.mi_bunny_idle_03];
		this.playerSprite.anchor.set(0.5, 1);
		this.playerSprite.scale.set(0.35)

		const scoreDistance = new PIXI.Text("0");
		scoreDistance.setParent(this);
		scoreDistance.anchor.set(0.5);
		scoreDistance.scale.set(0.5);
		scoreDistance.position.set(0, 25);
		scoreDistance.style.fill = "#000000"
		scoreDistance.style.fontSize = "50px";
		scoreDistance.style.fontFamily = "Krabuler";
		
		
		this._scoreDistanceLabel = scoreDistance;
	}

}