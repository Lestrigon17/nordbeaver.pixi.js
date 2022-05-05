import * as PIXI from 'pixi.js';
import { Core } from "../../../Core"

export type TContstrains = {
	up?: typeof Base[],
	down?: typeof Base[],
	left?: typeof Base[],
	right?: typeof Base[];
}

export class Base extends Core.PIXIComponents.Base {
	public static allowHeight: number = 999;
	public get allowHeight(): number {
		return Base.allowHeight;
	}

	public sprite!: PIXI.Sprite;
	
	public size: PIXI.ISize = {
		width: 90,
		height: 75
	}

	public matrixPoint: PIXI.IPointData = {
		x: 0,
		y: 0
	}

	public allowConstrains: TContstrains = {};

	protected spriteTexture?: PIXI.Texture;

	protected OnLoad(): void {
		const sprite = new PIXI.Sprite();
		if (this.spriteTexture) {
			sprite.texture = this.spriteTexture;
		}
		sprite.width = this.size.width;
		sprite.height = this.size.height;
		sprite.setParent(this);
		sprite.anchor.set(0, 1);

		this.sprite = sprite;
	}
}