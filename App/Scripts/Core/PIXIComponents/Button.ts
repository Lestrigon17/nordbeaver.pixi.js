import { stat } from "fs";
import * as PIXI from "pixi.js";
import { Logger } from "../../Logger";
import { EventHandler } from "../EventHandler";
import { Base } from "./Base";

export enum EEventType {
	PointerDown 	  = 'pointerdown',
	PointerUp 		  = 'pointerup',
	PointerUpOutSide  = 'pointerupoutside',
	PointerOver 	  = 'pointerover',
	PointerOut 		  = 'pointerout',
	InteractiveChange = 'interactivechange'
}

export class Button extends Base {
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

		this.interactive = this._isInteractive;
		this.buttonMode = true;
	}

	protected OnLoad(): void {
		this.on(EEventType.PointerDown, this.OnButtonDown, this);
		this.on(EEventType.PointerUp, this.OnButtonUp, this);
		this.on(EEventType.PointerUpOutSide, this.OnButtonUpOutSide, this);
		this.on(EEventType.PointerOver, this.OnButtonOver, this);
		this.on(EEventType.PointerOut, this.OnButtonOut, this);
	}

	protected OnDestroy(): void {
		this.off(EEventType.PointerDown, this.OnButtonDown, this);
		this.off(EEventType.PointerUp, this.OnButtonUp, this);
		this.off(EEventType.PointerUpOutSide, this.OnButtonUpOutSide, this);
		this.off(EEventType.PointerOver, this.OnButtonOver, this);
		this.off(EEventType.PointerOut, this.OnButtonOut, this);
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
}