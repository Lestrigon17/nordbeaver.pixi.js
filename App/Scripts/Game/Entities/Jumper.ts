import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Player } from "../Player";
import { BaseEntity } from "./BaseEntity";

const { Enviroment} = Config.Sprites.Sheets;
const { jumper: jumperSprite } = Enviroment.sprites;

export class Jumper extends BaseEntity {	
	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				this.spriteTexture = spriteSheet.textures[jumperSprite];
				super.OnLoad();

				this.sprite.position.x -= 125;
			});
	}

	public OnCollidePlayer(player: Player): void {
		if (player.state === Player.EPlayerState.Jump ) return;
		player.BigJump();
		player.SpeedUp();
	}
}