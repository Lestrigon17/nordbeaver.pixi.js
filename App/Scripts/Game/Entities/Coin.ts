import { Config } from "../../Configs";
import { Core } from "../../Core";
import { BaseEntity } from "./BaseEntity";

const { Enviroment} = Config.Sprites.Sheets;
const { coin: coinSprite } = Enviroment.sprites;

export class Coin extends BaseEntity {	
	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				this.spriteTexture = spriteSheet.textures[coinSprite];
				super.OnLoad();
			});
	}
}