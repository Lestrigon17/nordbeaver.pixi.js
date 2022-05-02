import { Core } from "../Core";
import { Logger } from "../Logger";
import { BaseScreen } from "./BaseScreen";

const { AppController } = Core.PIXIComponents
export class Manager {
	private static _screenCache: Map<BaseScreen, BaseScreen> = new Map();
	private static _activeScreen?: BaseScreen;

	public static OpenScreen(screen: typeof BaseScreen): void {
		if (this._activeScreen) {
			this._activeScreen.Close();
		}
		
		Logger.Log("Run open screen");

		const newScreen = new screen();
		newScreen.setParent(AppController.persistNode);
		this._activeScreen = newScreen;
		newScreen.Open();
	}
}