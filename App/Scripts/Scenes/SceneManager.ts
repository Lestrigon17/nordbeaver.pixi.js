import { ApplicationController } from "../PIXI/ApplicationController";
import { BaseScene } from "./BaseScene";
import * as PIXI from "../PIXI/PIXI";

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
				PIXI.ApplicationController.instance.stage.addChild(sceneInstance);
			})
	}
}