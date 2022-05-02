import { Core } from "../Core";
import { Logger } from "../Logger";
import { BaseScreen } from "./BaseScreen";

const { AppController } = Core.PIXIComponents
export class Manager {
	private static _screenCache: Map<typeof BaseScreen, BaseScreen> = new Map();
	private static _activeScreen?: BaseScreen;
	private static _isBusy: boolean = false;

	public static OpenScreen<T extends BaseScreen>(screen: typeof BaseScreen): Promise<T> {
		if (this._isBusy) return Promise.reject();
		if (this._activeScreen) {
			this._activeScreen.Close();
		}
		
		Logger.Log("Run open screen");
		this._isBusy = true;

		let screenInstance: BaseScreen;
		if (this._screenCache.has(screen)) {
			screenInstance = this._screenCache.get(screen)!;
			
			return this.OnScreenInitialized(screenInstance);
		} else {
			screenInstance = new screen();
			screenInstance.setParent(AppController.persistNode);
			
			return screenInstance.FirstInitialize()
				.then(() => this.OnScreenInitialized(screenInstance))
		}
	}

	private static OnScreenInitialized<T extends BaseScreen>(screenInstance: BaseScreen): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			screenInstance.Open()
				.then(() => {
					this._activeScreen = screenInstance;
					resolve(screenInstance as T);
				})
				.finally(() => {
					this._isBusy = false;
				})
		})
	}
}