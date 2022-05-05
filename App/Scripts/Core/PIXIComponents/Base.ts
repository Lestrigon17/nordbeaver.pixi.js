import * as PIXI from "pixi.js"
import { EventHandler } from "../EventHandler";
import { AppController } from "./AppController";

export class Base extends PIXI.Container {	
	constructor(...args: ConstructorParameters<typeof PIXI.Container>) {
		super(...args);
		this.OnLoad();

		this.on("destroyed", this.OnDestroyed, this);
		AppController.instance.ticker.add(this.OnUpdate, this);
	}

	protected OnDestroy(): void {}
	protected OnLoad(): void {}
	protected OnUpdate(deltaTime: number): void {}

	private OnDestroyed(): void {
		AppController.instance.ticker.remove(this.OnUpdate, this);
		this.off("destroyed", this.OnDestroyed, this);
		this.OnDestroy();
	}
}