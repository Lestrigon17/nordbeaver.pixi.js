import * as PIXI from "pixi.js"

export class Base extends PIXI.Container {
	constructor(...args: ConstructorParameters<typeof PIXI.Container>) {
		super(...args);
		this.OnLoad();

		this.on("destroyed", this._OnDestroy, this);
	}

	protected OnDestroy(): void {}
	protected OnLoad(): void {}
	protected OnUpdate(deltaTime: number): void {}

	private _OnDestroy(): void {
		this.off("destroyed", this._OnDestroy, this);
		this.OnDestroy();
	}
}