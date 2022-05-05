import * as PIXI from 'pixi.js'
import { Scenes } from '../Scenes';
import { Session } from './Session';

export class Manager {
	public static currentSession?: Session;

	public static LoadGame(): void {
		const currentScene = Scenes.Manager.currentScene;
		const session = new Session(currentScene);
		this.currentSession = session;
	}

	public static RecreateSession(): void {
		if(this.currentSession) this.currentSession.Destroy();
		this.LoadGame();
	}
}