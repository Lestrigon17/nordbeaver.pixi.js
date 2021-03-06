import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
import { Core } from '../Core';
import { Logger } from '../Logger';

const { Button } = Core.PIXIComponents;
const { Application } = Config.Main.PIXI; 
const { UI: UISprites } = Config.Sprites.Sheets;

type TButton = Nullable<Types.Core.PIXIComponents.Button>;
enum EScreenState {
	Closed,
	Opened
}
export class BaseScreen extends Core.PIXIComponents.Base {
	@Core.EventHandler.Instantiate()
	public HandleClose!: Types.Core.EventHandler

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
		this.visible = true;
		this.position.y = Config.Main.PIXI.Application.height / 2;
		this.SetPositionState(EScreenState.Opened);
		return this.OnOpen();
	}

	public Close(): void {
		Logger.Log("Screen closed");

		this.DisableButtonClose();
		this.OnClose();

		this.visible = false;
		this.SetPositionState(EScreenState.Closed);
	}

	public FirstInitialize(): Promise<void> {
		const backlayer = new PIXI.Sprite();
		backlayer.setParent(this);
		backlayer.anchor.set(0.5);
		backlayer.width = Application.width;
		backlayer.height = Application.height;
		backlayer.zIndex = -999;
		backlayer.interactive = true;
		
		Core.ResourceLoader.Get(UISprites.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return;
				backlayer.texture = spriteSheet.textures[UISprites.sprites.blackPixel];
			});

		return this.OnFirstInitialize()
	}
	
	protected OnLoad(): void {
		this.OnLoadScreen();
	}

	protected OnLoadScreen(): void {}
	protected OnClose(): void { }
	protected OnOpen():  Promise<void> {	
		return Promise.resolve(); 
	}
	protected OnFirstInitialize(): Promise<void> {
		return Promise.resolve();
	}

	private SetPositionState(state: EScreenState): void {
		if (state === EScreenState.Closed) {
			this.position.set(Application.width / 2, Application.height * 2);
		} else {
			this.position.set(Application.width / 2, Application.height / 2);
		}
	}

	private HandleButtonClose(event: Types.Core.PIXIComponents.EEventType): void {
		if (event !== Button.EEventType.PointerUp) return;
		
		this.Close();
		this.HandleClose.Invoke();
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