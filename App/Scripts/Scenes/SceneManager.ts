import { ApplicationController } from "../Core/PIXI/ApplicationController";
import { BaseScene } from "./BaseScene";
// import * as PIXI from "../Core/PIXI";
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
				Core.PIXI.ApplicationController.instance.stage.addChild(sceneInstance);
			})
	}
}