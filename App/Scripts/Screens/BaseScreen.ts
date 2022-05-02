import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
import { Core } from '../Core';
import { Logger } from '../Logger';

const { Button } = Core.PIXIComponents;
const { Application } = Config.Main.PIXI; 

type TButton = Nullable<Types.Core.PIXIComponents.Button>;
export class BaseScreen extends Core.PIXIComponents.Base {
	protected set buttonClose(button: TButton) {
		if (this._buttonClose && this._buttonClose !== button) {
			this.DisableButtonClose();
		}

		this._buttonClose = button;
		this.EnableButtonClose();
	}
	
	protected get buttonClose(): TButton {
		return this._buttonClose;
	}

	private _buttonClose: TButton;

	public Open(): Promise<void> {
		Logger.Log("Screen opened");

		this.EnableButtonClose();
		return this.OnOpen();
	}

	public Close(): void {
		Logger.Log("Screen closed");

		this.DisableButtonClose();
		this.OnClose();

		this.destroy();
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
		
		this.Close();
	}

	private EnableButtonClose(): void {
		if (!this._buttonClose) return;

		this._buttonClose.OnButtonEvent.Subscribe(this.HandleButtonClose, this);
	}

	private DisableButtonClose(): void {
		if (!this._buttonClose) return;
		
		this._buttonClose.OnButtonEvent.Unsubscribe(this.HandleButtonClose, this);
	}
}