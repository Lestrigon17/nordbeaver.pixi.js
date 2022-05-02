import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from "../../Core";
import { Logger } from '../../Logger';

const { UI: UISprites } = Config.Sprites.Sheets

export class Star extends Core.PIXIComponents.Base {
	public sprite!: PIXI.Sprite;
	
	private _speedScale: number = Core.Utils.Number.RandomInteger(250, 1000);
	private _speedRotation: number = Core.Utils.Number.RandomInteger(250, 1000);

	protected OnLoad(): void {
		Core.ResourceLoader.Get(UISprites.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) {
					Logger.LogError("Unkown resource", UISprites.path);
					return;
				}

				this.InitializeSprite(spriteSheet);
			})
	}

	private InitializeSprite(spriteSheet: PIXI.LoaderResource): void {
		const sprite = new PIXI.Sprite();
		sprite.setParent(this);
		sprite.texture = spriteSheet.textures![UISprites.sprites.star];
		sprite.scale.set(Core.Utils.Number.RandomInteger(3,7) * 0.1);
		sprite.angle = Core.Utils.Number.RandomInteger(-35, 35);
		sprite.anchor.set(0.5);

		this.sprite = sprite;
	}

	protected OnUpdate(deltaTime: number): void {
		if (!this.sprite) return;
		this.sprite.scale.set( 0.6 + 0.1 * Math.sin(Date.now() / this._speedScale) );
		this.sprite.rotation = 0.2 * Math.sin(Date.now() / this._speedRotation);
	}
}