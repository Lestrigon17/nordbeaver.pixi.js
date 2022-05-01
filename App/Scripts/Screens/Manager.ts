import { BaseScreen } from "./BaseScreen";

export class Manager {
	private static _screenCache: Map<BaseScreen, BaseScreen> = new Map();
}