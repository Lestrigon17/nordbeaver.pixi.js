/// <reference path="index.d.ts" />

import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";
import { SceneGame } from "./SceneGame/SceneGame";
import { SceneStart } from "./SceneStart/SceneStart";

export * from "./Manager";
export * from "./SceneStart/SceneStart";
export * from "./SceneGame/SceneGame";

export class Scenes {
	public static BaseScene = BaseScene;
	public static Manager 	= Manager;

	public static List = {
		Start: SceneStart,
		Game:  SceneGame,
	}
}