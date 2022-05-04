import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";

const { Enviroment} = Config.Sprites.Sheets;
const { roofs } = Enviroment.sprites.building;
export class Roofs extends Base {
	public static allowHeight: number = 999;
	
	private _sprites: string[] = [
		roofs[1],
		roofs[2]
	]

	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				const id = Core.Utils.Array.GetRandom(this._sprites)!
				this.spriteTexture = spriteSheet.textures[id];
				super.OnLoad();
			})
	}
}