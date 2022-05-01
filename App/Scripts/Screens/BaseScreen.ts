import * as PIXI from 'pixi.js';
import { Core } from '../Core';

const { Button } = Core.PIXIComponents;

export class BaseScreen extends PIXI.Container {
	protected buttonClose?: Types.Core.PIXIComponents.Button;

	public Open(): Promise<void> {
		this.EnableButtonClose();
		return this.OnOpen();
	}

	public Close(): void {
		this.DisableButtonClose();
		this.OnBeforeClose();
	}

	protected OnBeforeClose(): void {	}
	protected OnOpen(): Promise<void> {
		return Promise.resolve();
	}

	private HandleButtonClose(): void {
		console.log("Button close clicked!");
	}

	private EnableButtonClose(): void {
		if (!this.buttonClose) return;

		this.buttonClose.SetIsEventEnabled(Button.EEventType.PointerUp, true);
		this.buttonClose.OnButtonEvent.Subscribe(this.HandleButtonClose, this);
	}

	private DisableButtonClose(): void {
		if (!this.buttonClose) return;
		
		this.buttonClose.SetIsEventEnabled(Button.EEventType.PointerUp, false);
		this.buttonClose.OnButtonEvent.Unsubscribe(this.HandleButtonClose, this);
	}
}