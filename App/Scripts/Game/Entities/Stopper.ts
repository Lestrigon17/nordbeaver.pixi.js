import * as PIXI from 'pixi.js';
import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Player } from "../Player";
import { BaseEntity } from "./BaseEntity";

const { Enviroment} = Config.Sprites.Sheets;
const { stopper: stopperSprites } = Enviroment.sprites;

export class Stopper extends BaseEntity {	
	private _spriteSheet?: PIXI.LoaderResource;
	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();
				this._spriteSheet = spriteSheet;
				this.spriteTexture = spriteSheet.textures[stopperSprites.idle];
				super.OnLoad();

				this.sprite.position.x -= 125;
			});
	}

	public OnCollidePlayer(player: Player): void {
		if (player.state !== Player.EPlayerState.OnGround) return;

		player.Kill();
		if (!this._spriteSheet) return;
		this.sprite.texture = this._spriteSheet.textures![stopperSprites.crush];
	}
}