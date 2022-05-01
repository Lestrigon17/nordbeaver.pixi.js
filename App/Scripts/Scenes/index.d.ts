declare namespace Types {
	export namespace Scenes {
		export type BaseScene = import('./BaseScene').BaseScene;
		export type Manager   = import('./Manager').Manager;

		export namespace List {
			export type Start = import('./SceneStart/SceneStart').SceneStart;
			export type Game  = import('./SceneGame/SceneGame').SceneGame;
		}
	}
}