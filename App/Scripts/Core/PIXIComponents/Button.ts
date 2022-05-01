import { stat } from "fs";
import * as PIXI from "pixi.js";
import { Logger } from "../../Logger";
import { EventHandler } from "../EventHandler";

enum EEventType {
	PointerDown 	  = 'pointerdown',
	PointerUp 		  = 'pointerup',
	PointerUpOutSide  = 'pointerupoutside',
	PointerOver 	  = 'pointerover',
	PointerOut 		  = 'pointerout',
	InteractiveChange = 'interactivechange'
}

export class Button extends PIXI.Container {
	public static EEventType = EEventType

	@EventHandler.Instantiate()
	public OnButtonEvent!: EventHandler<(event: EEventType, state?: boolean) => void>
	
	public set isInteractive(state: boolean) {
		this._isInteractive = state;
		this.interactive = state;
		this.OnButtonEvent.Invoke(Button.EEventType.InteractiveChange, state);
	}

	private _isInteractive: boolean = true;

	constructor(...args: ConstructorParameters<typeof PIXI.Container>) {
		super(...args);

		this.MakeButton();
	}

	public SetIsEventEnabled(event: EEventType, state: boolean): this {
		const boundFunction = state ? this.on : this.off;

		switch(event) {
			case Button.EEventType.PointerDown:
				boundFunction(event, this.OnButtonDown, this);
				break;
			case Button.EEventType.PointerUp:
				boundFunction(event, this.OnButtonUp, this);
				break;
			case Button.EEventType.PointerUpOutSide:
				boundFunction(event, this.OnButtonUpOutSide, this);
				break;
			case Button.EEventType.PointerOver:
				boundFunction(event, this.OnButtonOver, this);
				break;
			case Button.EEventType.PointerOut:
				boundFunction(event, this.OnButtonOut, this);
				break;

			default:
				Logger.LogError("UnknownEvent!");
		}

		return this;
	}

	private OnButtonDown(): void {
		this.OnButtonEvent.Invoke(Button.EEventType.PointerDown);
	}
	private OnButtonUp(): void {
		this.OnButtonEvent.Invoke(Button.EEventType.PointerUp);
	}
	private OnButtonUpOutSide(): void {
		this.OnButtonEvent.Invoke(Button.EEventType.PointerUpOutSide);
	}
	private OnButtonOver(): void {
		this.OnButtonEvent.Invoke(Button.EEventType.PointerOver);
	}
	private OnButtonOut(): void {
		this.OnButtonEvent.Invoke(Button.EEventType.PointerOut);
	}

	private MakeButton(): void {
		this.interactive = this._isInteractive;
		this.buttonMode = true;
	}
}