import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
import { Core } from '../Core';
import { Logger } from '../Logger';

const { Button } = Core.PIXIComponents;
const { Application } = Config.Main.PIXI; 

export class BaseScreen extends Core.PIXIComponents.Base {
	protected buttonClose?: Types.Core.PIXIComponents.Button;

	public Open(): Promise<void> {
		Logger.Log("Screen opened");

		this.EnableButtonClose();
		return this.OnOpen();
	}

	public Close(): void {
		Logger.Log("Screen closed");

		this.DisableButtonClose();
		this.OnClose();
	}

	protected OnLoad(): void {
		this.position.set(Application.width / 2, Application.height / 2);
		this.OnLoadScreen();
	}

	protected OnLoadScreen(): void {}
	protected OnClose(): void { }
	protected OnOpen():  Promise<void> {	
		return Promise.resolve(); 
	}

	private HandleButtonClose(event: Types.Core.PIXIComponents.EEventType): void {
		if (event !== Button.EEventType.PointerUp) return;
		console.log("Clicked")
	}

	private EnableButtonClose(): void {
		if (!this.buttonClose) return;

		this.buttonClose.OnButtonEvent.Subscribe(this.HandleButtonClose, this);
	}

	private DisableButtonClose(): void {
		if (!this.buttonClose) return;
		
		this.buttonClose.OnButtonEvent.Unsubscribe(this.HandleButtonClose, this);
	}
}