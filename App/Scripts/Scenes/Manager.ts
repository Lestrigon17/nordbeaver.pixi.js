import { Core } from "../Core";
import { BaseScene } from "./BaseScene";

export class Manager {
	public static get currentScene(): BaseScene {
		return this._currentScene;
	}
	
	private static _currentScene: BaseScene;

	public static LoadScene(scene: typeof BaseScene): void {
		const sceneInstance = new scene();

		sceneInstance.BeforeLoadScene()
			.then(() => {
				if (this._currentScene) {
					this._currentScene.destroy();
				}

				this._currentScene = sceneInstance;
				this._currentScene.zIndex = 0;
				Core.PIXIComponents.AppController.instance.stage.addChild(sceneInstance);
				sceneInstance.Start();
			})
	}
}