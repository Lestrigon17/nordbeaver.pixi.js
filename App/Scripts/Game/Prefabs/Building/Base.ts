import * as PIXI from 'pixi.js';
import { Core } from "../../../Core"

type TContstrains = {
	up?: typeof Base[],
	down?: typeof Base[],
	left?: typeof Base[],
	right?: typeof Base[];
}

export class Base extends Core.PIXIComponents.Base {
	public sprite!: PIXI.Sprite;
	public sizeX: number = 50;
	public sizeY: number = 50;
	public allowHeight: number = -1;

	public allowConstrains: TContstrains = {};

	protected spriteTexture?: PIXI.Texture;

	protected OnLoad(): void {
		const sprite = new PIXI.Sprite();
		if (this.spriteTexture) {
			sprite.texture = this.spriteTexture;
		}
		sprite.width = this.sizeX;
		sprite.height = this.sizeY;
		sprite.setParent(this);
		sprite.anchor.set(0.5);

		this.sprite = sprite;
	}
}