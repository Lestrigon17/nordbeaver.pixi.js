import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
import { EntityController } from '../EntityController';
import { Player } from "../Player";

export class BaseEntity extends Core.PIXIComponents.Base {
	public sprite!: PIXI.Sprite;
	public isCollisionEnabled: boolean = true;

	protected spriteTexture?: PIXI.Texture;

	protected OnLoad(): void {
		EntityController.Registrate(this);
		this.CreateView();
	}

	public OnCollidePlayer(player: Player): void {
		console.log("Collide!")
	}

	private CreateView(): void {		
		const sprite = new PIXI.Sprite();
		if (this.spriteTexture) {
			sprite.texture = this.spriteTexture;
		}
		sprite.setParent(this);
		sprite.anchor.set(0, 1);
		sprite.scale.set(0.5);

		this.sprite = sprite;
	}
}