import * as PIXI from 'pixi.js';
import { Config } from '../Configs';
const { Application } = Config.Main.PIXI; 

export class BaseScene extends PIXI.Graphics {
	constructor(...args: ConstructorParameters<typeof PIXI.Container>) {
		super(...args);
		
		this.beginFill(0x3184c6);
		this.drawRect(0, 0, Application.width, Application.height);
		this.position.set(0, 0);

		this.OnLoad();
	}

	public BeforeLoadScene(): Promise<void> {
		return this.OnBeforeLoadScene();
	}
	
	protected OnBeforeLoadScene(): Promise<void> { return Promise.resolve(); }
	protected OnLoad(): void {}
}