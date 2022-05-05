declare namespace Types {
	export namespace Screens {
		export type BaseScreen = import('./BaseScreen').BaseScreen;
		export type Manager    = import('./Manager').Manager;

		export namespace List {
			export type Start   = import("./ScreenStart/ScreenStart").ScreenStart;
			export type EndGame = import("./ScreenEndGame/ScreenEndGame").ScreenEndGame;
			export type Leaderboard = import("./ScreenLeaderboard/ScreenLeaderboard").ScreenLeaderboard;
		}
	}
}