import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
import { Player } from "../Player";

export class BaseEntity extends Core.PIXIComponents.Base {
	public sprite!: PIXI.Sprite;
	protected spriteTexture?: PIXI.Texture;

	protected OnLoad(): void {
		
	}

	protected OnCollidePlayer(player: Player): void {
	}

	private CreateView(): void {		
		const sprite = new PIXI.Sprite();
		if (this.spriteTexture) {
			sprite.texture = this.spriteTexture;
		}
		sprite.setParent(this);
		sprite.anchor.set(0, 1);

		this.sprite = sprite;
	}
}