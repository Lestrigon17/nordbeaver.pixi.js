import { BaseScene } from "./BaseScene";
import Core from "../Core";

export class SceneManager {
	private static _currentScene: BaseScene;

	public static LoadScene(scene: typeof BaseScene): void {
		const sceneInstance = new scene();

		sceneInstance.BeforeLoadScene()
			.then(() => {
				if (this._currentScene) {
					this._currentScene.destroy();
				}

				this._currentScene = sceneInstance;
				Core.PIXIComponents.ApplicationController.instance.stage.addChild(sceneInstance);
			})
	}
}