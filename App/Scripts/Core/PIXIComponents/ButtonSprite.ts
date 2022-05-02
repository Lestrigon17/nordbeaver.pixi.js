import * as PIXI from "pixi.js";
import { SoundPlayer } from "../SoundPlayer";
import { Button, EEventType } from "./Button";


type TSpriteConfig = {
	active: string, // possible undefined, TODO: refactoring to purple texture by default
	hover?: string,
	press?: string,
}

// TODO: Добавить отображение выключенных кнопок
export class ButtonSprite extends Button {
	public sprite!: PIXI.Sprite;

	public set spriteConfig(config: TSpriteConfig) {
		this._spriteConfig = config;
		this.UpdateView();
	}
	public set spriteSheet(config: PIXI.LoaderResource) {
		this._spriteSheet = config;
		this.UpdateView();
	}

	private _spriteConfig: TSpriteConfig = {} as TSpriteConfig;
	private _spriteSheet?: PIXI.LoaderResource;

	private _isHover: boolean = false;
	private _isDown: boolean = false;

	protected OnLoad(): void {
		super.OnLoad();

		this.sprite = new PIXI.Sprite();
		this.sprite.anchor.set(0.5)
		this.sprite.setParent(this);
		
		this.OnButtonEvent.Subscribe(this.OnPointerEvent, this);
	}

	protected OnDestroy(): void {
		super.OnDestroy()
		this.OnButtonEvent.Unsubscribe(this.OnPointerEvent, this);
	}

	protected OnPointerEvent(event: EEventType): void {
		if (event === Button.EEventType.PointerUp) {
			
			// todo: Передалть на enum генерируемый из конфига
			SoundPlayer.PlaySound("ButtonPress");
		}

		if (!this._spriteSheet || !this._spriteSheet.textures) return;

		switch(event) {
			case Button.EEventType.PointerOver:
				this._isHover = true;
				break;

			case Button.EEventType.PointerOut:
				this._isHover = false;
				break;

			case Button.EEventType.PointerDown:
				this._isDown = true;
				break;
			
			case Button.EEventType.PointerUp:
				this._isDown = false;
				break;
			case Button.EEventType.PointerUpOutSide:
				this._isDown = false;
				this._isHover = false;
				break;
		}

		this.UpdateView();
	}

	private UpdateView(): void {
		if (!this._spriteSheet || !this._spriteSheet.textures) return;
		const { hover, active, press } = this._spriteConfig;

		if (this._isDown) {
			this.sprite.texture = this._spriteSheet.textures[press ?? active];
			return;
		}

		if (this._isHover) {
			this.sprite.texture = this._spriteSheet.textures[hover ?? active];
			return;
		}

		this.sprite.texture = this._spriteSheet.textures[active];
	}
}