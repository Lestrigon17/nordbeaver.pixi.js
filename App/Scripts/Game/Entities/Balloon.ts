import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Player } from "../Player";
import { BaseEntity } from "./BaseEntity";

const { Enviroment} = Config.Sprites.Sheets;
const { balloons } = Enviroment.sprites;

export class Balloon extends BaseEntity {	
	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				this.spriteTexture = spriteSheet.textures[balloons.red];
				super.OnLoad();
			});
	}

	public OnCollidePlayer(player: Player): void {
		player.SmallJump();
		player.SpeedUp();
		this.destroy();
	}
}